import mongoose from 'mongoose';
import admin, { isFirebaseReady } from '../config/firebase.js';
import { User } from '../models/User.js';
import { Progress } from '../models/Progress.js';
import { Attempt } from '../models/Attempt.js';

// Get currently authenticated user profile
export const getCurrentUserProfile = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) {
      return res.status(200).json({
        success: true,
        user: {
          firebaseUid: req.user.uid,
          name: req.user.name,
          email: req.user.email,
          role: req.user.role,
          status: 'active'
        }
      });
    }

    return res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Failed to retrieve user profile',
      details: error.message
    });
  }
};

// Admin: Create new user (Student or Faculty) via Firebase Admin + Mirror in MongoDB
export const createUser = async (req, res) => {
  try {
    const { email, password, name, role, firebaseUid: passedUid, collegeId } = req.body;

    if (!email || !password || !name || !role) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: email, password, name, and role are required.'
      });
    }

    if (!['faculty', 'student', 'admin'].includes(role)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid role. Must be one of: faculty, student, admin.'
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Fast indexed check if user already exists in MongoDB
    const existingDbUser = await User.findOne({ email: normalizedEmail }).lean();
    if (existingDbUser) {
      return res.status(409).json({
        success: false,
        error: `User with email ${email} already exists in database.`
      });
    }

    let firebaseUid = passedUid || null;

    // Create user in Firebase via Admin SDK if initialized and not already passed from client
    if (!firebaseUid && isFirebaseReady() && process.env.FIREBASE_SERVICE_ACCOUNT) {
      try {
        const fbUser = await admin.auth().createUser({
          email: normalizedEmail,
          password,
          displayName: name.trim()
        });

        firebaseUid = fbUser.uid;
        await admin.auth().setCustomUserClaims(firebaseUid, { role });
        console.log(`[Firebase Admin] Created user ${normalizedEmail} (${firebaseUid}) with role claim '${role}'`);
      } catch (fbErr) {
        if (fbErr.code === 'auth/email-already-exists') {
          try {
            const existingFbUser = await admin.auth().getUserByEmail(normalizedEmail);
            firebaseUid = existingFbUser.uid;
            await admin.auth().setCustomUserClaims(firebaseUid, { role });
          } catch (fetchErr) {
            firebaseUid = `uid_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
          }
        } else {
          return res.status(400).json({
            success: false,
            error: 'Firebase user creation failed: ' + fbErr.message
          });
        }
      }
    } else if (!firebaseUid) {
      // Dev/Demo fallback UID generation
      firebaseUid = `uid_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    }

    // Mirror in MongoDB as source of truth
    const newUser = await User.create({
      firebaseUid,
      name: name.trim(),
      email: normalizedEmail,
      password,
      role,
      collegeId: collegeId || 'COLLEGE_001',
      status: 'active',
      isActive: true,
      createdBy: req.user?.uid || 'admin'
    });

    return res.status(201).json({
      success: true,
      message: `Successfully created ${role} account for ${name}`,
      user: {
        id: newUser._id,
        _id: newUser._id,
        firebaseUid: newUser.firebaseUid,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        status: newUser.status,
        createdAt: newUser.createdAt
      }
    });
  } catch (error) {
    console.error('[Create User Error]:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to create user',
      details: error.message
    });
  }
};

// Admin: List all users with statistics (Optimized with MongoDB Aggregation)
export const listUsers = async (req, res) => {
  try {
    const { role, status, search } = req.query;
    const filter = {};

    if (role) filter.role = role;
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const users = await User.find(filter).sort({ createdAt: -1 }).lean();

    // Fast Aggregation: Fetch all student stats in 2 queries instead of 2N queries
    const studentUids = users
      .filter((u) => u.role === 'student' && u.firebaseUid)
      .map((u) => u.firebaseUid);

    const completedMap = new Map();
    const attemptsMap = new Map();

    if (studentUids.length > 0) {
      const [completedAgg, attemptsAgg] = await Promise.all([
        Progress.aggregate([
          { $match: { studentId: { $in: studentUids }, status: 'completed' } },
          { $group: { _id: '$studentId', count: { $sum: 1 } } }
        ]),
        Attempt.aggregate([
          { $match: { studentId: { $in: studentUids } } },
          { $group: { _id: '$studentId', count: { $sum: 1 } } }
        ])
      ]);

      completedAgg.forEach((item) => completedMap.set(item._id, item.count));
      attemptsAgg.forEach((item) => attemptsMap.set(item._id, item.count));
    }

    const enhancedUsers = users.map((u) => {
      if (u.role === 'student') {
        return {
          ...u,
          completedModules: completedMap.get(u.firebaseUid) || 0,
          totalAttempts: attemptsMap.get(u.firebaseUid) || 0
        };
      }
      return u;
    });

    return res.status(200).json({
      success: true,
      count: enhancedUsers.length,
      users: enhancedUsers
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Failed to list users',
      details: error.message
    });
  }
};

// Admin: Update user status (active / disabled)
export const updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['active', 'disabled'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: "Invalid status. Must be 'active' or 'disabled'."
      });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Prevent disabling self
    if (user.firebaseUid === req.user.uid) {
      return res.status(400).json({
        success: false,
        error: 'Administrators cannot disable their own account.'
      });
    }

    user.status = status;
    await user.save();

    // Also update Firebase disabled state if available
    if (isFirebaseReady() && process.env.FIREBASE_SERVICE_ACCOUNT) {
      try {
        await admin.auth().updateUser(user.firebaseUid, {
          disabled: status === 'disabled'
        });
      } catch (fbErr) {
        console.warn(`[Firebase Admin] Could not update disabled state on Firebase: ${fbErr.message}`);
      }
    }

    return res.status(200).json({
      success: true,
      message: `User ${user.email} status updated to ${status}`,
      user
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Failed to update user status',
      details: error.message
    });
  }
};

// Admin: Delete user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    if (user.firebaseUid === req.user.uid) {
      return res.status(400).json({
        success: false,
        error: 'Cannot delete your own admin account.'
      });
    }

    // Delete in Firebase if available
    if (isFirebaseReady() && process.env.FIREBASE_SERVICE_ACCOUNT) {
      try {
        await admin.auth().deleteUser(user.firebaseUid);
      } catch (fbErr) {
        console.warn(`[Firebase Admin] Could not delete Firebase Auth user: ${fbErr.message}`);
      }
    }

    await User.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: `User ${user.email} permanently removed.`
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Failed to delete user',
      details: error.message
    });
  }
};

// Admin: Bulk import students & faculty from CSV with row-level validation & batch processing
export const bulkImportUsers = async (req, res) => {
  try {
    const { csvContent, users: userList } = req.body;
    let parsedRows = [];

    if (userList && Array.isArray(userList)) {
      parsedRows = userList;
    } else if (csvContent && typeof csvContent === 'string') {
      const lines = csvContent
        .split(/\r?\n/)
        .map((l) => l.trim())
        .filter((l) => l.length > 0);

      if (lines.length === 0) {
        return res.status(400).json({ success: false, error: 'CSV content is empty.' });
      }

      // Check for header
      const firstLine = lines[0].toLowerCase();
      let startIndex = 0;
      let headerMap = { name: 0, email: 1, role: 2, password: 3, collegeid: 4 };

      if (firstLine.includes('email') || firstLine.includes('name')) {
        startIndex = 1;
        const headers = lines[0].split(',').map((h) => h.trim().toLowerCase().replace(/[^a-z0-9]/g, ''));
        headerMap = {
          name: headers.indexOf('name') !== -1 ? headers.indexOf('name') : 0,
          email: headers.indexOf('email') !== -1 ? headers.indexOf('email') : 1,
          role: headers.indexOf('role') !== -1 ? headers.indexOf('role') : 2,
          password: headers.indexOf('password') !== -1 ? headers.indexOf('password') : 3,
          collegeid: headers.indexOf('collegeid') !== -1 ? headers.indexOf('collegeid') : 4
        };
      }

      for (let i = startIndex; i < lines.length; i++) {
        const cols = lines[i].split(',').map((c) => c.trim().replace(/^["']|["']$/g, ''));
        if (cols.length >= 2) {
          parsedRows.push({
            rowNumber: i + 1,
            name: cols[headerMap.name] || '',
            email: cols[headerMap.email] || '',
            role: cols[headerMap.role] || 'student',
            password: cols[headerMap.password] || 'NursingPass@2026',
            collegeId: cols[headerMap.collegeid] || 'COLLEGE_001'
          });
        }
      }
    } else {
      return res.status(400).json({
        success: false,
        error: 'Either csvContent (CSV string) or users (array of objects) must be provided in request body.'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errors = [];
    const validRows = [];
    const seenEmailsInFile = new Set();

    for (let idx = 0; idx < parsedRows.length; idx++) {
      const row = parsedRows[idx];
      const rowNum = row.rowNumber || idx + 1;

      // Validation 1: Required Name & Email
      if (!row.name || !row.email) {
        errors.push({
          row: rowNum,
          email: row.email || 'N/A',
          reason: 'Missing required field: name and email are mandatory.'
        });
        continue;
      }

      const normalizedEmail = row.email.toLowerCase().trim();

      // Validation 2: Email format
      if (!emailRegex.test(normalizedEmail)) {
        errors.push({
          row: rowNum,
          email: normalizedEmail,
          reason: `Invalid email address format: "${row.email}"`
        });
        continue;
      }

      // Check duplicates within the file itself
      if (seenEmailsInFile.has(normalizedEmail)) {
        errors.push({
          row: rowNum,
          email: normalizedEmail,
          reason: `Duplicate email "${normalizedEmail}" in import list.`
        });
        continue;
      }
      seenEmailsInFile.add(normalizedEmail);

      // Validation 3: Role validity
      const normalizedRole = (row.role || 'student').toLowerCase().trim();
      if (!['student', 'faculty', 'admin'].includes(normalizedRole)) {
        errors.push({
          row: rowNum,
          email: normalizedEmail,
          reason: `Invalid role "${row.role}". Must be one of: student, faculty, admin.`
        });
        continue;
      }

      // Validation 4: Password length
      const password = row.password || 'NursingPass@2026';
      if (password.length < 6) {
        errors.push({
          row: rowNum,
          email: normalizedEmail,
          reason: 'Password must be at least 6 characters long.'
        });
        continue;
      }

      validRows.push({
        rowNum,
        name: row.name.trim(),
        email: normalizedEmail,
        role: normalizedRole,
        password,
        collegeId: row.collegeId || 'COLLEGE_001'
      });
    }

    // Single Batch Query to check existing users in Database (O(1) roundtrip)
    const isDbConnected = mongoose.connection && mongoose.connection.readyState === 1;
    const existingEmailsSet = new Set();

    if (isDbConnected && validRows.length > 0) {
      const candidateEmails = validRows.map((r) => r.email);
      const existingUsers = await User.find({ email: { $in: candidateEmails } }, 'email').lean();
      existingUsers.forEach((u) => existingEmailsSet.add(u.email.toLowerCase()));
    }

    const rowsToInsert = [];
    for (const row of validRows) {
      if (existingEmailsSet.has(row.email)) {
        errors.push({
          row: row.rowNum,
          email: row.email,
          reason: `User with email "${row.email}" already exists in database.`
        });
      } else {
        rowsToInsert.push(row);
      }
    }

    const hasFirebaseAdmin = isFirebaseReady() && process.env.FIREBASE_SERVICE_ACCOUNT;
    const documentsToCreate = [];

    for (let i = 0; i < rowsToInsert.length; i++) {
      const row = rowsToInsert[i];
      let firebaseUid = `uid_import_${Date.now()}_${i}_${Math.random().toString(36).substring(2, 7)}`;

      if (hasFirebaseAdmin) {
        try {
          const fbUser = await admin.auth().createUser({
            email: row.email,
            password: row.password,
            displayName: row.name
          });
          firebaseUid = fbUser.uid;
          await admin.auth().setCustomUserClaims(firebaseUid, { role: row.role });
        } catch (fbErr) {
          if (fbErr.code === 'auth/email-already-exists') {
            try {
              const existingFb = await admin.auth().getUserByEmail(row.email);
              firebaseUid = existingFb.uid;
              await admin.auth().setCustomUserClaims(firebaseUid, { role: row.role });
            } catch (e) {}
          } else {
            console.warn(`[Firebase Admin Import Warn]: ${row.email} - ${fbErr.message}`);
          }
        }
      }

      documentsToCreate.push({
        firebaseUid,
        name: row.name,
        email: row.email,
        password: row.password,
        role: row.role,
        collegeId: row.collegeId,
        status: 'active',
        isActive: true,
        createdBy: req.user?.uid || 'admin_csv_import'
      });
    }

    let importedUsers = [];
    if (isDbConnected && documentsToCreate.length > 0) {
      try {
        const createdDocs = await User.insertMany(documentsToCreate, { ordered: false });
        importedUsers = createdDocs.map((u) => ({
          _id: u._id,
          name: u.name,
          email: u.email,
          role: u.role,
          collegeId: u.collegeId,
          status: u.status
        }));
      } catch (insertErr) {
        console.error('[Bulk Insert Warning]:', insertErr.message);
        if (insertErr.insertedDocs && insertErr.insertedDocs.length > 0) {
          importedUsers = insertErr.insertedDocs.map((u) => ({
            _id: u._id,
            name: u.name,
            email: u.email,
            role: u.role,
            collegeId: u.collegeId,
            status: u.status
          }));
        }
      }
    } else {
      importedUsers = documentsToCreate.map((d, idx) => ({
        _id: `mock_${Date.now()}_${idx}`,
        name: d.name,
        email: d.email,
        role: d.role,
        collegeId: d.collegeId,
        status: d.status
      }));
    }

    return res.status(200).json({
      success: true,
      totalRows: parsedRows.length,
      importedCount: importedUsers.length,
      failedCount: errors.length,
      errors,
      importedUsers
    });
  } catch (error) {
    console.error('[Bulk Import Error]:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to process bulk user import',
      details: error.message
    });
  }
};

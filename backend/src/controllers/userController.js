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
    const { email, password, name, role } = req.body;

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

    // Check if user already exists in MongoDB
    const existingDbUser = await User.findOne({ email: email.toLowerCase() });
    if (existingDbUser) {
      return res.status(409).json({
        success: false,
        error: `User with email ${email} already exists in database.`
      });
    }

    let firebaseUid = null;

    // Create user in Firebase via Admin SDK if initialized
    if (isFirebaseReady() && process.env.FIREBASE_SERVICE_ACCOUNT) {
      try {
        const fbUser = await admin.auth().createUser({
          email: email.toLowerCase(),
          password,
          displayName: name
        });

        firebaseUid = fbUser.uid;

        // Set Custom User Claims on Firebase for strict client/token-level role enforcement
        await admin.auth().setCustomUserClaims(firebaseUid, { role });
        console.log(`[Firebase Admin] Created user ${email} (${firebaseUid}) with role claim '${role}'`);
      } catch (fbErr) {
        return res.status(400).json({
          success: false,
          error: 'Firebase user creation failed: ' + fbErr.message
        });
      }
    } else {
      // Dev/Demo fallback UID generation
      firebaseUid = `uid_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      console.log(`[Dev Mode] Created user ${email} with simulated UID ${firebaseUid}`);
    }

    // Mirror in MongoDB as source of truth
    const newUser = await User.create({
      firebaseUid,
      name,
      email: email.toLowerCase(),
      role,
      status: 'active',
      createdBy: req.user.uid || 'admin'
    });

    return res.status(201).json({
      success: true,
      message: `Successfully created ${role} account for ${name}`,
      user: {
        id: newUser._id,
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

// Admin: List all users with statistics
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

    // Enhance students with progress stats
    const enhancedUsers = await Promise.all(
      users.map(async (u) => {
        if (u.role === 'student') {
          const completedCount = await Progress.countDocuments({
            studentId: u.firebaseUid,
            status: 'completed'
          });
          const totalAttempts = await Attempt.countDocuments({
            studentId: u.firebaseUid
          });
          return {
            ...u,
            completedModules: completedCount,
            totalAttempts
          };
        }
        return u;
      })
    );

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

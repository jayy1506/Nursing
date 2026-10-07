import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Generate JWT Token
export const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user._id, 
      role: user.role, 
      email: user.email, 
      collegeId: user.collegeId,
      firebaseUid: user.firebaseUid 
    },
    process.env.JWT_SECRET || 'nursing_ai_jwt_secret_key_2026_secure',
    { expiresIn: '7d' }
  );
};

// 1. POST /api/auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        error: 'Email and password are required.' 
      });
    }

    // Find user and explicitly include password field
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid email or password.' 
      });
    }

    if (!user.isActive || user.status === 'disabled') {
      return res.status(403).json({ 
        success: false, 
        error: 'Your account has been disabled by an administrator.' 
      });
    }

    const token = generateToken(user);

    // Set HTTP-only cookie + send JSON token
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json({ 
      success: true, 
      token, 
      user: user.toJSON() 
    });
  } catch (error) {
    console.error('[Auth Controller - Login Error]:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Failed to process login.', 
      details: error.message 
    });
  }
};

// 2. POST /api/auth/signup
export const signup = async (req, res) => {
  try {
    const { name, email, password, role = 'student', collegeId = 'COLLEGE_001', firebaseUid } = req.body;

    if (!name || !email) {
      return res.status(400).json({ 
        success: false, 
        error: 'Name and email are required.' 
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if user already exists
    let existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      // If user exists with same email, sync firebaseUid if provided
      if (firebaseUid && !existingUser.firebaseUid) {
        existingUser.firebaseUid = firebaseUid;
        await existingUser.save();
      }
      const token = generateToken(existingUser);
      return res.status(200).json({
        success: true,
        token,
        user: existingUser.toJSON()
      });
    }

    // Validate role
    const validRoles = ['student', 'faculty', 'admin'];
    const assignedRole = validRoles.includes(role) ? role : 'student';

    const newUser = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: password || 'NursingPass@2026',
      role: assignedRole,
      collegeId,
      firebaseUid: firebaseUid || undefined,
      isActive: true,
      status: 'active',
      isDefaultPassword: !password
    });

    const token = generateToken(newUser);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(201).json({
      success: true,
      token,
      user: newUser.toJSON()
    });
  } catch (error) {
    console.error('[Auth Controller - Signup Error]:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Failed to create user account.', 
      details: error.message 
    });
  }
};

// 3. GET /api/auth/me
export const getMe = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Not authenticated' });
    }
    return res.status(200).json({ 
      success: true, 
      user: req.user.toJSON ? req.user.toJSON() : req.user 
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// 4. POST /api/auth/change-password
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ 
        success: false, 
        error: 'Current and new password are required.' 
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ 
        success: false, 
        error: 'New password must be at least 6 characters long.' 
      });
    }

    const userId = req.user._id || req.user.id || req.user.dbUserId;
    const user = await User.findById(userId).select('+password');
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    if (!(await user.matchPassword(currentPassword))) {
      return res.status(400).json({ 
        success: false, 
        error: 'Current password incorrect.' 
      });
    }

    user.password = newPassword;
    user.isDefaultPassword = false;
    await user.save();

    return res.status(200).json({ 
      success: true, 
      message: 'Password updated successfully.' 
    });
  } catch (error) {
    console.error('[Auth Controller - Change Password Error]:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

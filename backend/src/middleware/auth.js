import jwt from 'jsonwebtoken';
import admin, { isFirebaseReady } from '../config/firebase.js';
import User from '../models/User.js';

/**
 * Primary Authentication Middleware
 * 1. Checks Authorization header (Bearer <token>) or cookie 'token'
 * 2. Verifies cryptographic signature via Backend JWT or Firebase Admin SDK
 * 3. Enforces that unverified/mock tokens are strictly forbidden in production
 * 4. Extracts role from custom claims or database user
 */
export const authenticateUser = async (req, res, next) => {
  try {
    let token = null;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1].trim();
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized: Authentication token missing.'
      });
    }

    const isProduction = process.env.NODE_ENV === 'production';
    let authenticatedUser = null;
    let decodedRole = null;

    // 1. Attempt verification as backend-issued signed JWT
    if (process.env.JWT_SECRET) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id || decoded._id);
        if (user) {
          if (!user.isActive || user.status === 'disabled') {
            return res.status(403).json({
              success: false,
              error: 'Forbidden: Your account has been disabled.'
            });
          }
          req.user = {
            _id: user._id,
            id: user._id,
            uid: user.firebaseUid || String(user._id),
            email: user.email,
            name: user.name,
            role: user.role,
            collegeId: user.collegeId,
            isActive: user.isActive,
            status: user.status
          };
          return next();
        }
      } catch (jwtErr) {
        // Not a backend JWT, proceed to Firebase verification
      }
    }

    // 2. Attempt verification as Firebase ID token via Admin SDK
    let decodedFirebaseToken = null;
    if (isFirebaseReady()) {
      try {
        decodedFirebaseToken = await admin.auth().verifyIdToken(token);
        if (decodedFirebaseToken) {
          decodedRole = decodedFirebaseToken.role || decodedFirebaseToken.claims?.role;
        }
      } catch (verifyErr) {
        // Firebase verification failed
      }
    }

    // 3. Fallback dev/mock token decoding ONLY allowed in non-production with explicit opt-in
    if (!decodedFirebaseToken) {
      const allowDevMock = !isProduction && (process.env.ALLOW_DEV_AUTH === 'true' || process.env.MOCK_AUTH === 'true');
      if (allowDevMock) {
        try {
          if (token.startsWith('eyJ') || token.startsWith('{')) {
            const payload = token.startsWith('{')
              ? JSON.parse(token)
              : JSON.parse(Buffer.from(token.split('.')[1] || token, 'base64').toString('utf8'));
            decodedFirebaseToken = {
              uid: payload.uid || payload.sub || payload.firebaseUid || payload.user_id,
              email: payload.email,
              role: payload.role,
              name: payload.name
            };
            decodedRole = payload.role;
          }
        } catch (e) {
          // Ignore parse errors
        }
      }
    }

    if (!decodedFirebaseToken || (!decodedFirebaseToken.uid && !decodedFirebaseToken.email)) {
      return res.status(401).json({
        success: false,
        error: 'Invalid, unverified, or expired authentication token.'
      });
    }

    // Look up or sync user in MongoDB
    let dbUser = await User.findOne({
      $or: [
        { firebaseUid: decodedFirebaseToken.uid },
        { email: decodedFirebaseToken.email?.toLowerCase() }
      ]
    });

    const adminEmails = [
      process.env.ADMIN_EMAIL,
      process.env.SECONDARY_ADMIN_EMAIL,
      'karandeaachal@gmail.com',
      'jthakre62@gmail.com'
    ].filter(Boolean).map((e) => e.toLowerCase().trim());

    const isSystemAdminEmail = decodedFirebaseToken.email && adminEmails.includes(decodedFirebaseToken.email.toLowerCase().trim());

    if (!dbUser) {
      if (isSystemAdminEmail) {
        // Auto-initialize system administrator account in MongoDB
        dbUser = await User.create({
          name: decodedFirebaseToken.name || (decodedFirebaseToken.email.includes('aachal') ? 'Aachal Karande' : 'Jay Thakre'),
          email: decodedFirebaseToken.email.toLowerCase().trim(),
          firebaseUid: decodedFirebaseToken.uid,
          role: 'admin',
          isActive: true,
          status: 'active'
        });
      } else {
        // Strictly reject any unregistered user
        return res.status(403).json({
          success: false,
          error: 'Access denied: Your account is not registered by an administrator. Please contact your department admin.'
        });
      }
    } else if (!dbUser.firebaseUid && decodedFirebaseToken.uid) {
      dbUser.firebaseUid = decodedFirebaseToken.uid;
      await dbUser.save();
    }

    if (dbUser && (!dbUser.isActive || dbUser.status === 'disabled')) {
      return res.status(403).json({
        success: false,
        error: 'Access denied: Your account has been disabled by an administrator.'
      });
    }

    // Role resolution: Custom Claim takes precedence, falling back to DB role
    const effectiveRole = decodedRole || dbUser?.role || 'student';

    req.user = {
      _id: dbUser?._id,
      id: dbUser?._id,
      uid: decodedFirebaseToken.uid,
      email: decodedFirebaseToken.email,
      name: decodedFirebaseToken.name || dbUser?.name,
      role: effectiveRole,
      collegeId: dbUser?.collegeId || 'COLLEGE_001',
      isActive: dbUser ? dbUser.isActive : true,
      status: dbUser ? dbUser.status : 'active'
    };

    return next();
  } catch (err) {
    console.error('[Auth Middleware Error]:', err);
    return res.status(401).json({
      success: false,
      error: 'Authentication failed.',
      details: err.message
    });
  }
};

// Role-based authorization filter (RBAC enforced in middleware only)
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized: User authentication required.'
      });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: `Forbidden: requires one of [${roles.join(', ')}]. Current role: '${req.user.role}'`
      });
    }
    next();
  };
};

export const verifyFirebaseToken = authenticateUser;

import express from 'express';
import rateLimit from 'express-rate-limit';
import { login, signup, getMe, changePassword } from '../controllers/authController.js';
import { authenticateUser } from '../middleware/auth.js';
import { validateBody } from '../middleware/validate.js';
import { loginSchema, signupSchema, changePasswordSchema } from '../schemas/index.js';

const router = express.Router();

// Strict rate limiter for authentication endpoints to prevent brute force
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === 'test' ? 1000 : 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many authentication attempts. Please try again after 15 minutes.'
  }
});

// Public auth endpoints protected by rate limiting and Zod validation
router.post('/login', authLimiter, validateBody(loginSchema), login);
router.post('/signup', authLimiter, validateBody(signupSchema), signup);

// Protected auth endpoints
router.get('/me', authenticateUser, getMe);
router.post('/change-password', authenticateUser, validateBody(changePasswordSchema), changePassword);

export default router;

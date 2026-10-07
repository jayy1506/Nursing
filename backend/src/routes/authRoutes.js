import express from 'express';
import { login, signup, getMe, changePassword } from '../controllers/authController.js';
import { authenticateUser } from '../middleware/auth.js';

const router = express.Router();

// Public auth endpoints
router.post('/login', login);
router.post('/signup', signup);

// Protected auth endpoints
router.get('/me', authenticateUser, getMe);
router.post('/change-password', authenticateUser, changePassword);

export default router;

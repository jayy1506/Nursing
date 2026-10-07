import express from 'express';
import {
  createUser,
  listUsers,
  updateUserStatus,
  deleteUser,
  getCurrentUserProfile
} from '../controllers/userController.js';
import { verifyFirebaseToken } from '../middleware/auth.js';
import { requireRole } from '../middleware/roleGuard.js';

const router = express.Router();

// All user routes require authenticated Firebase token
router.use(verifyFirebaseToken);

// Get authenticated user's own profile
router.get('/me', getCurrentUserProfile);

// Admin-only management endpoints
router.post('/', requireRole(['admin']), createUser);
router.get('/', requireRole(['admin']), listUsers);
router.patch('/:id/status', requireRole(['admin']), updateUserStatus);
router.delete('/:id', requireRole(['admin']), deleteUser);

export default router;

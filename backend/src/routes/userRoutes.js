import express from 'express';
import {
  createUser,
  listUsers,
  updateUserStatus,
  deleteUser,
  getCurrentUserProfile,
  bulkImportUsers
} from '../controllers/userController.js';
import { verifyFirebaseToken } from '../middleware/auth.js';
import { requireRole } from '../middleware/roleGuard.js';
import { validateBody } from '../middleware/validate.js';
import { createUserSchema, updateUserStatusSchema } from '../schemas/index.js';

const router = express.Router();

// All user routes require authenticated token
router.use(verifyFirebaseToken);

// Get authenticated user's own profile
router.get('/me', getCurrentUserProfile);

// Admin-only management endpoints with Zod validation
router.post('/', requireRole(['admin']), validateBody(createUserSchema), createUser);
router.post('/bulk-import', requireRole(['admin']), bulkImportUsers);
router.get('/', requireRole(['admin']), listUsers);
router.patch('/:id/status', requireRole(['admin']), validateBody(updateUserStatusSchema), updateUserStatus);
router.delete('/:id', requireRole(['admin']), deleteUser);

export default router;

import express from 'express';
import {
  chatWithChapterTutor,
  getChatAuditLogs,
  reindexAllContent
} from '../controllers/ragController.js';
import { verifyFirebaseToken } from '../middleware/auth.js';
import { requireRole } from '../middleware/roleGuard.js';

const router = express.Router();

router.use(verifyFirebaseToken);

// All active students (and staff) can chat with chapter tutor
router.post('/chat', chatWithChapterTutor);

// Admin & Faculty can inspect chat logs
router.get('/logs', requireRole(['admin', 'faculty']), getChatAuditLogs);

// Admin & Faculty can re-index vector database
router.post('/reindex', requireRole(['admin', 'faculty']), reindexAllContent);

export default router;

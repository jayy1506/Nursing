import express from 'express';
import {
  getFullCourseHierarchy,
  getChapterById,
  getSubtopicById,
  upsertSubtopic,
  upsertChapter
} from '../controllers/courseController.js';
import { verifyFirebaseToken } from '../middleware/auth.js';
import { requireRole } from '../middleware/roleGuard.js';

const router = express.Router();

router.use(verifyFirebaseToken);

// All roles can view course hierarchy, chapter details, and subtopic content
router.get('/hierarchy', getFullCourseHierarchy);
router.get('/chapters/:id', getChapterById);
router.get('/subtopics/:id', getSubtopicById);

// Admin & Faculty can edit chapters & subtopics
router.post('/chapters', requireRole(['admin', 'faculty']), upsertChapter);
router.put('/chapters/:id', requireRole(['admin', 'faculty']), upsertChapter);
router.post('/subtopics', requireRole(['admin', 'faculty']), upsertSubtopic);
router.put('/subtopics/:id', requireRole(['admin', 'faculty']), upsertSubtopic);

export default router;

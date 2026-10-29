import express from 'express';
import {
  getAssessmentQuestions,
  submitAssessmentAttempt,
  syncOfflineAttempts,
  getAttemptsHistory,
  upsertQuestion,
  deleteQuestion
} from '../controllers/assessmentController.js';
import { verifyFirebaseToken } from '../middleware/auth.js';
import { requireRole } from '../middleware/roleGuard.js';

const router = express.Router();

router.use(verifyFirebaseToken);

// Assessment runner endpoints (gating verified server-side inside controller)
router.get('/questions/:scopeType/:scopeId', getAssessmentQuestions);
router.post('/submit', submitAssessmentAttempt);
router.post('/sync-offline', syncOfflineAttempts);

// Results history (students see own; admin/faculty see all)
router.get('/attempts', getAttemptsHistory);

// Admin & Faculty question authoring
router.post('/questions', requireRole(['admin', 'faculty']), upsertQuestion);
router.put('/questions/:id', requireRole(['admin', 'faculty']), upsertQuestion);
router.delete('/questions/:id', requireRole(['admin', 'faculty']), deleteQuestion);

export default router;

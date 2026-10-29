import express from 'express';
import { getMyProgress, syncProgress, getCompletedUnits } from '../controllers/progressController.js';
import { verifyFirebaseToken } from '../middleware/auth.js';

const router = express.Router();

router.use(verifyFirebaseToken);

// Student progress metrics overview
router.get('/overview', getMyProgress);

// Two-way localStorage <-> MongoDB sync
router.post('/sync', syncProgress);
router.get('/units', getCompletedUnits);

export default router;

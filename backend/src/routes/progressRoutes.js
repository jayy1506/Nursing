import express from 'express';
import { getMyProgress } from '../controllers/progressController.js';
import { verifyFirebaseToken } from '../middleware/auth.js';

const router = express.Router();

router.use(verifyFirebaseToken);

// Student progress metrics overview
router.get('/overview', getMyProgress);

export default router;

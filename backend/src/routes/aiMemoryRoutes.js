import express from 'express';
import {
  handleAIQuery,
  checkMemorySimilarity,
  getStats,
  getEntries,
  clearCache
} from '../controllers/aiMemoryController.js';
import { aiRateLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Optional Auth middleware: attaches user if token present, otherwise proceeds as guest
const optionalAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      if (token && (token.startsWith('eyJ') || token.startsWith('{'))) {
        try {
          const payload = token.startsWith('{')
            ? JSON.parse(token)
            : JSON.parse(Buffer.from(token.split('.')[1] || token, 'base64').toString('utf8'));
          req.user = {
            uid: payload.uid || payload.sub || payload.id || 'student',
            name: payload.name || payload.email?.split('@')[0] || 'Student Learner',
            email: payload.email || '',
            role: payload.role || 'student'
          };
        } catch {
          // ignore parsing error
        }
      }
    }
  } catch {
    // continue
  }
  if (!req.user) {
    req.user = { uid: 'guest', name: 'Student Learner', email: '', role: 'student' };
  }
  next();
};

// Query AI with OpenAI Token-Saving Memory Cache (protected by Upstash Rate Limiter)
router.post('/query', optionalAuth, aiRateLimiter, handleAIQuery);

// Check if a query would hit memory cache
router.get('/check-similarity', checkMemorySimilarity);

// Get real-time stats on tokens saved and memory hits
router.get('/stats', getStats);

// Inspect cached memory queries
router.get('/entries', getEntries);

// Reset memory cache
router.post('/clear', clearCache);

export default router;

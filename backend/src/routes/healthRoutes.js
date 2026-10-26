import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

/**
 * Health Check Endpoint
 * Exposed at:
 *   - GET /health
 *   - GET /api/health
 *
 * Designed for Render Health Check Path and GitHub Actions Uptime Monitoring.
 * Evaluates database connection readiness, memory usage, and process uptime.
 */
router.get('/health', async (req, res) => {
  const startTime = Date.now();

  // Mongoose readyState mapping:
  // 0: disconnected, 1: connected, 2: connecting, 3: disconnecting
  const dbState = mongoose.connection ? mongoose.connection.readyState : 0;
  const isDbHealthy = dbState === 1;

  const memUsage = process.memoryUsage();
  const memory = {
    heapUsedMB: Math.round((memUsage.heapUsed / 1024 / 1024) * 100) / 100,
    heapTotalMB: Math.round((memUsage.heapTotal / 1024 / 1024) * 100) / 100,
    rssMB: Math.round((memUsage.rss / 1024 / 1024) * 100) / 100
  };

  const payload = {
    status: isDbHealthy ? 'healthy' : 'degraded',
    service: 'MedPulse Nursing AI & LMS Backend API',
    environment: process.env.NODE_ENV || 'development',
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    database: {
      connected: isDbHealthy,
      stateCode: dbState,
      status: isDbHealthy ? 'connected' : (dbState === 2 ? 'connecting' : 'disconnected')
    },
    memory,
    responseTimeMs: Date.now() - startTime
  };

  // If in production and DB is not connected, respond 503 so Render deployment check or uptime monitor fails
  if (!isDbHealthy && process.env.NODE_ENV === 'production') {
    return res.status(503).json(payload);
  }

  return res.status(200).json(payload);
});

export default router;

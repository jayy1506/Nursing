import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import { connectDB } from './config/db.js';
import { initFirebaseAdmin } from './config/firebase.js';
import { logger, reqLogger, initSentryHook } from './config/logger.js';

dotenv.config();

// ================= Production Safety Validations =================
if (process.env.NODE_ENV === 'production') {
  if (process.env.ALLOW_DEV_AUTH === 'true' || process.env.MOCK_AUTH === 'true') {
    logger.fatal('[FATAL CONFIGURATION ERROR] Mock/Dev authentication mode is strictly forbidden when NODE_ENV=production. Server startup aborted.');
    process.exit(1);
  }
  if (!process.env.JWT_SECRET) {
    logger.fatal('[FATAL CONFIGURATION ERROR] JWT_SECRET must be configured in production. Server startup aborted.');
    process.exit(1);
  }
  if (!process.env.CLIENT_URL) {
    logger.fatal('[FATAL CONFIGURATION ERROR] CLIENT_URL must be configured in production for CORS protection. Server startup aborted.');
    process.exit(1);
  }
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDistPath = path.resolve(__dirname, '../../frontend/dist');
const swaggerDocPath = path.resolve(__dirname, './docs/swagger.json');

let swaggerDocument = {};
if (fs.existsSync(swaggerDocPath)) {
  swaggerDocument = JSON.parse(fs.readFileSync(swaggerDocPath, 'utf8'));
}

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import assessmentRoutes from './routes/assessmentRoutes.js';
import progressRoutes from './routes/progressRoutes.js';
import ragRoutes from './routes/ragRoutes.js';
import aiMemoryRoutes from './routes/aiMemoryRoutes.js';
import { preloadMemoryCache } from './services/semanticMemoryService.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Optional Sentry Hook
initSentryHook(app);

// Connect to MongoDB
connectDB().then((connected) => {
  if (connected) {
    preloadMemoryCache();
  }
});

// Initialize Firebase Admin SDK
initFirebaseAdmin();

// Structured HTTP Request Logging (Pino)
app.use(reqLogger);

// Enhanced Security Headers via Helmet
app.use(helmet({
  contentSecurityPolicy: false, // Preserves embedded SVGs, canvas, and Vite assets
  crossOriginResourcePolicy: { policy: 'same-origin' },
  crossOriginEmbedderPolicy: false,
  xContentTypeOptions: true,
  xFrameOptions: { action: 'deny' },
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
}));

// CORS Configuration strictly restricted to configured frontend origin
const allowedOrigins = [
  process.env.CLIENT_URL,
  ...(process.env.NODE_ENV !== 'production' ? ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:5000', 'http://127.0.0.1:5000'] : [])
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true);
    }
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`CORS blocked: Origin ${origin} not permitted.`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));

// Global Express Rate Limit for all API endpoints
const globalApiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: process.env.NODE_ENV === 'test' ? 10000 : 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many requests from this IP address. Please try again after 15 minutes.'
  }
});
app.use('/api/', globalApiLimiter);

// Interactive OpenAPI / Swagger Documentation
if (swaggerDocument && Object.keys(swaggerDocument).length > 0) {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  logger.info(`[Swagger Docs] Available at http://127.0.0.1:${PORT}/api/docs`);
}

// Healthcheck Route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    system: 'MedPulse Nursing AI & LMS Backend API',
    timestamp: new Date(),
    auth: 'Firebase Auth + MongoDB Role-Based Access Control',
    rag: 'Chapter-Scoped Hybrid Vector Search',
    memoryCache: 'Active',
    rateLimiter: 'Active (Sliding Window & Daily Quota Shield)',
    docs: '/api/docs'
  });
});

// Mount API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/assessments', assessmentRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/rag', ragRoutes);
app.use('/api/ai', aiMemoryRoutes);

// In production or cloud deployments: Serve frontend from frontend/dist
if (fs.existsSync(frontendDistPath)) {
  logger.info({ path: frontendDistPath }, '[Production] Serving frontend static assets');
  app.use(express.static(frontendDistPath));

  app.get('*', (req, res, next) => {
    if (req.originalUrl.startsWith('/api/')) {
      return next();
    }
    res.sendFile(path.join(frontendDistPath, 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.status(200).json({
      success: true,
      message: 'MedPulse Medical & Nursing LMS Backend API is running.',
      frontendUrl: process.env.CLIENT_URL || 'http://localhost:5173',
      health: '/api/health',
      docs: '/api/docs'
    });
  });
}

// 404 Handler for unmatched API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    error: `API Route not found: ${req.method} ${req.originalUrl}`
  });
});

// Fallback 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Route not found: ${req.method} ${req.originalUrl}`
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  if (err.message && err.message.includes('CORS blocked')) {
    return res.status(403).json({
      success: false,
      error: err.message
    });
  }
  logger.error({ err, url: req.originalUrl, method: req.method }, '[Server Error]');
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error'
  });
});

app.listen(PORT, '0.0.0.0', () => {
  logger.info(`[MedPulse LMS Server] Running on http://127.0.0.1:${PORT}`);
  logger.info(`[Healthcheck] http://127.0.0.1:${PORT}/api/health`);
  logger.info(`[OpenAPI Docs] http://127.0.0.1:${PORT}/api/docs`);
});

// Process Safety Handlers
process.on('unhandledRejection', (reason, promise) => {
  logger.error({ reason, promise }, '[Unhandled Rejection]');
});

process.on('uncaughtException', (err) => {
  logger.fatal({ err }, '[Uncaught Exception]');
});

export default app;

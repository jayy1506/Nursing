import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import { initFirebaseAdmin } from './config/firebase.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDistPath = path.resolve(__dirname, '../../frontend/dist');

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import assessmentRoutes from './routes/assessmentRoutes.js';
import progressRoutes from './routes/progressRoutes.js';
import ragRoutes from './routes/ragRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Initialize Firebase Admin SDK
initFirebaseAdmin();

// Middleware
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));

// Healthcheck Route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    system: 'Nursing AI & LMS Backend API',
    timestamp: new Date(),
    auth: 'Dual/Hybrid Auth (Firebase + MongoDB JWT)',
    rag: 'Chapter-Scoped Vector Search'
  });
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/assessments', assessmentRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/rag', ragRoutes);

// In production or cloud deployments: Serve frontend from frontend/dist
if (fs.existsSync(frontendDistPath)) {
  console.log(`[Production] Serving frontend static assets from: ${frontendDistPath}`);
  app.use(express.static(frontendDistPath));

  // SPA fallback: any GET request that doesn't start with /api returns index.html
  app.get('*', (req, res, next) => {
    if (req.originalUrl.startsWith('/api/')) {
      return next();
    }
    res.sendFile(path.join(frontendDistPath, 'index.html'));
  });
} else {
  // Dev mode landing page if frontend build doesn't exist
  app.get('/', (req, res) => {
    res.status(200).json({
      success: true,
      message: 'MetaNutriBio Nursing AI & LMS Backend API is running.',
      frontendUrl: 'http://localhost:5173',
      health: '/api/health'
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
  console.error('[Server Error]:', err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error'
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[Nursing LMS Server] Running on http://127.0.0.1:${PORT}`);
  console.log(`[Healthcheck] http://127.0.0.1:${PORT}/api/health`);
});

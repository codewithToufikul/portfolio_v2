import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './db.js';
import healthRouter from './routes/health.js';
import contactRouter from './routes/contact.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// CORS configuration
const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:5173',
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or server-to-server)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
        return callback(null, true);
      }
      return callback(null, true); // Permissive in dev
    },
    credentials: true,
  })
);

app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true }));

// Request logging for ops-style console output
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[HTTP] ${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`);
  });
  next();
});

// Routes
app.use('/api/health', healthRouter);
app.use('/api/contact', contactRouter);

// Root greeting / ops status
app.get('/api', (req, res) => {
  res.json({
    status: 'online',
    system: 'toufikul-portfolio-api',
    version: '2.0.0',
    developer: 'Toufikul Islam (MERN Stack Developer)',
    endpoints: [
      'GET /api/health',
      'POST /api/contact',
      'GET /api/contact/messages'
    ],
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    ok: false,
    status: 404,
    error: 'Not Found',
    path: req.originalUrl,
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('[Unhandled Server Error]', err);
  res.status(500).json({
    ok: false,
    status: 500,
    error: 'Internal Server Error',
    message: err.message,
  });
});

// Start server if not running on Vercel
async function start() {
  await connectDB();
  if (!process.env.VERCEL) {
    app.listen(PORT, () => {
      console.log(`[Server] Telemetry daemon operational on http://localhost:${PORT}`);
    });
  }
}

start();

export default app;

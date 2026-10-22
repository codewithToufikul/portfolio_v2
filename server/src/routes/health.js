import express from 'express';
import os from 'os';
import mongoose from 'mongoose';

const router = express.Router();

router.get('/', (req, res) => {
  const mem = process.memoryUsage();
  const uptimeSeconds = Math.floor(process.uptime());
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'in-memory-fallback';

  res.json({
    status: 'operational',
    service: 'toufikul-api',
    environment: process.env.NODE_ENV || 'development',
    serverTime: new Date().toISOString(),
    dhakaTime: new Date().toLocaleTimeString('en-GB', { timeZone: 'Asia/Dhaka', hour12: false }),
    uptime: {
      seconds: uptimeSeconds,
      formatted: `${Math.floor(uptimeSeconds / 3600)}h ${Math.floor((uptimeSeconds % 3600) / 60)}m ${uptimeSeconds % 60}s`,
    },
    system: {
      platform: os.platform(),
      arch: os.arch(),
      cpus: os.cpus().length,
      freeMemoryMB: Math.round(os.freemem() / (1024 * 1024)),
      totalMemoryMB: Math.round(os.totalmem() / (1024 * 1024)),
      loadAvg: os.loadavg(),
    },
    process: {
      nodeVersion: process.version,
      rssMB: Math.round(mem.rss / (1024 * 1024)),
      heapUsedMB: Math.round(mem.heapUsed / (1024 * 1024)),
      heapTotalMB: Math.round(mem.heapTotal / (1024 * 1024)),
    },
    database: {
      status: dbStatus,
      isRealMongo: mongoose.connection.readyState === 1,
    },
  });
});

export default router;

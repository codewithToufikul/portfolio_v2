import express from 'express';
import { z } from 'zod';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import { Contact } from '../models/Contact.js';
import { inMemoryContacts } from '../db.js';
import { sendContactNotification } from '../utils/mailer.js';

const router = express.Router();

// Rate limiting: 10 contact requests per 15 min per IP
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    ok: false,
    status: 429,
    error: 'Too Many Requests',
    message: 'Rate limit exceeded. Please wait a few minutes before transmitting more data.',
  },
});

const ContactSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100, 'Name cannot exceed 100 characters'),
  email: z.string().trim().email('Invalid email address format').max(255),
  subject: z.string().trim().max(150).optional().default('Portfolio Direct Contact'),
  message: z.string().trim().min(5, 'Message must be at least 5 characters').max(5000, 'Message cannot exceed 5000 characters'),
  honeypot: z.string().max(0).optional().or(z.literal('')), // Honeypot spam trap
});

router.post('/', contactLimiter, async (req, res) => {
  const startTime = Date.now();
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';

  // 1. Honeypot check: if bot filled this hidden field, silently reject or accept with dummy response
  if (req.body.honeypot || req.body.botField) {
    console.warn(`[Spam Alert] Honeypot triggered by IP: ${clientIp}`);
    return res.status(202).json({
      ok: true,
      status: 202,
      note: 'Message acknowledged.',
      latencyMs: Date.now() - startTime,
    });
  }

  // 2. Validate input using Zod
  const parseResult = ContactSchema.safeParse(req.body);
  if (!parseResult.success) {
    const errorMessages = parseResult.error.errors.map((e) => `${e.path.join('.')}: ${e.message}`);
    return res.status(400).json({
      ok: false,
      status: 400,
      error: 'Validation Error',
      details: errorMessages,
      latencyMs: Date.now() - startTime,
    });
  }

  const { name, email, subject, message } = parseResult.data;

  try {
    let savedDoc = null;
    let storageType = 'in-memory';

    // 3. Save to MongoDB if connected, else fallback to inMemoryContacts
    if (mongoose.connection.readyState === 1) {
      savedDoc = await Contact.create({
        name,
        email,
        subject,
        message,
        ipAddress: clientIp,
        userAgent: req.headers['user-agent'] || '',
      });
      storageType = 'mongodb';
    } else {
      savedDoc = {
        _id: 'mem_' + Date.now().toString(36),
        name,
        email,
        subject,
        message,
        ipAddress: clientIp,
        createdAt: new Date().toISOString(),
      };
      inMemoryContacts.unshift(savedDoc);
      // Keep in-memory list bounded to last 100 entries
      if (inMemoryContacts.length > 100) inMemoryContacts.pop();
    }

    // 4. Send email notification asynchronously
    sendContactNotification({
      name,
      email,
      subject,
      message,
      ip: clientIp,
    }).catch((err) => console.error('[Contact] Mail error:', err));

    const latencyMs = Date.now() - startTime;

    return res.status(201).json({
      ok: true,
      status: 201,
      id: savedDoc._id,
      storage: storageType,
      message: `Transmission received from ${name}. Your message has been logged. Toufikul will reply shortly at ${email}.`,
      timestamp: new Date().toISOString(),
      latencyMs,
    });
  } catch (error) {
    console.error('[Contact Error]', error);
    return res.status(500).json({
      ok: false,
      status: 500,
      error: 'Internal Server Error',
      message: 'Failed to record transmission. Please try WhatsApp or email directly.',
      latencyMs: Date.now() - startTime,
    });
  }
});

// GET /api/contact/messages - dev route to verify messages
router.get('/messages', async (req, res) => {
  if (mongoose.connection.readyState === 1) {
    const messages = await Contact.find().sort({ createdAt: -1 }).limit(20);
    return res.json({ storage: 'mongodb', count: messages.length, messages });
  }
  return res.json({ storage: 'in-memory', count: inMemoryContacts.length, messages: inMemoryContacts });
});

export default router;

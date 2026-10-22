import mongoose from 'mongoose';

// In-memory fallback collection for local dev without MongoDB
const inMemoryContacts = [];

export async function connectDB() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/toufikul-portfolio';
  try {
    mongoose.set('strictQuery', false);
    // Timeout quickly if local mongod is not running so dev startup is instant
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2000,
    });
    console.log('[DB] Connected to MongoDB at:', uri);
    return true;
  } catch (err) {
    console.warn('[DB] MongoDB connection warning:', err.message);
    console.warn('[DB] Running with high-speed in-memory store for dev/testing.');
    return false;
  }
}

export { inMemoryContacts };

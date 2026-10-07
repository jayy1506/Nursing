import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/nursing_lms';
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000, // 5s timeout instead of hanging
    });
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    console.error(`[Database] MongoDB Connection Warning: ${error.message}`);
    console.warn(`[Database Hint] If using MongoDB Atlas, ensure Network Access IP Whitelist has 0.0.0.0/0 (Allow Access from Anywhere) enabled.`);
  }
};

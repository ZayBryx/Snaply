import mongoose from "mongoose";

// use provided env var, else NEXT_PUBLIC_MONGODB_URI, else fall back to a local MongoDB URI for dev
const MONGODB_URI =
  process.env.MONGODB_URI ||
  process.env.NEXT_PUBLIC_MONGODB_URI ||
  "mongodb://localhost:27017/Snaply";

let cached = (global as any).mongoose || { conn: null, promise: null };

export async function connectDB() {
  // warn if the explicit env var wasn't set
  if (!process.env.MONGODB_URI) {
    console.warn(
      "MONGODB_URI not set — falling back to mongodb://localhost:27017/Snaply. " +
        "Set MONGODB_URI in .env.local for production."
    );
  }

  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
      })
      .catch((err) => {
        // clear cached.promise so subsequent calls can retry
        cached.promise = null;
        throw err;
      });
  }
  cached.conn = await cached.promise;
  (global as any).mongoose = cached;
  return cached.conn;
}

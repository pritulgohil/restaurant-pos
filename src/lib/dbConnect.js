import mongoose from "mongoose";

// Determine MongoDB URI based on environment
const isProd = process.env.NODE_ENV === "production";
const MONGODB_URI = isProd
  ? process.env.MONGO_URI // Atlas in production
  : process.env.MONGO_URI_LOCAL; // Local in development

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGO_URI (for production) and MONGO_URI_LOCAL (for dev) environment variables"
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        maxPoolSize: 10,
      })
      .then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;

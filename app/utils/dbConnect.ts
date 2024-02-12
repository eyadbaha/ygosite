import mongoose from "mongoose";

declare global {
  var mongoose: any; // This must be a `var` and not a `let / const`
}

const MONGODB_URI =
  (process.env.NODE_ENV == "production" ? process.env.DB_ENDPOINT : process.env.DB_ENDPOINT_DEV) || "";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose.connection; // Return the connection object, not the entire mongoose module
    });
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;

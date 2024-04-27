import mongoose from "mongoose";

declare global {
  var mongoose: any; // This must be a `var` and not a `let / const`
}

const MONGODB_URI = (process.env.NODE_ENV == "production" ? process.env.DB_ENDPOINT : process.env.DB_ENDPOINT_DEV) || "";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}
let isConnected: boolean = false;
async function dbConnect() {
  if (isConnected) return;
  const db = await mongoose.connect(MONGODB_URI);
}

export default dbConnect;

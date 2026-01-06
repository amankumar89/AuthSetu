import mongoose from "mongoose";
import { ENV } from "./env.js";

const MONGO_URI = ENV.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("MONGO_URI not defined");
}

let cached = mongoose;

if (!cached) {
  cached = mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = await mongoose.connect(MONGO_URI).then((mongoose) => {
      console.log("Connected to database...", mongoose.connection.host);
      return mongoose
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

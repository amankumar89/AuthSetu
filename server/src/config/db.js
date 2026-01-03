import mongoose from "mongoose";
import { ENV } from "./env.js";

export default async function connectDB() {
  try {
    if (!ENV.MONGO_URI) throw new Error("MONGO URI Not Available.");
    const res = await mongoose.connect(ENV.MONGO_URI);
    console.log("Connected to database.", res.connection.host);
  } catch (error) {
    console.log("error in connecting db", error);
    process.exit(1);
  }
}

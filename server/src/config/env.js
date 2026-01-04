import dotenv from "dotenv";

dotenv.config({ quiet: true });

export const ENV = {
  PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1d",
  MAILTRAP_API_KEY: process.env.MAILTRAP_API_KEY,
  MAILTRAP_FROM_NAME: process.env.MAILTRAP_FROM_NAME || "AuthSetu",
  MAILTRAP_FROM_EMAIL: process.env.MAILTRAP_FROM_EMAIL,
};

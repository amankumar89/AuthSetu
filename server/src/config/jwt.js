import jwt from "jsonwebtoken";
import { ENV } from "./env.js";

// generate jwt token
export const generateToken = (id) => {
  return jwt.sign({ id }, ENV.JWT_SECRET, {
    expiresIn: ENV.JWT_EXPIRES_IN,
  });
};

// verify jwt token
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, ENV.JWT_SECRET);
  } catch {
    return null;
  }
};

// set cookie
export const generateTokenAndSetInCookie = (res, userId) => {
  const token = generateToken(userId);

  const cookieOptions = {
    maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    domain: ".vercel.app",
  };

  res.cookie("token", token, cookieOptions);
};

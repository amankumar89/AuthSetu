import { generateTokenAndSetInCookie } from "../config/jwt.js";
import {
  deleteUserSuccessEmail,
  passwordResetEmail,
  passwordResetSuccessEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../services/sendEmails.js";
import User from "../models/user.model.js";
import { asyncHandler } from "../utils/async-handler.js";
import { AppError } from "../middlewares/appError.js";
import {
  hashedValue,
  hashedValueCompare,
  sanitizeUser,
} from "../utils/helper.js";
import crypto from "crypto";

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name?.trim() || !email?.trim() || !password?.trim())
    throw new AppError("Name, Email, Password fields are required!", 400);

  // check if user exists or not
  const userExists = await User.findOne({ email });
  if (userExists) throw new AppError("User already exists", 409);

  // if not exist
  // hashed password
  const hashedPassword = await hashedValue(password);

  // generate verification token
  const verificationToken = crypto.randomInt(100000, 1000000).toString();

  const user = new User({
    name,
    email,
    password: hashedPassword,
    verificationToken,
    verificationTokenExpireAt: Date.now() + 1 * 60 * 60 * 1000, // 1 hour
  });

  // save user in db
  await user.save();

  // generate jwt token and set in cookie
  generateTokenAndSetInCookie(res, user._id);

  // send verification code email
  sendVerificationEmail(email, name, verificationToken, 1 * 60);

  return res.status(201).json({
    success: true,
    message: "User registered successfully! Please verify your email.",
    user: sanitizeUser(user),
  });
});

// verify email
export const verifyEmail = asyncHandler(async (req, res) => {
  const { code } = req.body;

  const user = await User.findOne({
    verificationToken: code,
    verificationTokenExpireAt: { $gt: Date.now() },
  });

  if (!user) throw new AppError("Invalid or expired verification code", 400);

  user.isVerified = true;
  user.verificationToken = undefined;
  user.verificationTokenExpireAt = undefined;

  await user.save();

  // send welcome emails
  sendWelcomeEmail(user.email, user.name);

  return res.status(200).json({
    success: true,
    message: "Verified Successfully",
    user: sanitizeUser(user),
  });
});

// login
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email?.trim() || !password?.trim())
    throw new AppError("Email, Password are required fields.", 400);

  // check if user exists or not
  const user = await User.findOne({ email });
  if (!user) throw new AppError("Invalid Credentials.", 400);

  const isPasswordValid = await hashedValueCompare(password, user.password);
  // user not found throw error
  if (!isPasswordValid) throw new AppError("Invalid Credentials.", 401);

  // if user exists generate token and set cookie
  generateTokenAndSetInCookie(res, user._id);

  user.lastLogin = Date.now();

  // save in db with latest data
  await user.save();

  // return res
  return res.status(200).json({
    success: true,
    message: "Login Successfull",
    user: sanitizeUser(user),
  });
});

// me
export const me = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userId).select("-password");
  if (!user) throw new AppError("User not found", 404);

  return res.status(200).json({ success: true, user: sanitizeUser(user) });
});

// logout
export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token");
  return res
    .status(200)
    .json({ success: true, message: "Logged out successfully" });
});

// delete user account from db
export const deleteUser = asyncHandler(async (req, res) => {
  // check for user exists
  const user = await User.findById(req.userId);
  if (!user) throw new AppError("User not found.", 404);

  deleteUserSuccessEmail(
    user.email,
    user.name,
    new Date().toLocaleString(),
    req.headers["user-agent"],
    req.headers["x-forwarded-for"] || req.socket.remoteAddress
  );
  await user.deleteOne();

  return res.status(200).json({ success: true, message: "User deleted." });
});

// forgot password
export const forgotPassword = asyncHandler(async (req, res) => {
  //   Validate email
  const { email, clientUrl } = req.body;

  if (!email?.trim() || !clientUrl?.trim())
    throw new AppError("email, clientUrl is required", 400);

  // Check user exists
  const user = await User.findOne({ email });

  // If not → return generic success (avoid user enumeration)
  if (!user)
    throw new AppError(
      {
        success: true,
        message: "If the email exists, a reset link has been sent",
      },
      200
    );

  // Generate reset token
  const resetPasswordToken = crypto.randomBytes(20).toString("hex");

  const resetPasswordTokenExpireAt = Date.now() + 1 * 60 * 60 * 1000;
  // Store hashed token + expiry in DB

  user.resetPasswordToken = resetPasswordToken;
  user.resetPasswordTokenExpireAt = resetPasswordTokenExpireAt;

  await user.save();

  // Send email with reset link
  passwordResetEmail(
    email,
    user.name,
    `${clientUrl}/${resetPasswordToken}`,
    60
  );

  return res.status(200).json({
    success: true,
    message: "If the email exists, a reset link has been sent",
  });
});

// reset password
export const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password: newPassword } = req.body;
  if (!token?.trim() || !newPassword?.trim())
    throw new AppError("new password is required", 400);

  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordTokenExpireAt: { $gt: Date.now() },
  });

  if (!user) throw new AppError("Invalid or Expired reset token", 400);

  const hashedPassword = await hashedValue(newPassword);

  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordTokenExpireAt = undefined;

  await user.save();

  passwordResetSuccessEmail(
    user.email,
    user.name,
    new Date().toLocaleString(),
    req.headers["user-agent"],
    req.headers["x-forwarded-for"] || req.socket.remoteAddress
  );

  return res.status(200).json({
    success: true,
    message: "Password reset successful.",
  });
});

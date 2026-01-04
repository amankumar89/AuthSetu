import nodemailer from "nodemailer";
import { ENV } from "../config/env.js";
import {
  EMAIL_VERIFICATION_TEMPLATE,
  PASSWORD_CHANGE_CONFIRMATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
} from "./emailTemplate.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: ENV.NODEMAILER_GOOGLE_EMAIL,
    pass: ENV.GOOGLE_APP_PASSWORD, // The 16-character App Password
  },
});

const sender = ENV.NODEMAILER_GOOGLE_EMAIL;

// send emails

// verfication email
export const sendVerificationEmail = async (
  email,
  userName,
  verificationToken,
  expiryMinutes
) => {
  try {
    const response = await transporter.sendMail({
      from: sender,
      to: email,
      subject: "Verify your email for AuthSetu",
      html: EMAIL_VERIFICATION_TEMPLATE.replace(
        "{{verificationCode}}",
        verificationToken
      )
        .replace("{{userName}}", userName)
        .replace("{{expiryMinutes}}", expiryMinutes),
      category: "Email Verification",
    });
    console.log("verification email sent successfully", response);
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};

// send welcome email
export const sendWelcomeEmail = async (email, userName) => {
  try {
    const response = await transporter.sendMail({
      from: sender,
      to: email,
      subject: "Welcome to AuthSetu App",
      html: WELCOME_EMAIL_TEMPLATE.replace("{{userName}}", userName),
      category: "Welcome Email",
    });
    console.log("welcome email sent successfully", response);
  } catch (error) {
    console.log("error in sending welcome email", error);
  }
};

// password reset email
export const passwordResetEmail = async (
  email,
  userName,
  resetLink,
  timeRemaining
) => {
  try {
    const response = await transporter.sendMail({
      from: sender,
      to: email,
      subject: "Reset Your Password",
      html: PASSWORD_RESET_EMAIL_TEMPLATE.replace("{{userName}}", userName)
        .replace("{{resetLink}}", resetLink)
        .replace("{{expiryMinutes}}", timeRemaining),
      category: "Password Reset",
    });
    console.log("password reset email sent successfully", response);
  } catch (error) {
    console.log("error in sending welcome email", error);
  }
};

// password reset success email
export const passwordResetSuccessEmail = async (
  email,
  userName,
  date,
  device,
  location
) => {
  try {
    const response = await transporter.sendMail({
      from: sender,
      to: email,
      subject: "Password Reset Successful",
      html: PASSWORD_CHANGE_CONFIRMATION_EMAIL_TEMPLATE.replace(
        "{{userName}}",
        userName
      )
        .replace("{{date}}", date)
        .replace("{{device}}", device)
        .replace("{{location}}", location),
      category: "Password Reset Success",
    });
    console.log("password reset success email sent successfully", response);
  } catch (error) {
    console.log("error in sending welcome email", error);
  }
};

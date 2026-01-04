import { MailtrapClient } from "mailtrap";
import { ENV } from "../config/env.js";
import {
  EMAIL_VERIFICATION_TEMPLATE,
  PASSWORD_CHANGE_CONFIRMATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
} from "./emailTemplate.js";

const mailtrapClient = new MailtrapClient({
  token: ENV.MAILTRAP_API_KEY,
});

const sender = {
  name: ENV.MAILTRAP_FROM_NAME,
  email: ENV.MAILTRAP_FROM_EMAIL,
};

// send emails

// verfication email
export const sendVerificationEmail = async (
  email,
  userName,
  appName,
  verificationToken,
  expiryMinutes
) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify your email for AuthSetu",
      html: EMAIL_VERIFICATION_TEMPLATE.replace(
        "{{verificationCode}}",
        verificationToken
      )
        .replace("{{appName}}", appName)
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
export const sendWelcomeEmail = async (email, userName, appName) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Welcome to AuthSetu App",
      html: WELCOME_EMAIL_TEMPLATE.replace("{{userName}}", userName).replace(
        "{{appName}}",
        appName
      ),
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
  appName,
  resetLink,
  timeRemaining
) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Reset Your Password",
      html: PASSWORD_RESET_EMAIL_TEMPLATE.replace("{{userName}}", userName)
        .replace("{{resetLink}}", resetLink)
        .replace("{{expiryMinutes}}", timeRemaining)
        .replace("{{appName}}", appName),
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
  appName,
  date,
  device,
  location
) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Password Reset Successful",
      html: PASSWORD_CHANGE_CONFIRMATION_EMAIL_TEMPLATE.replace(
        "{{userName}}",
        userName
      )
        .replace("{{appName}}", appName)
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

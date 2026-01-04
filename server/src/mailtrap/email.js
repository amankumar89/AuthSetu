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
  name: "Aman Kumar",
  email: "amankumaroo784@gmail.com",
};

// send emails

// verfication email
export const sendVerificationEmail = async (email, verficationToken) => {
  const receipient = [{ email }];
  try {
    await mailtrapClient.send({
      from: sender,
      to: receipient,
      subject: "Verify your email for AuthSetu",
      html: EMAIL_VERIFICATION_TEMPLATE.replace(
        "{{verificationCode}}",
        verficationToken
      ),
      category: "Email Verification",
    });
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};

// send welcome email
export const sendWelcomeEmail = async (email, userName, appName) => {
  const receipient = [{ email }];
  try {
    await mailtrapClient.send({
      from: sender,
      to: receipient,
      subject: "Welcome to AuthSetu App",
      html: WELCOME_EMAIL_TEMPLATE?.replace("{{userName}}", userName)?.replace(
        "{{appName}}",
        appName
      ),
      category: "Welcome Email",
    });
  } catch (error) {
    console.log("error in sending welcome email", error);
  }
};

// password reset email
export const passwordResetEmail = async (
  userName,
  resetLink,
  timeRemaining
) => {
  const receipient = [{ email }];
  try {
    await mailtrapClient.send({
      from: sender,
      to: receipient,
      subject: "Reset Your Password",
      html: PASSWORD_RESET_EMAIL_TEMPLATE?.replace("{{userName}}", userName)
        ?.replace("{{resetLink}}", resetLink)
        ?.replace("{{expiryMinutes}}", timeRemaining),
      category: "Password Reset",
    });
  } catch (error) {
    console.log("error in sending welcome email", error);
  }
};

// password reset success email
export const passwordResetSuccessEmail = async (
  userName,
  appName,
  date,
  device,
  location
) => {
  const receipient = [{ email }];
  try {
    await mailtrapClient.send({
      from: sender,
      to: receipient,
      subject: "Password Reset Successfull",
      html: PASSWORD_CHANGE_CONFIRMATION_EMAIL_TEMPLATE?.replace(
        "{{userName}}",
        userName
      )
        ?.replace("{{appName}}", appName)
        ?.replace("{{date}}", date)
        ?.replace("{{device}}", device)
        ?.replace("{{location}}", location),
      category: "Password Reset Success",
    });
  } catch (error) {
    console.log("error in sending welcome email", error);
  }
};

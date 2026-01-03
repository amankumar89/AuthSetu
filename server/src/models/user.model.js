import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: ["name is required field"],
    },
    email: {
      type: String,
      required: ["email is required field"],
      unique: true,
    },
    password: {
      type: String,
      required: ["password is required field"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    verificationToken: String,
    verificationTokenExpireAt: Date,
    resetPasswordToken: String,
    resetPasswordTokenExpireAt: Date,
  },
  { timestamps }
);

export default User = mongoose.model("User", userSchema);

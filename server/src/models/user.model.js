import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required field"],
    },
    email: {
      type: String,
      required: [true, "email is required field"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required field"],
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
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;

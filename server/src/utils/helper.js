import bcryptjs from "bcryptjs";

export const sanitizeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  isVerified: user.isVerified,
  lastLogin: user.lastLogin,
  createdAt: user.createdAt,
});

export const hashedValue = async (value, salt = 12) =>
  await bcryptjs.hash(value, salt);

export const hashedValueCompare = async (value, hashedValue) =>
  await bcryptjs.compare(value, hashedValue);

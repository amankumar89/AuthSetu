import jwt from "jsonwebtoken";

// verify token
export const authenticate = (req, res, next) => {
  // check token in cookies and headers both
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Access denied. No token provided." });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log("error in authenticate middleware", error);
    return res.status(400).json({ success: false, message: "Invalid token." });
  }
};

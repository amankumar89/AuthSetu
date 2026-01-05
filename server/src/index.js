import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ENV } from "./config/env.js";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.route.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(errorHandler);
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to AuthSetu server...",
  });
});

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    service: "AuthSetu",
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
});

// Auth routes
app.use("/api/auth", authRoutes);

// 404 handler (catch-all)
app.all("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    availableEndpoints: {
      auth: "/api/auth",
      health: "/health",
    },
  });
});

app.listen(ENV.PORT, (err) => {
  if (err) {
    console.log("error in running server", err);
    process.exit(1);
  }
  console.log(`Server is running at http://localhost:${ENV.PORT}`);
  connectDB();
});

export default app;

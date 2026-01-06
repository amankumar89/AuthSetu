import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.route.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

const corsOptions = {
  origin: [
    'https://auth-setu-server.vercel.app',
    'http://localhost:3000',
    'http://localhost:5173', 
    'http://localhost:5000',
  ],
  credentials: true, // Allow cookies/credentials
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin',
    'Access-Control-Allow-Headers',
    'Access-Control-Request-Headers',
    'Access-Control-Allow-Origin'
  ],
  exposedHeaders: ['Authorization', 'Set-Cookie'],
  maxAge: 86400 // 24 hours
};

app.use(cookieParser());
app.use(cors(corsOptions));

app.use(express.json());

connectDB();

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

app.use(errorHandler);

if (ENV.NODE_ENV === "development") {
  app.listen(ENV.PORT, (err) => {
    if (err) {
      console.log("error in running server", err);
      process.exit(1);
    }
    console.log(`Server is running at http://localhost:${ENV.PORT}`);
    });
}


export default app;

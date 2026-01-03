import express from "express";
import cors from "cors";
import { ENV } from "./config/env.js";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.route.js";

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (_, res) => {
  return res.status(200).json({
    success: true,
    message: "AuthSetu server is healthy.",
  });
});
app.use("/api/auth", authRoutes);

app.listen(ENV.PORT, (err) => {
  if (err) {
    console.log("error in running server", err);
    process.exit(1);
  }
  console.log(`Server is running at http://localhost:${ENV.PORT}`);
  connectDB();
});

export default app;

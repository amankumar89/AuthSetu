import express from "express";
import { ENV } from "./config/env.js";

const app = express();

app.get("/", (req, res) => {
  res.send("AuthSetu Server running...");
});

app.listen(ENV.PORT, () => {
  console.log(`Server is running at http://localhost:${ENV.PORT}`);
});

export default app;

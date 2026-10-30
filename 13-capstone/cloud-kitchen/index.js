import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db.config.js";
import { connectRedis } from "./config/redis.config.js";
import app from "./src/app.js";

const PORT = process.env.PORT || 5000;

connectDB()
  .then(async () => {
    await connectRedis();
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`API Docs: http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((err) => {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  });

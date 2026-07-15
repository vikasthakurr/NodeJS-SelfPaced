import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.config.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
connectDB();

app.use("/api/auth/v1/", authRoutes);

app.listen(process.env.PORT, () => {
  console.log("server is running");
});

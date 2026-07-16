import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.config.js";
import authController from "./controllers/authController.js";

const app = express();
app.use(express.json());
dotenv.config();

const PORT = process.env.PORT;
connectDB();

app.use("/api/v1/auth",authController)

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

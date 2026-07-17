import dotenv from "dotenv";
import express from "express";
import productRoute from "./controllers/products.controller.js";
import connectDB from "./db.config.js";

const app = express();
app.use(express.json());
dotenv.config();

const PORT = process.env.PORT;
connectDB();

app.use("/api", productRoute);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

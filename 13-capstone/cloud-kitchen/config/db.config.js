import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

//retry method need to be implemented
async function connectDB() {
  await mongoose.connect(process.env.MONGO_URL);

  console.log("MongoDB Connected....");
}
export default connectDB;

import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connected to mongodb database");
  } catch (error) {
    console.log("error in mongodb", error.message);
  }
};
export default connectDB;

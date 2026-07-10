import mongoose from "mongoose";
async function connectDB() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("DB Connected");
}
export default connectDB;

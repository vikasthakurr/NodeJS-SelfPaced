import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/user.model.js";

dotenv.config();

async function seedAdmin() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Connected to DB");

  const existingAdmin = await User.findOne({ email: "admin@gmail.com" });

  if (existingAdmin) {
    console.log("Admin user already exists, skipping...");
    await mongoose.disconnect();
    process.exit(0);
  }

  const hashedPassword = await bcrypt.hash("admin123", 10);

  const admin = new User({
    username: "admin",
    email: "admin@gmail.com",
    password: hashedPassword,
    role: "admin",
  });

  await admin.save();
  console.log("✅ Admin user created successfully");
  console.log("   Email: admin@gmail.com");
  console.log("   Password: admin123");

  await mongoose.disconnect();
  process.exit(0);
}

seedAdmin();

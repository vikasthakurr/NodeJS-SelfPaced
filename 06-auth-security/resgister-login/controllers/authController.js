import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
import verification from "../middleware/authMiddle.js";
import User from "../models/user.model.js";

dotenv.config();

const authController = express.Router();

authController.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existed = await User.findOne({ email });
    if (existed)
      return res.status(400).json({ message: "user already existed" });

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.json({ message: "user created", user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

authController.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "user not found" });
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      return res.status(404).json({ message: "password not matched" });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
    );
    res.cookie(
      "token",
      token,
      { httpOnly: true },
      new Date(Date.now() + 900000),
      {
        path: "/",
      },
    );
    console.log(token);

    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

authController.get("/profile", verification, async (req, res) => {
  console.log("its is a protected route");
  req.user.role = "admin";
  res.json(req.user);
});

export default authController;

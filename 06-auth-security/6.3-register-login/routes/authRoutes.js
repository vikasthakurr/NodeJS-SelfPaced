import express from "express";
import bcrypt from "bcryptjs"
import User from "../model/User.js";
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const isAlready = await User.findOne({ email });
    if (isAlready) throw new Error("user already exist");
    const user = new User({ username, email, password: hashedPassword });
    const savedUser = await user.save();
    if (!savedUser)
      return res
        .status(400)
        .json({ message: "something went wrong while registering" });
    res.json(savedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "user does not exist" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "password not matched" });
    res.json({ message: "login successfull" });
  } catch (err) {
    console.log(err);
  }
});
export default router;


import User from "../../models/user.model.js";
import bcrypt from "bcryptjs";
import asyncHandler from "../../utils/asyncHandler.util.js";
import ApiError from "../../utils/ApiError.util.js";
import jwt from "jsonwebtoken";

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User does not exist create account first");
  }
  const isValidPass = await bcrypt.compare(password, user.password);

  if (!isValidPass) {
    throw new ApiError(401, "Invalid credentials");
  }
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      username: user.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRY || "1h",
    },
  );
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    success: true,
    message: "Logged in successfully",
    user: {
      id: user._id,
      email: user.email,
      username: user.username,
    },
    token,
  });
});

export default login;

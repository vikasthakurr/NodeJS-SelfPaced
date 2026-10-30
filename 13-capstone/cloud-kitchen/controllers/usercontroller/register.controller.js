import User from "../../models/user.model.js";
import bcrypt from "bcryptjs";
import asyncHandler from "../../utils/asyncHandler.util.js";
import ApiError from "../../utils/ApiError.util.js";

const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    throw new ApiError(400, "all fields are required");

  const existingUser = await User.findOne({ email });

  if (existingUser) throw new ApiError(409, "user already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    email,
    password: hashedPassword,
  });
  await user.save();

  return res.status(201).json({
    success: true,
    message: "user created successfully",
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
    },
  });
});
export default register;

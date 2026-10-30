import User from "../../models/user.model.js";
import asyncHandler from "../../utils/asyncHandler.util.js";
import ApiError from "../../utils/ApiError.util.js";
import uploadImage from "../../utils/uploadImage.util.js";
import deleteImage from "../../utils/deleteImage.util.js";

const updateProfile = asyncHandler(async (req, res) => {
  const { username, email } = req.body;

  const user = await User.findById(req.user.id);
  if (!user) throw new ApiError(404, "User not found");

  // Check if username is already taken by another user
  if (username && username !== user.username) {
    const existingUser = await User.findOne({ username });
    if (existingUser) throw new ApiError(409, "Username already taken");
    user.username = username;
  }

  // Check if email is already taken by another user
  if (email && email !== user.email) {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new ApiError(409, "Email already in use");
    user.email = email;
  }

  // Handle avatar upload
  if (req.file) {
    // Delete old avatar from cloudinary if it exists
    if (user.avatar && user.avatar.public_id) {
      await deleteImage(user.avatar.public_id);
    }

    const uploaded = await uploadImage(req.file.buffer, "avatars");
    user.avatar = {
      public_id: uploaded.public_id,
      url: uploaded.url,
    };
  }

  await user.save();

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
    },
  });
});

export default updateProfile;

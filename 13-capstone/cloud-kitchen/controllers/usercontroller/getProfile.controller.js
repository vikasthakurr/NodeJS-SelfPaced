import User from "../../models/user.model.js";
import asyncHandler from "../../utils/asyncHandler.util.js";
import ApiError from "../../utils/ApiError.util.js";


const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select(
    "-password -refreshToken",
  );

  if (!user) throw new ApiError(404, "User not found");
  res.status(200).json({
    success: true,
    user,
  });
});
export default getProfile;

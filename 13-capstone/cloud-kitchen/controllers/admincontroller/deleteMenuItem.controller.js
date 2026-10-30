import Menu from "../../models/menu.model.js";
import asyncHandler from "../../utils/asyncHandler.util.js";
import ApiError from "../../utils/ApiError.util.js";
import deleteImage from "../../utils/deleteImage.util.js";

const deleteMenuItem = asyncHandler(async (req, res) => {
  const { menuItemId, kitchenId } = req.params;

  const menuItem = await Menu.findOne({ _id: menuItemId, kitchen: kitchenId });

  if (!menuItem) {
    throw new ApiError(404, "Menu item not found in this kitchen");
  }

  // Delete image from cloudinary if exists
  if (menuItem.image && menuItem.image.public_id) {
    await deleteImage(menuItem.image.public_id);
  }

  await Menu.findByIdAndDelete(menuItemId);

  return res.status(200).json({
    success: true,
    message: "Menu item deleted successfully",
  });
});

export default deleteMenuItem;

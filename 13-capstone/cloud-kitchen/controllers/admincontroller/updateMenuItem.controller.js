import Menu from "../../models/menu.model.js";
import asyncHandler from "../../utils/asyncHandler.util.js";
import ApiError from "../../utils/ApiError.util.js";
import uploadImage from "../../utils/uploadImage.util.js";
import deleteImage from "../../utils/deleteImage.util.js";

const updateMenuItem = asyncHandler(async (req, res) => {
  const { menuItemId, kitchenId } = req.params;
  const { name, description, price, category, foodType, isAvailable } =
    req.body;

  const menuItem = await Menu.findOne({ _id: menuItemId, kitchen: kitchenId });

  if (!menuItem) {
    throw new ApiError(404, "Menu item not found in this kitchen");
  }

  // Update fields if provided
  if (name) menuItem.name = name;
  if (description !== undefined) menuItem.description = description;
  if (price) menuItem.price = price;
  if (category) menuItem.category = category;
  if (foodType) menuItem.foodType = foodType;
  if (isAvailable !== undefined) menuItem.isAvailable = isAvailable;

  // Handle image update
  if (req.file) {
    // Delete old image if exists
    if (menuItem.image && menuItem.image.public_id) {
      await deleteImage(menuItem.image.public_id);
    }
    const imageResult = await uploadImage(req.file.buffer, "menu-items");
    menuItem.image = imageResult;
  }

  await menuItem.save();

  return res.status(200).json({
    success: true,
    message: "Menu item updated successfully",
    data: menuItem,
  });
});

export default updateMenuItem;

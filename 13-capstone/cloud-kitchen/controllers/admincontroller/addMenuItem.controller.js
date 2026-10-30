import Menu from "../../models/menu.model.js";
import asyncHandler from "../../utils/asyncHandler.util.js";
import uploadImage from "../../utils/uploadImage.util.js";

const addMenuItem = asyncHandler(async (req, res) => {
  const { name, description, price, category, foodType } = req.body;

  const kitchenId = req.params.kitchenId || req.body.kitchenId;
  const menuData = {
    name,
    description,
    price,
    category,
    foodType,
    kitchen: kitchenId,
  };
  if (req.file) {
    const imageResult = await uploadImage(req.file.buffer, "menu-items");
    menuData.image = imageResult;
  }
  const menu = new Menu(menuData);
  await menu.save();

  return res.status(201).json({
    success: true,
    message: "Menu item added successfully",
    data: menu,
  });
});

export default addMenuItem;
import Kitchen from "../../models/kitchen.model.js";
import asyncHandler from "../../utils/asyncHandler.util.js";
import ApiError from "../../utils/ApiError.util.js";
import uploadImage from "../../utils/uploadImage.util.js";

const createKitchen = asyncHandler(async (req, res) => {
  const { name, description, cuisine, address, deliveryTime, deliveryCharge } =
    req.body;

  if (!name || !address) {
    throw new ApiError(400, "Kitchen name and address are required");
  }

  if (!address.street || !address.city || !address.state || !address.pincode) {
    throw new ApiError(400, "Complete address is required");
  }

  const kitchenData = {
    name,
    description,
    cuisine: cuisine ? (Array.isArray(cuisine) ? cuisine : [cuisine]) : [],
    address,
    owner: req.user.id,
    deliveryTime: deliveryTime || 30,
    deliveryCharge: deliveryCharge || 0,
  };

  if (req.file) {
    const imageResult = await uploadImage(req.file.buffer, "kitchens");
    kitchenData.image = imageResult;
  }

  const kitchen = new Kitchen(kitchenData);
  await kitchen.save();

  return res.status(201).json({
    success: true,
    message: "Kitchen created successfully",
    data: kitchen,
  });
});

export default createKitchen;

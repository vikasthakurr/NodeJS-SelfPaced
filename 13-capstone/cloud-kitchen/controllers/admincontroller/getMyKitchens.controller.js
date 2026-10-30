import Kitchen from "../../models/kitchen.model.js";
import asyncHandler from "../../utils/asyncHandler.util.js";

const getMyKitchens = asyncHandler(async (req, res) => {
  const kitchens = await Kitchen.find({ owner: req.user.id }).sort({
    createdAt: -1,
  });

  return res.status(200).json({
    success: true,
    count: kitchens.length,
    data: kitchens,
  });
});

export default getMyKitchens;

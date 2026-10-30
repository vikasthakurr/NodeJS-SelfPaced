import Order from "../../models/order.model.js";
import asyncHandler from "../../utils/asyncHandler.util.js";
import ApiError from "../../utils/ApiError.util.js";

const getOrderById = asyncHandler(async (req, res) => {
  const { orderId } = req.params;

  const order = await Order.findOne({ _id: orderId, user: req.user.id })
    .populate("kitchen", "name image address deliveryTime")
    .populate("items.menuItem", "name image price");

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  return res.status(200).json({
    success: true,
    data: order,
  });
});

export default getOrderById;

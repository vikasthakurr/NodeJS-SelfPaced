import Order from "../../models/order.model.js";
import asyncHandler from "../../utils/asyncHandler.util.js";
import ApiError from "../../utils/ApiError.util.js";

const cancelOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { cancelReason } = req.body;

  const order = await Order.findOne({ _id: orderId, user: req.user.id });

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  // Only allow cancellation for orders that are placed or confirmed
  const cancellableStatuses = ["placed", "confirmed"];
  if (!cancellableStatuses.includes(order.orderStatus)) {
    throw new ApiError(
      400,
      `Cannot cancel order. Order is already ${order.orderStatus}`,
    );
  }

  order.orderStatus = "cancelled";
  order.cancelReason = cancelReason || "";

  // If payment was already made, mark for refund
  if (order.paymentStatus === "paid") {
    order.paymentStatus = "refunded";
  }

  await order.save();

  return res.status(200).json({
    success: true,
    message: "Order cancelled successfully",
    data: order,
  });
});

export default cancelOrder;

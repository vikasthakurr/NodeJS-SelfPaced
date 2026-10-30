import Order from "../../models/order.model.js";
import asyncHandler from "../../utils/asyncHandler.util.js";
import ApiError from "../../utils/ApiError.util.js";

const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderId, kitchenId } = req.params;
  const { orderStatus } = req.body;

  const validStatuses = [
    "placed",
    "confirmed",
    "preparing",
    "out_for_delivery",
    "delivered",
    "cancelled",
  ];

  if (!orderStatus || !validStatuses.includes(orderStatus)) {
    throw new ApiError(
      400,
      `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
    );
  }

  const order = await Order.findOne({ _id: orderId, kitchen: kitchenId });

  if (!order) {
    throw new ApiError(404, "Order not found in this kitchen");
  }

  // Prevent updating already delivered or cancelled orders
  if (order.orderStatus === "delivered" || order.orderStatus === "cancelled") {
    throw new ApiError(
      400,
      `Cannot update status. Order is already ${order.orderStatus}`,
    );
  }

  order.orderStatus = orderStatus;

  // Set deliveredAt timestamp when order is delivered
  if (orderStatus === "delivered") {
    order.deliveredAt = new Date();
  }

  // If cancelled by admin, mark payment as refunded for online payments
  if (orderStatus === "cancelled" && order.paymentStatus === "paid") {
    order.paymentStatus = "refunded";
  }

  await order.save();

  return res.status(200).json({
    success: true,
    message: `Order status updated to ${orderStatus}`,
    data: order,
  });
});

export default updateOrderStatus;

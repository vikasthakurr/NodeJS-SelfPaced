import Order from "../../models/order.model.js";
import asyncHandler from "../../utils/asyncHandler.util.js";

const getKitchenOrders = asyncHandler(async (req, res) => {
  const { kitchenId } = req.params;
  const { status, page = 1, limit = 10 } = req.query;

  const filter = { kitchen: kitchenId };

  // Filter by order status if provided
  if (status) {
    filter.orderStatus = status;
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);

  const orders = await Order.find(filter)
    .populate("user", "username email")
    .populate("items.menuItem", "name price")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));

  const totalOrders = await Order.countDocuments(filter);

  return res.status(200).json({
    success: true,
    count: orders.length,
    totalOrders,
    totalPages: Math.ceil(totalOrders / parseInt(limit)),
    currentPage: parseInt(page),
    data: orders,
  });
});

export default getKitchenOrders;

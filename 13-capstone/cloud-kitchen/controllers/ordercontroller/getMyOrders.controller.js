import Order from "../../models/order.model.js";
import asyncHandler from "../../utils/asyncHandler.util.js";

const getMyOrders = asyncHandler(async (req, res) => {
  const { status, page = 1, limit = 10 } = req.query;

  const filter = { user: req.user.id };

  if (status) {
    filter.orderStatus = status;
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);

  const orders = await Order.find(filter)
    .populate("kitchen", "name image address")
    .populate("items.menuItem", "name image")
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

export default getMyOrders;

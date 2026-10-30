import Kitchen from "../../models/kitchen.model.js";
import Menu from "../../models/menu.model.js";
import Order from "../../models/order.model.js";
import asyncHandler from "../../utils/asyncHandler.util.js";
import ApiError from "../../utils/ApiError.util.js";

const placeOrder = asyncHandler(async (req, res) => {
  const { kitchenId, items, deliveryAddress, paymentMethod } = req.body;

  const kitchen = await Kitchen.findById(kitchenId);

  if (!kitchen) {
    throw new ApiError(404, "Kitchen not found");
  }
  if (!kitchen.isOpen) {
    throw new ApiError(400, "Kitchen is closed");
  }
  let subtotal = 0;
  const orderItems = [];

  for (const item of items) {
    const menuitem = await Menu.findById(item.id);
    if (!menuitem) {
      throw new ApiError(404, `Menu item not found`);
    }
    const itemTotal = menuitem.price * item.quantity;
    subtotal += itemTotal;

    orderItems.push({
      menuItem: menuitem._id,
      name: menuitem.name,
      quantity: item.quantity,
      price: menuitem.price,
    });
  }

  const totalAmount = subtotal + kitchen.deliveryCharge;

  const order = new Order({
    user: req.user.id,
    kitchen: kitchen._id,
    items: orderItems,
    deliveryAddress,
    subtotal,
    deliveryCharge: kitchen.deliveryCharge,
    totalAmount,
    paymentMethod: paymentMethod || "cod",
  });
  await order.save();

  return res.status(201).json({
    success: true,
    message: "Order placed successfully",
    data: order,
  });
});
export default placeOrder;

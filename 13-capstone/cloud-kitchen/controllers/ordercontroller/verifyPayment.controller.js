import Order from "../../models/order.model.js";
import asyncHandler from "../../utils/asyncHandler.util.js";
import ApiError from "../../utils/ApiError.util.js";
import { verifyPaymentSignature } from "../../services/payment.service.js";

const verifyPayment = asyncHandler(async (req, res) => {
  const { razorpayOrderId, razorpayPaymentId, razorpaySignature, orderId } =
    req.body;

  if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature || !orderId) {
    throw new ApiError(400, "All payment details are required");
  }

  const order = await Order.findOne({ _id: orderId, user: req.user.id });

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  if (order.paymentStatus === "paid") {
    throw new ApiError(400, "Payment already verified for this order");
  }

  // Verify signature with Razorpay
  const isValid = verifyPaymentSignature(
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature,
  );

  if (!isValid) {
    order.paymentStatus = "failed";
    await order.save();
    throw new ApiError(400, "Payment verification failed. Invalid signature");
  }

  // Update order payment status
  order.paymentStatus = "paid";
  order.orderStatus = "confirmed";
  await order.save();

  return res.status(200).json({
    success: true,
    message: "Payment verified successfully",
    data: {
      orderId: order._id,
      paymentStatus: order.paymentStatus,
      orderStatus: order.orderStatus,
    },
  });
});

export default verifyPayment;

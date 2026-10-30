import sendEmail from "../utils/sendEmail.util.js";

/**
 * Send order confirmation email to user
 */
const sendOrderConfirmation = async (userEmail, order) => {
  const subject = `Order Confirmed - #${order._id.toString().slice(-8).toUpperCase()}`;
  const html = `
    <h2>Your order has been placed!</h2>
    <p>Order ID: <strong>${order._id}</strong></p>
    <p>Total Amount: <strong>₹${order.totalAmount}</strong></p>
    <p>Payment Method: <strong>${order.paymentMethod.toUpperCase()}</strong></p>
    <p>Status: <strong>${order.orderStatus}</strong></p>
    <br/>
    <p>Thank you for ordering with Cloud Kitchen!</p>
  `;

  return sendEmail(userEmail, subject, html);
};

/**
 * Send order status update email to user
 */
const sendOrderStatusUpdate = async (userEmail, order) => {
  const subject = `Order Update - #${order._id.toString().slice(-8).toUpperCase()}`;
  const html = `
    <h2>Your order status has been updated</h2>
    <p>Order ID: <strong>${order._id}</strong></p>
    <p>New Status: <strong>${order.orderStatus.replace(/_/g, " ").toUpperCase()}</strong></p>
    ${order.orderStatus === "delivered" ? "<p>🎉 Your food has been delivered. Enjoy!</p>" : ""}
    ${order.orderStatus === "cancelled" ? `<p>Reason: ${order.cancelReason || "N/A"}</p>` : ""}
    <br/>
    <p>Cloud Kitchen</p>
  `;

  return sendEmail(userEmail, subject, html);
};

export { sendOrderConfirmation, sendOrderStatusUpdate };
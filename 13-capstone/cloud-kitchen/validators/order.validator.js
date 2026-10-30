const validateOrder = (req, res, next) => {
  const { kitchenId, items, deliveryAddress, paymentMethod } = req.body;

  const errors = [];

  if (!kitchenId) {
    errors.push({ message: "kitchenId is required" });
  }
  if (!items || !Array.isArray(items) || !items.length === 0) {
    errors.push({ message: "items is required" });
  } else {
    items.map((item) => {
      if (!item.id) {
        errors.push({ message: "item id is required" });
      }
      if (!item.quantity) {
        errors.push({ message: "item quantity is required" });
      }
    });
  }
  if (!deliveryAddress) {
    errors.push({ message: "delivery address is required" });
  } else {
    const { street, city, state, pincode, phone } = deliveryAddress;
    if (!street || !city || !state || !pincode || !phone) {
      errors.push({ message: "all fields in delivery address are required" });
    }
  }

  const validPaymenMethods = ["cod", "online", "upi"];

  if (!validPaymenMethods.includes(paymentMethod)) {
    errors.push({ message: "payment method is not valid" });
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  next();
};

export default validateOrder;

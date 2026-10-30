import Kitchen from "../models/kitchen.model.js";

const isKitchenOwner = async (req, res, next) => {
  try {
    const kitchenId = req.params.kitchenId || req.body.kitchenId;

    if (!kitchenId) {
      return res.status(400).json({ message: "Kitchen ID is required" });
    }

    const kitchen = await Kitchen.findById(kitchenId);

    if (!kitchen) {
      return res.status(404).json({ message: "Kitchen not found" });
    }

    if (kitchen.owner.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Access denied. You don't own this kitchen" });
    }

    req.kitchen = kitchen;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default isKitchenOwner;

import express from "express";
import { cache } from "../middleware/cache.middle.js";
import Menu from "../models/menu.model.js";

const menuRoute = express.Router();

// Get menu items for a kitchen (public, cached for 1 minute)
menuRoute.get("/kitchen/:kitchenId", cache(60), async (req, res) => {
  try {
    const { category, foodType, search } = req.query;

    const filter = { kitchen: req.params.kitchenId, isAvailable: true };

    if (category) filter.category = category;
    if (foodType) filter.foodType = foodType;
    if (search) filter.name = { $regex: search, $options: "i" };

    const menuItems = await Menu.find(filter).sort({ totalOrders: -1 });

    res.status(200).json({ menuItems });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single menu item (public, cached for 1 minute)
menuRoute.get("/:menuItemId", cache(60), async (req, res) => {
  try {
    const menuItem = await Menu.findById(req.params.menuItemId).populate(
      "kitchen",
      "name image rating",
    );

    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    res.status(200).json({ menuItem });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default menuRoute;
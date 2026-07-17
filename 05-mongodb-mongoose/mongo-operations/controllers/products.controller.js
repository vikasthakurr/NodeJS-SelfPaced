import express from "express";
import Product from "../model/product.model.js";
const productRoute = express.Router();
productRoute.get("/products", async (req, res) => {
  try {
    const category = req.query.category;
    const page = req.query.page || 1;
    const limit = req.query.limit || 4;

    const filter = {};
    if (category) filter.category = { $regex: category, $options: "i" };
    const products = await Product.find(filter)
      .sort({ price: 1 })
      .limit(limit)
      .skip((page - 1) * limit);

    res.json({
      products,
      currentPage: page,
      totalPages: Math.ceil((await Product.countDocuments(filter)) / limit),
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
export default productRoute;

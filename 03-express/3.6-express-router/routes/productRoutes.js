import express from "express";

const router = express.Router();

router.get("/products", (req, res) => {
  res.end("all products");
});
router.post("/newproduct", (req, res) => {
  res.end("new products added");
});

export default router;

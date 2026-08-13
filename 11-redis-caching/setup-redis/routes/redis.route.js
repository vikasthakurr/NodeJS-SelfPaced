import express from "express";
import redis from "../config/redis.js";

const router = express.Router();

router.post("/set", async (req, res) => {
  try {
    const { key, value } = req.body;

    await redis.set(key, value);

    res.json({
      message: "Data stored successfully",
      key,
      value,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/get/:key", async (req, res) => {
  try {
    const { key } = req.params;

    const value = await redis.get(key);

    if (value === null) {
      return res.status(404).json({
        message: "Key not found",
      });
    }

    res.json({
      key,
      value,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;

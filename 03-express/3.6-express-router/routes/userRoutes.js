import express from "express";

const router = express.router();

router.use((req, res, next) => {
  console.log("user route got a hit");
});
router.get("/users", (req, res) => {
  res.status(200).json({ message: "user found" });
});

router.post("/users", (req, res) => {
  res.end("welcome to home page");
});

export default router;

import "dotenv/config";
import express from "express";
import redisRoutes from "./routes/redis.route.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON request bodies
app.use(express.json());

// Routes
app.use("/api/redis", redisRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Redis caching server is running" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

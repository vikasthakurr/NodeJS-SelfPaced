import express from "express"
import { createClient } from "redis";

const app = express();

const redisClient = createClient();

redisClient.on("error", (err) => {
  console.log("Redis Error:", err);
});

async function startServer() {
  await redisClient.connect();

  app.get("/users", async (req, res) => {
    // 1. Check cache first
    const cachedUsers = await redisClient.get("users");

    if (cachedUsers) {
      console.log("Data coming from Redis Cache");

      return res.json({
        source: "Redis Cache",
        data: JSON.parse(cachedUsers),
      });
    }

    // 2. Simulate database/API call
    console.log("Data coming from Database");

    const users = [
      { id: 1, name: "Vikas" },
      { id: 2, name: "John" },
      { id: 3, name: "Alice" },
    ];


    await redisClient.set("users", JSON.stringify(users), {
      EX: 60,
    });

    res.json({
      source: "Database",
      data: users,
    });
  });

  app.listen(3000,()=>{

    console.log("Server is running on port 3000");

  })

  
}

startServer();
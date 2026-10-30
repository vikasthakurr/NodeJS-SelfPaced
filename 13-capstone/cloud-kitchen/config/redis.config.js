let redisClient = null;

export async function connectRedis() {
  if (!process.env.REDIS_URL) {
    console.log("Redis URL not configured, caching disabled");
    return;
  }

  try {
    const redis = await import("redis");
    redisClient = redis.createClient({ url: process.env.REDIS_URL });

    redisClient.on("connect", () => {
      console.log("Redis connected...");
    });

    redisClient.on("error", (err) => {
      console.error("Redis error:", err.message);
    });

    await redisClient.connect();
  } catch (err) {
    console.error("Failed to connect to Redis:", err.message);
    redisClient = null;
  }
}

export function getRedisClient() {
  return redisClient;
}

export default redisClient;

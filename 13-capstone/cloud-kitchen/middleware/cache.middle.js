import { getRedisClient } from "../config/redis.config.js";

/**
 * Cache middleware - checks Redis for cached response
 * Falls through to next() if Redis is not available
 * @param {number} duration - Cache TTL in seconds (default: 60)
 */
const cache = (duration = 60) => {
  return async (req, res, next) => {
    const client = getRedisClient();
    if (!client || req.method !== "GET") return next();

    const key = `cache:${req.originalUrl}`;

    try {
      const cachedData = await client.get(key);

      if (cachedData) {
        return res.status(200).json(JSON.parse(cachedData));
      }

      const originalJson = res.json.bind(res);
      res.json = (body) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          client.setEx(key, duration, JSON.stringify(body)).catch(() => {});
        }
        return originalJson(body);
      };

      next();
    } catch (err) {
      next();
    }
  };
};

/**
 * Invalidate cache by pattern
 * @param {string} pattern - Key pattern to delete
 */
const invalidateCache = async (pattern) => {
  const client = getRedisClient();
  if (!client) return;

  try {
    const keys = await client.keys(pattern);
    if (keys.length > 0) {
      await client.del(keys);
    }
  } catch (err) {
    console.error("Cache invalidation error:", err.message);
  }
};

export { cache, invalidateCache };

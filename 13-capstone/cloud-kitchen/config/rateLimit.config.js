import { rateLimit } from "express-rate-limit";

const loginLimitter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many login attempts, please try again after 15 minutes",
});

export default loginLimitter;

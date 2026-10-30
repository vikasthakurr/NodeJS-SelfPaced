import express from "express";
import loginLimitter from "../config/rateLimit.config.js";
import getProfile from "../controllers/usercontroller/getProfile.controller.js";
import login from "../controllers/usercontroller/login.controller.js";
import register from "../controllers/usercontroller/register.controller.js";
import updateProfile from "../controllers/usercontroller/updateProfile.controller.js";
import verificationToken from "../middleware/verifyToken.middle.js";
import {
  validateLogin,
  validateRegister,
} from "../validators/auth.validator.js";

const authRoute = express.Router();

authRoute.post("/register", validateRegister, register);
authRoute.post("/login", loginLimitter, validateLogin, login);

// Protected routes
authRoute.get("/profile", verificationToken, getProfile);
authRoute.put("/update", verificationToken, updateProfile);

export default authRoute;
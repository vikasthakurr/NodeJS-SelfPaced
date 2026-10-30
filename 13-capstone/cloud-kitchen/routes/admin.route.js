import express from "express";
import upload from "../config/multer.config.js";
import addMenuItem from "../controllers/admincontroller/addMenuItem.controller.js";
import createKitchen from "../controllers/admincontroller/createKitchen.controller.js";
import deleteMenuItem from "../controllers/admincontroller/deleteMenuItem.controller.js";
import getKitchenOrders from "../controllers/admincontroller/getKitchenOrders.controller.js";
import getMyKitchens from "../controllers/admincontroller/getMyKitchens.controller.js";
import updateMenuItem from "../controllers/admincontroller/updateMenuItem.controller.js";
import updateOrderStatus from "../controllers/admincontroller/updateOrderStatus.controller.js";
import isAdmin from "../middleware/isAdmin.middle.js";
import isKitchenOwner from "../middleware/isKitchenOwner.middle.js";
import verificationToken from "../middleware/verifyToken.middle.js";
import validateMenuItem  from "../validators/menu.validator.js";

const adminRoute = express.Router();

// All admin routes require auth + admin role
adminRoute.use(verificationToken, isAdmin);

// Kitchen
adminRoute.get("/my-kitchens", getMyKitchens);
adminRoute.post("/kitchen", upload.single("image"), createKitchen);

// Menu CRUD
adminRoute.post(
  "/kitchen/:kitchenId/menu",
  isKitchenOwner,
  upload.single("image"),
  validateMenuItem,
  addMenuItem,
);
adminRoute.put(
  "/kitchen/:kitchenId/menu/:menuItemId",
  isKitchenOwner,
  upload.single("image"),
  updateMenuItem,
);
adminRoute.delete(
  "/kitchen/:kitchenId/menu/:menuItemId",
  isKitchenOwner,
  deleteMenuItem,
);

// Orders
adminRoute.get("/kitchen/:kitchenId/orders", isKitchenOwner, getKitchenOrders);
adminRoute.patch(
  "/kitchen/:kitchenId/orders/:orderId/status",
  isKitchenOwner,
  updateOrderStatus,
);

export default adminRoute;
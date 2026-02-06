import express from "express";
import protect from "../middlewares/auth.middleware.js";
import isAdmin from "../middlewares/admin.middleware.js";

import {
  getDashboardStats,
  getAllUsers,
  blockUser,
  getAllProviders,
  verifyProvider,
  getAllBookings,
  // refundPayment,
} from "../controllers/admin.controller.js";

const adminRoutes = express.Router();

adminRoutes.use(protect, isAdmin);

adminRoutes.get("/dashboard", getDashboardStats);
adminRoutes.get("/users", getAllUsers);
adminRoutes.post("/users/block/:id", blockUser);

adminRoutes.get("/providers", getAllProviders);
adminRoutes.post("/providers/verify/:id", verifyProvider);

adminRoutes.get("/bookings", getAllBookings);
// adminRoutes.post("/refund/:id", refundPayment);

export default adminRoutes;

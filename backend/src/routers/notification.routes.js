import express from "express";
import protect from "../middlewares/auth.middleware.js";

import {
  getMyNotifications,
  markAsRead,
} from "../controllers/notification.controller.js";

const notificationRoutes = express.Router();

notificationRoutes.get("/", protect, getMyNotifications);
notificationRoutes.put("/:id/read", protect, markAsRead);

export default notificationRoutes;

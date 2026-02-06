import express from "express";
import protect from "../middlewares/auth.middleware.js";
import { isProvider } from "../middlewares/role.middleware.js";
import { uploadProviderProfileImage } from "../controllers/provider.controller.js";
import upload from "../middlewares/multer.middleware.js";

import {
  getProviderProfile,
  updateProviderProfile,
  updateAvailability,
} from "../controllers/provider.controller.js";

const providerProfileRoutes = express.Router();

providerProfileRoutes.get("/profile", protect, isProvider, getProviderProfile);
providerProfileRoutes.put("/profile", protect, isProvider, updateProviderProfile);
providerProfileRoutes.put(
  "/availability",
  protect,
  isProvider,
  updateAvailability
);


providerProfileRoutes.put(
  "/profile-image",
  protect,
  isProvider,
  upload.single("image"),
  uploadProviderProfileImage
);


export default providerProfileRoutes;

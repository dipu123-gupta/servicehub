import express from "express";
import protect from "../middlewares/auth.middleware.js";
import { isUser } from "../middlewares/role.middleware.js";

import {
  addReview,
  getProviderReviews,
} from "../controllers/review.controller.js";

const reviewRoutes = express.Router();

reviewRoutes.post("/", protect, isUser, addReview);
reviewRoutes.get("/provider/:providerId", getProviderReviews);

export default reviewRoutes;

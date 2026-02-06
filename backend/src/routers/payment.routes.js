import express from "express";
import protect from "../middlewares/auth.middleware.js";
import { isUser } from "../middlewares/role.middleware.js";
import {
  createOrder,
  razorpayWebhook,
} from "../controllers/payment.controller.js";
import { paymentLimiter } from "../middlewares/rateLimit.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import { createOrderSchema } from "../validations/payment.validation.js";

const paymentRoutes = express.Router();

paymentRoutes.post("/create-order",paymentLimiter, protect, isUser,validate(createOrderSchema), createOrder);

// ⚠️ Webhook needs raw body
paymentRoutes.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  razorpayWebhook
);

export default paymentRoutes;

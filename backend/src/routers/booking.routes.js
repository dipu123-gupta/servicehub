import express from "express";
import protect from "../middlewares/auth.middleware.js";
import { isProvider, isUser } from "../middlewares/role.middleware.js";

import {
  getAvailableJobs,
  acceptJob,
  verifyOtp,
  startWork,
  completeJob,
} from "../controllers/providerBooking.controller.js";

import validate from "../middlewares/validate.middleware.js"; // ✅ ADD THIS
import validateParams from "../middlewares/validateParams.middleware.js";
import {
  bookingIdParamSchema,
  verifyOtpSchema,
} from "../validations/provider.validation.js";
import { getBookingById } from "../controllers/booking.controller.js";

const providerBookingRoutes = express.Router();

providerBookingRoutes.get(
  "/jobs",
  protect,
  isProvider,
  getAvailableJobs
);

providerBookingRoutes.post(
  "/accept/:id",
  protect,
  isProvider,
  validateParams(bookingIdParamSchema),
  acceptJob
);

providerBookingRoutes.post(
  "/verify-otp/:id",
  protect,
  isProvider,
  validateParams(bookingIdParamSchema),
  validate(verifyOtpSchema),
  verifyOtp
);

providerBookingRoutes.post(
  "/start/:id",
  protect,
  isProvider,
  validateParams(bookingIdParamSchema),
  startWork
);

providerBookingRoutes.post(
  "/complete/:id",
  protect,
  isProvider,
  validateParams(bookingIdParamSchema),
  completeJob
);


providerBookingRoutes.get(
  "/:id",
  protect,
  isUser,
  validateParams(bookingIdParamSchema),
  getBookingById
);


export default providerBookingRoutes;

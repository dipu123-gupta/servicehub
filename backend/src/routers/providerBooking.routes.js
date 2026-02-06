import express from "express";
import protect from "../middlewares/auth.middleware.js";
import { isProvider } from "../middlewares/role.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import validateParams from "../middlewares/validateParams.middleware.js";

import {
  getAvailableJobs,
  acceptJob,
  verifyOtp,
  startWork,
  completeJob,
  rejectJob,
  getJobHistory,
} from "../controllers/providerBooking.controller.js";

import {
  bookingIdParamSchema,
  verifyOtpSchema,
} from "../validations/provider.validation.js";

const router = express.Router();

router.get("/jobs", protect, isProvider, getAvailableJobs);

router.post(
  "/accept/:id",
  protect,
  isProvider,
  validateParams(bookingIdParamSchema),
  acceptJob
);

router.post(
  "/verify-otp/:id",
  protect,
  isProvider,
  validateParams(bookingIdParamSchema),
  validate(verifyOtpSchema),
  verifyOtp
);

router.post(
  "/start/:id",
  protect,
  isProvider,
  validateParams(bookingIdParamSchema),
  startWork
);

router.post(
  "/complete/:id",
  protect,
  isProvider,
  validateParams(bookingIdParamSchema),
  completeJob
);

router.post(
  "/reject/:id",
  protect,
  isProvider,
  validateParams(bookingIdParamSchema),
  rejectJob
);

router.get("/history", protect, isProvider, getJobHistory);

export default router;

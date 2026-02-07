// import express from "express";
// import protect from "../middlewares/auth.middleware.js";
// import { isProvider, isUser } from "../middlewares/role.middleware.js";

// import {
//   getAvailableJobs,
//   acceptJob,
//   verifyOtp,
//   startWork,
//   completeJob,
// } from "../controllers/providerBooking.controller.js";

// import validate from "../middlewares/validate.middleware.js"; // ✅ ADD THIS
// import validateParams from "../middlewares/validateParams.middleware.js";
// import {
//   bookingIdParamSchema,
//   verifyOtpSchema,
// } from "../validations/provider.validation.js";
// import { getBookingById } from "../controllers/booking.controller.js";

// const providerBookingRoutes = express.Router();

// providerBookingRoutes.get(
//   "/jobs",
//   protect,
//   isProvider,
//   getAvailableJobs
// );

// providerBookingRoutes.post(
//   "/accept/:id",
//   protect,
//   isProvider,
//   validateParams(bookingIdParamSchema),
//   acceptJob
// );

// providerBookingRoutes.post(
//   "/verify-otp/:id",
//   protect,
//   isProvider,
//   validateParams(bookingIdParamSchema),
//   validate(verifyOtpSchema),
//   verifyOtp
// );

// providerBookingRoutes.post(
//   "/start/:id",
//   protect,
//   isProvider,
//   validateParams(bookingIdParamSchema),
//   startWork
// );

// providerBookingRoutes.post(
//   "/complete/:id",
//   protect,
//   isProvider,
//   validateParams(bookingIdParamSchema),
//   completeJob
// );


// providerBookingRoutes.get(
//   "/:id",
//   protect,
//   isUser,
//   validateParams(bookingIdParamSchema),
//   getBookingById
// );


// export default providerBookingRoutes;



import express from "express";
import protect from "../middlewares/auth.middleware.js";
import { isUser } from "../middlewares/role.middleware.js";
import validateParams from "../middlewares/validateParams.middleware.js";
// import { bookingIdParamSchema } from "../validations/provider.validation.js";
import upload from "../middlewares/multer.middleware.js"; // ✅ FIX
import { bookingIdParamSchema } from "../validations/booking.validation.js";


import {
  getUserBookings,
  getBookingById,
  cancelBooking,
  uploadBookingMedia,
} from "../controllers/booking.controller.js";

const bookingRoutes = express.Router();

bookingRoutes.get("/my", protect, isUser, getUserBookings);

bookingRoutes.get(
  "/:id",
  protect,
  isUser,
  validateParams(bookingIdParamSchema),
  getBookingById
);

bookingRoutes.patch(
  "/:id/cancel",
  protect,
  isUser,
  validateParams(bookingIdParamSchema),
  cancelBooking
);

bookingRoutes.post(
  "/:id/media",
  protect,
  isUser,
  validateParams(bookingIdParamSchema),
  upload.single("media"),
  uploadBookingMedia
);

export default bookingRoutes;

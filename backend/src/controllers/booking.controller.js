import Booking from "../models/booking.model.js";
import Service from "../models/service.model.js";
import AppError from "../utils/AppError.js";
import crypto from "crypto";
import mongoose from "mongoose";
import assignProvider from "../utils/assignProvider.js";
import Notification from "../models/notification.model.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import sendEmail from "../config/sendEmail.js";
import Provider from "../models/provider.model.js";

/* ================= CREATE BOOKING ================= */
export const createBooking = async (req, res, next) => {
  try {
    const { serviceId, address, schedule, problemDescription, location } =
      req.body;

    if (!serviceId || !address || !schedule || !location) {
      return next(new AppError("All fields are required", 400));
    }

    if (!mongoose.Types.ObjectId.isValid(serviceId)) {
      return next(new AppError("Invalid service ID", 400));
    }

    const service = await Service.findById(serviceId);
    if (!service) {
      return next(new AppError("Service not found", 404));
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpiresAt = Date.now() + 5 * 60 * 1000; // 5 min

    const booking = await Booking.create({
      userId: req.user.id,
      serviceId,
      address,
      schedule,
      problemDescription,
      otp,
      otpExpiresAt,
      location,
    });

    await booking.populate("serviceId");

    const provider = await assignProvider(booking);

    if (provider) {
      await Notification.create({
        userId: provider._id,
        userModel: "Provider",
        title: "New Booking Assigned",
        message: "A new service booking has been assigned to you",
      });
    }

    await sendEmail({
      to: req.user.email,
      subject: "Booking Confirmed",
      html: `
        <h2>Booking Confirmed</h2>
        <p>Your booking for <b>${service.title}</b> has been created.</p>
        <p>Schedule: ${schedule}</p>
      `,
    });

    res.status(201).json({
      success: true,
      booking,
      providerAssigned: !!provider,
    });
  } catch (error) {
    next(error);
  }
};

/* ================= GET USER BOOKINGS ================= */
export const getUserBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id })
      .populate("serviceId")
      .populate("providerId");

    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    next(error);
  }
};

/* ================= CANCEL BOOKING ================= */
export const cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return next(new AppError("Booking not found", 404));
    }

    if (booking.status === "WORK_STARTED") {
      return next(
        new AppError("Work already started, cancellation not allowed", 400),
      );
    }

    if (booking.status === "COMPLETED") {
      return next(new AppError("Completed booking cannot be cancelled", 400));
    }

    booking.status = "CANCELLED";
    booking.cancelReason = req.body.reason || "User cancelled";
    await booking.save();

    if (booking.providerId) {
      await Provider.findByIdAndUpdate(booking.providerId, {
        isAvailable: true,
      });

      await Notification.create({
        userId: booking.providerId,
        userModel: "Provider",
        title: "Booking Cancelled",
        message: "A booking assigned to you has been cancelled",
      });
    }

    res.status(200).json({
      success: true,
      message: "Booking cancelled",
    });
  } catch (error) {
    next(error);
  }
};

/* ================= UPLOAD BOOKING MEDIA ================= */
export const uploadBookingMedia = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(new AppError("File is required", 400));
    }

    const booking = await Booking.findById(req.params.id);

    if (!booking || booking.userId.toString() !== req.user.id) {
      return next(new AppError("Unauthorized", 403));
    }

    const result = await uploadToCloudinary(req.file.buffer, "bookings/media");

    booking.media = booking.media || [];
    booking.media.push(result.secure_url);
    await booking.save();

    res.status(200).json({
      success: true,
      media: booking.media,
    });
  } catch (error) {
    next(error);
  }
};

/* ================= GET BOOKING BY ID ================= */
export const getBookingById = async (req, res, next) => {
  const booking = await Booking.findById(req.params.id)
    .populate("serviceId")
    .populate("providerId");

  if (!booking || booking.userId.toString() !== req.user.id) {
    return next(new AppError("Booking not found", 404));
  }

  res.status(200).json({
    success: true,
    booking,
  });
};

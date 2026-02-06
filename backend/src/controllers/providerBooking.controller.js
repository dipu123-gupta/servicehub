import Booking from "../models/booking.model.js";
import Provider from "../models/provider.model.js";
import AppError from "../utils/AppError.js";
import Notification from "../models/notification.model.js";
import sendEmail from "../config/sendEmail.js"; // ✅ ADDED

/* ================= GET ASSIGNED JOB ================= */
export const getAvailableJobs = async (req, res, next) => {
  try {
    const provider = await Provider.findById(req.user.id);

    if (!provider) {
      return next(new AppError("Provider not found", 404));
    }

    if (!provider.isVerified) {
      return next(new AppError("Provider not verified", 403));
    }

    const jobs = await Booking.find({
      providerId: provider._id,
      status: "PROVIDER_ASSIGNED",
    }).populate("serviceId");

    res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    next(error);
  }
};
/* ================= ACCEPT JOB ================= */
export const acceptJob = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("userId");

    if (!booking) {
      return next(new AppError("Booking not found", 404));
    }

    if (booking.providerId.toString() !== req.user.id) {
      return next(new AppError("Unauthorized", 403));
    }

    booking.status = "ACCEPTED";
    await booking.save();

    await Notification.create({
      userId: booking.userId._id,
      userModel: "User",
      title: "Booking Accepted",
      message: "Your booking has been accepted by the provider",
    });

    /* 📧 EMAIL TO USER (ADDED) */
    await sendEmail({
      to: booking.userId.email,
      subject: "Booking Accepted",
      html: `
        <h2>Booking Accepted</h2>
        <p>Your service provider has accepted your booking.</p>
      `,
    });

    res.status(200).json({
      success: true,
      message: "Job accepted successfully",
    });
  } catch (error) {
    next(error);
  }
};

/* बाकी functions SAME */

/* ================= VERIFY OTP ================= */
export const verifyOtp = async (req, res, next) => {
  try {
    const { otp } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking || booking.providerId.toString() !== req.user.id) {
      return next(new AppError("Unauthorized", 403));
    }

    if (Date.now() > booking.otpExpiresAt) {
      return next(new AppError("OTP expired", 400));
    }

    if (booking.otp !== otp) {
      return next(new AppError("Invalid OTP", 400));
    }

    booking.status = "OTP_VERIFIED";
    await booking.save();

    res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    next(error);
  }
};

/* ================= START WORK ================= */
export const startWork = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking || booking.providerId.toString() !== req.user.id) {
      return next(new AppError("Unauthorized", 403));
    }

    booking.status = "WORK_STARTED";
    await booking.save();

    await Notification.create({
      userId: booking.userId,
      userModel: "User",
      title: "Work Started",
      message: "Service provider has started the work",
    });

    res.status(200).json({
      success: true,
      message: "Work started successfully",
    });
  } catch (error) {
    next(error);
  }
};

/* ================= COMPLETE JOB ================= */
export const completeJob = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking || booking.providerId.toString() !== req.user.id) {
      return next(new AppError("Unauthorized", 403));
    }

    booking.status = "COMPLETED";
    await booking.save();

    await Provider.findByIdAndUpdate(req.user.id, {
      isAvailable: true,
    });

    await Notification.create({
      userId: booking.userId,
      userModel: "User",
      title: "Job Completed",
      message: "Your service has been completed successfully",
    });

    res.status(200).json({
      success: true,
      message: "Job completed successfully",
    });
  } catch (error) {
    next(error);
  }
};
/* ================= REJECT JOB ================= */
export const rejectJob = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return next(new AppError("Booking not found", 404));
    }

    if (booking.providerId.toString() !== req.user.id) {
      return next(new AppError("Unauthorized", 403));
    }

    if (booking.status !== "PROVIDER_ASSIGNED") {
      return next(new AppError("Job cannot be rejected now", 400));
    }

    booking.providerId = null;
    booking.status = "PENDING";
    await booking.save();

    // 🔻 penalty counter (future use)
    await Provider.findByIdAndUpdate(req.user.id, {
      $inc: { jobRejectCount: 1 },
      isAvailable: true,
    });

    res.status(200).json({
      success: true,
      message: "Job rejected successfully",
    });
  } catch (error) {
    next(error);
  }
};

/* ================= PROVIDER JOB HISTORY ================= */
export const getJobHistory = async (req, res, next) => {
  const jobs = await Booking.find({
    providerId: req.user.id,
    status: "COMPLETED",
  }).populate("serviceId userId");

  res.status(200).json({
    success: true,
    jobs,
  });
};



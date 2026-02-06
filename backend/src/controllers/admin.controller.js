import User from "../models/user.model.js";
import Provider from "../models/provider.model.js";
import Booking from "../models/booking.model.js";
import Payment from "../models/payment.model.js";
import AppError from "../utils/AppError.js";

/* ================= DASHBOARD STATS ================= */
export const getDashboardStats = async (req, res, next) => {
  try {
    const users = await User.countDocuments();
    const providers = await Provider.countDocuments();
    const bookings = await Booking.countDocuments();

    const revenueAgg = await Payment.aggregate([
      { $match: { status: "PAID" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    res.status(200).json({
      success: true,
      stats: {
        users,
        providers,
        bookings,
        revenue: revenueAgg[0]?.total || 0,
      },
    });
  } catch (error) {
    next(error);
  }
};

/* ================= GET ALL USERS ================= */
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ success: true, users });
  } catch (error) {
    next(error);
  }
};

/* ================= BLOCK USER ================= */
export const blockUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    user.isBlocked = true;
    await user.save();

    res.status(200).json({
      success: true,
      message: "User blocked successfully",
    });
  } catch (error) {
    next(error);
  }
};

/* ================= GET ALL PROVIDERS ================= */
export const getAllProviders = async (req, res, next) => {
  try {
    const providers = await Provider.find().select("-password");
    res.status(200).json({ success: true, providers });
  } catch (error) {
    next(error);
  }
};

/* ================= VERIFY PROVIDER ================= */
export const verifyProvider = async (req, res, next) => {
  try {
    const provider = await Provider.findById(req.params.id);

    if (!provider) {
      return next(new AppError("Provider not found", 404));
    }

    provider.isVerified = true;
    await provider.save();

    res.status(200).json({
      success: true,
      message: "Provider verified successfully",
    });
  } catch (error) {
    next(error);
  }
};

/* ================= GET ALL BOOKINGS ================= */
export const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find()
      .populate("userId", "name email")
      .populate("providerId", "name phone")
      .populate("serviceId", "title");

    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    next(error);
  }
};

/* ================= REFUND PAYMENT ================= */
// export const refundPayment = async (req, res, next) => {
//   try {
//     const payment = await Payment.findById(req.params.id);

//     if (!payment || payment.status !== "PAID") {
//       return next(new AppError("Invalid payment for refund", 400));
//     }

//     // ⚠️ Real app: Razorpay refund API call
//     payment.status = "FAILED";
//     await payment.save();

//     await Booking.findByIdAndUpdate(payment.bookingId, {
//       paymentStatus: "REFUNDED",
//     });

//     res.status(200).json({
//       success: true,
//       message: "Refund processed successfully",
//     });
//   } catch (error) {
//     next(error);
//   }
// };

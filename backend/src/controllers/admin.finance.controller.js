import Payment from "../models/payment.model.js";
import Wallet from "../models/wallet.model.js";
import Booking from "../models/booking.model.js";
import AppError from "../utils/AppError.js";

/* ================= ALL PAYMENTS ================= */
export const getAllPayments = async (req, res, next) => {
  const payments = await Payment.find()
    .populate("bookingId")
    .populate("providerId");

  res.status(200).json({
    success: true,
    count: payments.length,
    payments,
  });
};

/* ================= COMMISSION REPORT ================= */
export const getCommissionReport = async (req, res, next) => {
  const payments = await Payment.find({ status: "PAID" });

  const totalCommission = payments.reduce(
    (sum, p) => sum + (p.commission || 0),
    0
  );

  res.status(200).json({
    success: true,
    totalCommission,
  });
};

/* ================= REVENUE SUMMARY ================= */
export const getRevenueSummary = async (req, res, next) => {
  const payments = await Payment.find({ status: "PAID" });

  const totalRevenue = payments.reduce(
    (sum, p) => sum + p.amount / 100,
    0
  );

  const totalCommission = payments.reduce(
    (sum, p) => sum + (p.commission || 0),
    0
  );

  res.status(200).json({
    success: true,
    totalRevenue,
    totalCommission,
    netRevenue: totalCommission,
  });
};

/* ================= REFUND PAYMENT ================= */
export const refundPayment = async (req, res, next) => {
  const { paymentId } = req.params;

  const payment = await Payment.findById(paymentId);

  if (!payment || payment.status !== "PAID") {
    return next(new AppError("Refund not possible", 400));
  }

  // 🔴 NOTE: Real world me Razorpay refund API call hota hai
  payment.status = "REFUNDED";
  await payment.save();

  await Booking.findByIdAndUpdate(payment.bookingId, {
    paymentStatus: "REFUNDED",
  });

  res.status(200).json({
    success: true,
    message: "Payment refunded successfully",
  });
};

/* ================= ALL REFUNDS ================= */
export const getAllRefunds = async (req, res, next) => {
  const refunds = await Payment.find({ status: "REFUNDED" });

  res.status(200).json({
    success: true,
    refunds,
  });
};

/* ================= TRANSACTIONS ================= */
export const getTransactions = async (req, res, next) => {
  const transactions = await Payment.find();

  res.status(200).json({
    success: true,
    transactions,
  });
};

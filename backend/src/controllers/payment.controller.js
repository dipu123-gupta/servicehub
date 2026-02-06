import getRazorpayInstance from "../config/razorpay.js";
import Booking from "../models/booking.model.js";
import Payment from "../models/payment.model.js";
import Wallet from "../models/wallet.model.js";
import AppError from "../utils/AppError.js";
import Notification from "../models/notification.model.js"; // ✅ ADDED
import crypto from "crypto";
import sendEmail from "../config/sendEmail.js"; // ✅ ADDED

/* ================= CREATE RAZORPAY ORDER ================= */
export const createOrder = async (req, res, next) => {
  try {
    const { bookingId } = req.body;

    if (!bookingId) {
      return next(new AppError("Booking ID is required", 400));
    }

    const booking = await Booking.findById(bookingId).populate("serviceId");

    if (!booking) {
      return next(new AppError("Booking not found", 404));
    }

    if (booking.status !== "COMPLETED") {
      return next(
        new AppError("Payment allowed only after job completion", 400),
      );
    }

    if (booking.paymentStatus === "PAID") {
      return next(new AppError("Payment already completed", 400));
    }

    // 🔑 Razorpay instance (lazy)
    const razorpay = getRazorpayInstance();

    const amountInPaise = booking.serviceId.basePrice * 100;

    const options = {
      amount: amountInPaise,
      currency: "INR",
      receipt: `receipt_${bookingId}`,
    };

    const order = await razorpay.orders.create(options);

    await Payment.create({
      bookingId,
      providerId: booking.providerId,
      razorpayOrderId: order.id,
      amount: amountInPaise,
      status: "CREATED",
    });

    res.status(200).json({
      success: true,
      order,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    next(error);
  }
};
/* ================= RAZORPAY WEBHOOK ================= */
export const razorpayWebhook = async (req, res) => {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    const shasum = crypto.createHmac("sha256", secret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if (digest !== req.headers["x-razorpay-signature"]) {
      return res.status(400).json({ success: false });
    }

    if (req.body.event === "payment.captured") {
      const paymentEntity = req.body.payload.payment.entity;

      const payment = await Payment.findOne({
        razorpayOrderId: paymentEntity.order_id,
      });

      if (payment && payment.status !== "PAID") {
        const totalAmount = payment.amount / 100;
        const commission = (totalAmount * 10) / 100;
        const providerAmount = totalAmount - commission;

        payment.status = "PAID";
        payment.razorpayPaymentId = paymentEntity.id;
        payment.commission = commission;
        payment.providerAmount = providerAmount;
        await payment.save();

        const booking = await Booking.findByIdAndUpdate(
          payment.bookingId,
          { paymentStatus: "PAID" },
          { new: true },
        ).populate("userId providerId");

        await Wallet.findOneAndUpdate(
          { providerId: payment.providerId },
          { $inc: { balance: providerAmount } },
          { upsert: true },
        );

        await Notification.create([
          {
            userId: booking.userId._id,
            userModel: "User",
            title: "Payment Successful",
            message: "Your payment was successful",
          },
          {
            userId: payment.providerId,
            userModel: "Provider",
            title: "Wallet Credited",
            message: `₹${providerAmount} credited to your wallet`,
          },
        ]);

        /* 📧 EMAILS (ADDED) */
        await sendEmail({
          to: booking.userId.email,
          subject: "Payment Successful",
          html: `<p>Your payment of ₹${totalAmount} was successful.</p>`,
        });

        await sendEmail({
          to: booking.providerId.email,
          subject: "Wallet Credited",
          html: `<p>₹${providerAmount} has been credited to your wallet.</p>`,
        });
      }
    }

    res.json({ status: "ok" });
  } catch (error) {
    console.error("Webhook error:", error);
    res.status(500).json({ success: false });
  }
};

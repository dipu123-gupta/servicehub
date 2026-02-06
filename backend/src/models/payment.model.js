import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },

    razorpayOrderId: String,
    razorpayPaymentId: String,
    razorpaySignature: String,

    amount: Number,

    status: {
      type: String,
      enum: ["CREATED", "PAID", "FAILED"],
      default: "CREATED",
    },

    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Provider",
    },
    commission: Number,
    providerAmount: Number,
  },
  { timestamps: true },
);

export default mongoose.model("Payment", paymentSchema);

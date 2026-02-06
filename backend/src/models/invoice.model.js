import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
  {
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
      unique: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Provider",
      required: true,
    },

    paymentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
      required: true,
    },

    amount: Number,
    commission: Number,
    providerAmount: Number,

    invoiceNumber: {
      type: String,
      unique: true,
    },

    pdfUrl: String,
  },
  { timestamps: true }
);

export default mongoose.model("Invoice", invoiceSchema);

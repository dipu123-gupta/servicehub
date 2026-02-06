import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Provider",
    },

    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    schedule: {
      type: Date,
      required: true,
    },

    problemDescription: {
      type: String,
    },

    status: {
      type: String,
      enum: [
        "PENDING",
        "PROVIDER_ASSIGNED",
        "ACCEPTED",
        "ON_THE_WAY",
        "OTP_VERIFIED",
        "WORK_STARTED",
        "COMPLETED",
        "CANCELLED",
      ],
      default: "PENDING",
    },

    otp: {
      type: String,
    },
    otpExpiresAt: Date,

    paymentStatus: {
      type: String,
      enum: ["PENDING", "PAID", "REFUNDED"],
      default: "PENDING",
    },

    cancelReason: {
      type: String,
    },
    assignedAt: Date,

    providerResponseDeadline: Date, // ✅ ADD

    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },

    media: [String],
  },
  { timestamps: true },
);

bookingSchema.index({ location: "2dsphere" });
export default mongoose.model("Booking", bookingSchema);

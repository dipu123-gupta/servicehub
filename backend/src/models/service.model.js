import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },

    category: {
      type: String,
      required: true,
      enum: ["ELECTRICIAN", "PLUMBER", "CLEANING", "CARPENTER", "PAINTER"],
    },

    basePrice: {
      type: Number,
      required: true,
      min: [0, "Price cannot be negative"],
    },

    variants: [
      {
        name: String,
        price: Number,
      },
    ], // ✅ ADD

    addons: [
      {
        name: String,
        price: Number,
      },
    ], // ✅ ADD

    description: {
      type: String,
      trim: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Service", serviceSchema);

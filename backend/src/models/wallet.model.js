import mongoose from "mongoose";

const walletSchema = new mongoose.Schema(
  {
    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Provider",
      required: true,
      unique: true,
    },

    balance: {
      type: Number,
      default: 0,
      min: [0, "Wallet balance cannot be negative"],
    },
  },
  { timestamps: true },
);

export default mongoose.model("Wallet", walletSchema);

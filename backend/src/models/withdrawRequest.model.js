import mongoose from "mongoose";

const withdrawRequestSchema = new mongoose.Schema({
  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Provider",
  },
  amount: Number,
  status: {
    type: String,
    enum: ["PENDING", "APPROVED", "REJECTED"],
    default: "PENDING",
  },
}, { timestamps: true });

export default mongoose.model("WithdrawRequest", withdrawRequestSchema);

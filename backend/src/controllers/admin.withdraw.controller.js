import WithdrawRequest from "../models/withdrawRequest.model.js";
import Wallet from "../models/wallet.model.js";
import AppError from "../utils/AppError.js";

/* ================= GET ALL WITHDRAW REQUESTS ================= */
export const getWithdrawRequests = async (req, res, next) => {
  const requests = await WithdrawRequest.find()
    .populate("providerId", "name email");

  res.status(200).json({
    success: true,
    requests,
  });
};

/* ================= APPROVE WITHDRAW ================= */
export const approveWithdraw = async (req, res, next) => {
  const request = await WithdrawRequest.findById(req.params.id);

  if (!request || request.status !== "PENDING") {
    return next(new AppError("Invalid withdraw request", 400));
  }

  const wallet = await Wallet.findOne({ providerId: request.providerId });

  if (!wallet || wallet.balance < request.amount) {
    return next(new AppError("Insufficient wallet balance", 400));
  }

  wallet.balance -= request.amount;
  await wallet.save();

  request.status = "APPROVED";
  await request.save();

  res.status(200).json({
    success: true,
    message: "Withdraw request approved",
  });
};

/* ================= REJECT WITHDRAW ================= */
export const rejectWithdraw = async (req, res, next) => {
  const request = await WithdrawRequest.findById(req.params.id);

  if (!request || request.status !== "PENDING") {
    return next(new AppError("Invalid withdraw request", 400));
  }

  request.status = "REJECTED";
  await request.save();

  res.status(200).json({
    success: true,
    message: "Withdraw request rejected",
  });
};

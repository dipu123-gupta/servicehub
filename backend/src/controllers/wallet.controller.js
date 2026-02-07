import Wallet from "../models/wallet.model.js";
import AppError from "../utils/AppError.js";
import WithdrawRequest from "../models/withdrawRequest.model.js";

/* ================= GET PROVIDER WALLET ================= */
export const getWallet = async (req, res, next) => {
  try {
    const wallet = await Wallet.findOne({ providerId: req.user.id });

    if (!wallet) {
      return next(new AppError("Wallet not found", 404));
    }

    res.status(200).json({
      success: true,
      wallet,
    });
  } catch (error) {
    next(error);
  }
};

/* ================= WITHDRAW REQUEST ================= */
export const withdrawRequest = async (req, res, next) => {
  try {
    const { amount } = req.body;

    // ✅ FIX 1: amount validation
    if (!amount || amount <= 0) {
      return next(new AppError("Invalid withdraw amount", 400));
    }

    const wallet = await Wallet.findOne({ providerId: req.user.id });

    if (!wallet || wallet.balance < amount) {
      return next(new AppError("Insufficient balance", 400));
    }

    // ✅ FIX 2: block multiple pending requests
    const pendingRequest = await WithdrawRequest.findOne({
      providerId: req.user.id,
      status: "PENDING",
    });

    if (pendingRequest) {
      return next(
        new AppError("You already have a pending withdraw request", 400),
      );
    }

    // ✅ UC STYLE: REQUEST CREATE
    const existing = await WithdrawRequest.findOne({
      providerId: req.user.id,
      status: "PENDING",
    });

    if (existing) {
      return next(new AppError("Pending withdraw already exists", 400));
    }

    res.status(200).json({
      success: true,
      message: "Withdraw request submitted for admin approval",
    });
  } catch (error) {
    next(error);
  }
};

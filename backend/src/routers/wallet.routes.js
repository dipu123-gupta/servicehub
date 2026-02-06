import express from "express";
import protect from "../middlewares/auth.middleware.js";
import { isProvider } from "../middlewares/role.middleware.js";
import validate from "../middlewares/validate.middleware.js";

import {
  getWallet,
  withdrawRequest,
} from "../controllers/wallet.controller.js";

import { withdrawSchema } from "../validations/wallet.validation.js";

const walletRoutes = express.Router();

/* ================= GET PROVIDER WALLET ================= */
// GET /api/v1/wallet
walletRoutes.get(
  "/",
  protect,
  isProvider,
  getWallet
);

/* ================= WITHDRAW REQUEST ================= */
// POST /api/v1/wallet/withdraw
walletRoutes.post(
  "/withdraw",
  protect,
  isProvider,
  validate(withdrawSchema),
  withdrawRequest
);

export default walletRoutes;

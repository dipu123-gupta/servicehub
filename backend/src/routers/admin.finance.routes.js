import express from "express";
import protect from "../middlewares/auth.middleware.js";
// import { isAdmin } from "../middlewares/admin.middleware.js";

import {
  getAllPayments,
  getCommissionReport,
  getRevenueSummary,
  refundPayment,
  getAllRefunds,
  getTransactions,
} from "../controllers/admin.finance.controller.js";
import isAdmin from "../middlewares/admin.middleware.js";

const adminFinanceRoutes = express.Router();

adminFinanceRoutes.get("/payments", protect, isAdmin, getAllPayments);
adminFinanceRoutes.get("/commissions", protect, isAdmin, getCommissionReport);
adminFinanceRoutes.get("/revenue", protect, isAdmin, getRevenueSummary);
adminFinanceRoutes.post("/refund/:paymentId", protect, isAdmin, refundPayment);
adminFinanceRoutes.get("/refunds", protect, isAdmin, getAllRefunds);
adminFinanceRoutes.get("/transactions", protect, isAdmin, getTransactions);

export default adminFinanceRoutes;

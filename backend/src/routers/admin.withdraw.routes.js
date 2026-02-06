import express from "express";
import protect from "../middlewares/auth.middleware.js";
import isAdmin from "../middlewares/admin.middleware.js";

import {
  getWithdrawRequests,
  approveWithdraw,
  rejectWithdraw,
} from "../controllers/admin.withdraw.controller.js";

const router = express.Router();

router.use(protect, isAdmin);

router.get("/withdraw-requests", getWithdrawRequests);
router.post("/withdraw-requests/:id/approve", approveWithdraw);
router.post("/withdraw-requests/:id/reject", rejectWithdraw);

export default router;

import express from "express";
import protect from "../middlewares/auth.middleware.js";

import {
  generateInvoice,
  downloadInvoice,
} from "../controllers/invoice.controller.js";

const invoiceRoutes = express.Router();

invoiceRoutes.get("/generate/:bookingId", protect, generateInvoice);
invoiceRoutes.get("/download/:id", protect, downloadInvoice);

export default invoiceRoutes;

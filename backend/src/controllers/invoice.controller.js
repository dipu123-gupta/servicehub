import Invoice from "../models/invoice.model.js";
import Payment from "../models/payment.model.js";
import Booking from "../models/booking.model.js";
import generateInvoicePDF from "../utils/generateInvoicePDF.js";
import AppError from "../utils/AppError.js";

/* ================= CREATE INVOICE ================= */
export const generateInvoice = async (req, res, next) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId);
    if (!booking || booking.paymentStatus !== "PAID") {
      return next(new AppError("Invoice not available", 400));
    }

    const payment = await Payment.findOne({ bookingId });
    if (!payment) {
      return next(new AppError("Payment not found", 404));
    }

    const exists = await Invoice.findOne({ bookingId });
    if (exists) {
      return res.status(200).json({
        success: true,
        invoice: exists,
      });
    }

    const invoiceNumber = `INV-${Date.now()}`;

    const invoice = await Invoice.create({
      bookingId,
      userId: booking.userId,
      providerId: booking.providerId,
      paymentId: payment._id,
      amount: payment.amount / 100,
      commission: payment.commission,
      providerAmount: payment.providerAmount,
      invoiceNumber,
    });

    const pdfPath = await generateInvoicePDF(invoice);
    invoice.pdfUrl = pdfPath;
    await invoice.save();

    res.status(201).json({
      success: true,
      invoice,
    });
  } catch (error) {
    next(error);
  }
};

/* ================= DOWNLOAD INVOICE ================= */
export const downloadInvoice = async (req, res, next) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return next(new AppError("Invoice not found", 404));
    }

    res.download(invoice.pdfUrl);
  } catch (error) {
    next(error);
  }
};

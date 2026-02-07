import api from "../../config/axios";

/* GENERATE INVOICE */
export const generateInvoiceApi = async (bookingId) => {
  const res = await api.get(`/invoices/generate/${bookingId}`);
  return res.data;
};

/* DOWNLOAD INVOICE */
export const downloadInvoiceApi = async (invoiceId) => {
  const res = await api.get(`/invoices/download/${invoiceId}`, {
    responseType: "blob", // 🔥 IMPORTANT
  });
  return res.data;
};

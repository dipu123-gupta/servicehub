import api from "../../config/axios";

/* DASHBOARD */
export const getDashboardStatsApi = async () => {
  const res = await api.get("/admin/dashboard");
  return res.data;
};

/* USERS */
export const getUsersApi = async () => {
  const res = await api.get("/admin/users");
  return res.data;
};

export const blockUserApi = async (id) => {
  const res = await api.post(`/admin/users/block/${id}`);
  return res.data;
};

/* PROVIDERS */
export const getProvidersApi = async () => {
  const res = await api.get("/admin/providers");
  return res.data;
};

export const verifyProviderApi = async (id) => {
  const res = await api.post(`/admin/providers/verify/${id}`);
  return res.data;
};

/* BOOKINGS */
export const getBookingsApi = async () => {
  const res = await api.get("/admin/bookings");
  return res.data;
};

/* PAYMENTS */
export const getPaymentsApi = async () => {
  const res = await api.get("/admin/payments");
  return res.data;
};

export const refundPaymentApi = async (paymentId) => {
  const res = await api.post(`/admin/refund/${paymentId}`);
  return res.data;
};

/* PAYMENTS */

export const getRevenueApi = async () => {
  const res = await api.get("/admin/revenue");
  return res.data;
};

export const getCommissionApi = async () => {
  const res = await api.get("/admin/commissions");
  return res.data;
};

export const getTransactionsApi = async () => {
  const res = await api.get("/admin/transactions");
  return res.data;
};


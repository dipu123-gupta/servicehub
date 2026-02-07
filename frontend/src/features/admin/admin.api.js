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

/* WITHDRAW */
export const getWithdrawRequestsApi = async () => {
  const res = await api.get("/admin/withdraw-requests");
  return res.data;
};

export const approveWithdrawApi = async (id) => {
  const res = await api.post(`/admin/withdraw-requests/${id}/approve`);
  return res.data;
};

export const rejectWithdrawApi = async (id) => {
  const res = await api.post(`/admin/withdraw-requests/${id}/reject`);
  return res.data;
};

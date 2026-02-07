import api from "../../config/axios";

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

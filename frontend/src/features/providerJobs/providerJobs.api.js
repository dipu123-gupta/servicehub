import api from "../../config/axios";

export const getProviderJobsApi = async () => {
  const res = await api.get("/provider/bookings/jobs");
  return res.data;
};

export const acceptJobApi = async (id) => {
  const res = await api.post(`/provider/bookings/accept/${id}`);
  return res.data;
};

export const verifyOtpApi = async ({ id, otp }) => {
  const res = await api.post(`/provider/bookings/verify-otp/${id}`, { otp });
  return res.data;
};

export const startWorkApi = async (id) => {
  const res = await api.post(`/provider/bookings/start/${id}`);
  return res.data;
};

export const completeJobApi = async (id) => {
  const res = await api.post(`/provider/bookings/complete/${id}`);
  return res.data;
};

export const rejectJobApi = async (id) => {
  const res = await api.post(`/provider/bookings/reject/${id}`);
  return res.data;
};

/* JOB HISTORY */
export const getJobHistoryApi = async () => {
  const res = await api.get("/provider/bookings/history");
  return res.data;
};






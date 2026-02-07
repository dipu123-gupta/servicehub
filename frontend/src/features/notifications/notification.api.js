import api from "../../config/axios";

export const getMyNotificationsApi = async () => {
  const res = await api.get("/notifications");
  return res.data;
};

export const markAsReadApi = async (id) => {
  const res = await api.put(`/notifications/${id}/read`);
  return res.data;
};

import api from "../../config/axios";

export const getMyBookingsApi = async () => {
  const res = await api.get("/bookings/my");
  return res.data;
};

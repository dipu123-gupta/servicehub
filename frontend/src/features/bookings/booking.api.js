import api from "../../config/axios";

export const getMyBookingsApi = async () => {
  const res = await api.get("/bookings/my");
  return res.data;
};

// ✅ NEW
export const getBookingByIdApi = async (id) => {
  const res = await api.get(`/bookings/${id}`);
  return res.data;
};

/* CANCEL BOOKING */
export const cancelBookingApi = async ({ id, reason }) => {
  const res = await api.patch(`/bookings/${id}/cancel`, { reason });
  return res.data;
};


export const uploadBookingMediaApi = async ({ id, file }) => {
  const formData = new FormData();
  formData.append("media", file);

  const res = await api.post(`/bookings/${id}/media`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};

/* CREATE BOOKING */
export const createBookingApi = async (data) => {
  const res = await api.post("/bookings", data);
  return res.data;
};


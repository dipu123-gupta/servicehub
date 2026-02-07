import api from "../../config/axios";

export const loginApi = async (data) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const logoutApi = async () => {
  const res = await api.post("/auth/logout");
  return res.data;
};

/* 🔥 NEW: LOAD USER FROM COOKIE */
export const loadUserApi = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};

import api from "../../config/axios";

export const loginApi = async (data) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const logoutApi = async () => {
  const res = await api.post("/auth/logout");
  return res.data;
};

export const loadUserApi = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};

/* REGISTER USER */
export const registerUserApi = async (data) => {
  const res = await api.post("/auth/register/user", data);
  return res.data;
};

/* REGISTER PROVIDER */
export const registerProviderApi = async (data) => {
  const res = await api.post("/auth/register/provider", data);
  return res.data;
};

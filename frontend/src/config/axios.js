import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (
  error.response?.status === 401 &&
  !window.location.pathname.includes("/login")
) {
  window.location.href = "/login";
}

    return Promise.reject(error);
  }
);

export default api;

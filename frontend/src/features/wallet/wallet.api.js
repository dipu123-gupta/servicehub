import api from "../../config/axios";

/* GET WALLET */
export const getWalletApi = async () => {
  const res = await api.get("/wallet");
  return res.data;
};

/* WITHDRAW */
export const withdrawRequestApi = async (amount) => {
  const res = await api.post("/wallet/withdraw", { amount });
  return res.data;
};



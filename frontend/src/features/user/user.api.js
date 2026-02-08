import api from "../../config/axios";

/* GET PROFILE */
export const getUserProfileApi = async () => {
  const res = await api.get("/users/profile");
  return res.data;
};

/* UPDATE PROFILE */
export const updateUserProfileApi = async (data) => {
  const res = await api.put("/users/profile", data);
  return res.data;
};

/* UPDATE PROFILE IMAGE */
export const uploadProfileImageApi = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await api.put("/users/profile-image", formData);
  return res.data;
};

/* CHANGE PASSWORD */
export const changePasswordApi = async (data) => {
  const res = await api.put("/users/change-password", data);
  return res.data;
};

/* DELETE ACCOUNT */
export const deleteAccountApi = async () => {
  const res = await api.delete("/users/delete-account");
  return res.data;
};

import api from "../../config/axios";

/* GET PROFILE */
export const getProviderProfileApi = async () => {
  const res = await api.get("/provider/profile/profile");
  return res.data;
};

/* UPDATE PROFILE */
export const updateProviderProfileApi = async (data) => {
  const res = await api.put("/provider/profile/profile", data);
  return res.data;
};

/* UPDATE AVAILABILITY */
export const updateAvailabilityApi = async (isAvailable) => {
  const res = await api.put("/provider/profile/availability", {
    isAvailable,
  });
  return res.data;
};

/* UPDATE PROFILE IMAGE */
export const uploadProviderProfileImageApi = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await api.put(
    "/provider/profile/profile-image",
    formData
  );
  return res.data;
};

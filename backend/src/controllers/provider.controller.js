import Provider from "../models/provider.model.js";
import AppError from "../utils/AppError.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";

/* ================= GET PROFILE ================= */
export const getProviderProfile = async (req, res, next) => {
  const provider = await Provider.findById(req.user.id);

  if (!provider) {
    return next(new AppError("Provider not found", 404));
  }

  res.status(200).json({
    success: true,
    provider,
  });
};

/* ================= UPDATE PROFILE ================= */
export const updateProviderProfile = async (req, res, next) => {
  const { name, phone, skills } = req.body;

  const provider = await Provider.findByIdAndUpdate(
    req.user.id,
    { name, phone, skills },
    { new: true }
  );

  res.status(200).json({
    success: true,
    provider,
  });
};

/* ================= AVAILABILITY ================= */
export const updateAvailability = async (req, res, next) => {
  const { isAvailable } = req.body;

  await Provider.findByIdAndUpdate(req.user.id, { isAvailable });

  res.status(200).json({
    success: true,
    message: "Availability updated",
  });
};


/* ================= UPLOAD PROVIDER PROFILE IMAGE ================= */
export const uploadProviderProfileImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(new AppError("Image file is required", 400));
    }

    const result = await uploadToCloudinary(
      req.file.buffer,
      "providers/profile"
    );

    const provider = await Provider.findByIdAndUpdate(
      req.user.id,
      { profileImage: result.secure_url },
      { new: true }
    );

    res.status(200).json({
      success: true,
      profileImage: provider.profileImage,
    });
  } catch (error) {
    next(error);
  }
};

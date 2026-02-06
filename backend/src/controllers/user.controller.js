import User from "../models/user.model.js";
import AppError from "../utils/AppError.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";

/* ================= GET PROFILE ================= */
export const getUserProfile = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  res.status(200).json({
    success: true,
    user,
  });
};

/* ================= UPDATE PROFILE ================= */
export const updateUserProfile = async (req, res, next) => {
  const { name, phone } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { name, phone },
    { new: true },
  );

  res.status(200).json({
    success: true,
    user,
  });
};

/* ================= CHANGE PASSWORD ================= */
export const changeUserPassword = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user.id).select("+password");

  if (!user || !(await user.comparePassword(oldPassword))) {
    return next(new AppError("Old password incorrect", 400));
  }

  user.password = newPassword;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Password updated successfully",
  });
};

/* ================= DELETE ACCOUNT ================= */
export const deleteUserAccount = async (req, res, next) => {
  await User.findByIdAndDelete(req.user.id);

  res
    .cookie("token", "", { expires: new Date(0) })
    .status(200)
    .json({
      success: true,
      message: "Account deleted",
    });
};

/* ================= UPLOAD USER PROFILE IMAGE ================= */
export const uploadUserProfileImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(new AppError("Image file is required", 400));
    }

    const result = await uploadToCloudinary(req.file.buffer, "users/profile");

    await User.findByIdAndUpdate(req.user.id, {
      profileImage: result.secure_url,
    });

    res.status(200).json({
      success: true,
      profileImage: result.secure_url,
    });
  } catch (error) {
    next(error);
  }
};

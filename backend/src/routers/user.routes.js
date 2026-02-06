import express from "express";
import protect from "../middlewares/auth.middleware.js";
import { isUser } from "../middlewares/role.middleware.js";
import { uploadUserProfileImage } from "../controllers/user.controller.js";
import upload from "../middlewares/multer.middleware.js";

import {
  getUserProfile,
  updateUserProfile,
  changeUserPassword,
  deleteUserAccount,
} from "../controllers/user.controller.js";

const userRoutes = express.Router();

userRoutes.get("/profile", protect, isUser, getUserProfile);
userRoutes.put("/profile", protect, isUser, updateUserProfile);
userRoutes.put("/change-password", protect, isUser, changeUserPassword);
userRoutes.delete("/delete-account", protect, isUser, deleteUserAccount);

userRoutes.put(
  "/profile-image",
  protect,
  isUser,
  upload.single("image"),
  uploadUserProfileImage
);


export default userRoutes;

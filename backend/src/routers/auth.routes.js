import express from "express";
import {
  registerUser,
  registerProvider,
  login,
  logout,
  forgotPassword,
  resetPassword,
  getMe,
} from "../controllers/auth.controller.js";
import { loginLimiter } from "../middlewares/rateLimit.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import { forgotPasswordSchema, loginSchema, registerSchema, resetPasswordSchema } from "../validations/auth.validation.js";
  import protect from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post("/register/user",validate(registerSchema), registerUser);
router.post("/register/provider", registerProvider);
router.post("/login",validate(loginSchema), /*loginLimiter*/ login);
router.post("/logout", logout);
router.post("/forgot-password",validate(forgotPasswordSchema), forgotPassword);
router.post("/reset-password/:token",validate(resetPasswordSchema), resetPassword);
router.get("/me", protect, getMe);


export default router;

import User from "../models/user.model.js";
import Provider from "../models/provider.model.js";
import AppError from "../utils/AppError.js";
import { generateToken } from "../utils/generateToken.js";
import sendEmail from "../config/sendEmail.js";
import crypto from "crypto";



/* ================= REGISTER USER ================= */
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone) {
      return next(new AppError("All fields are required", 400));
    }

    const exists =
      (await User.findOne({ email })) ||
      (await Provider.findOne({ email }));

    if (exists) {
      return next(new AppError("Email already registered", 400));
    }

    await User.create({
      name,
      email,
      password,
      phone,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    next(error);
  }
};

/* ================= REGISTER PROVIDER ================= */
export const registerProvider = async (req, res, next) => {
  try {
    const { name, email, password, phone, skills } = req.body;

    if (!name || !email || !password || !phone || !skills) {
      return next(new AppError("All fields are required", 400));
    }

    const exists =
      (await User.findOne({ email })) ||
      (await Provider.findOne({ email }));

    if (exists) {
      return next(new AppError("Email already registered", 400));
    }

    await Provider.create({
      name,
      email,
      password,
      phone,
      skills,
    });

    res.status(201).json({
      success: true,
      message: "Provider registered, waiting for admin verification",
    });
  } catch (error) {
    next(error);
  }
};

/* ================= LOGIN (USER / PROVIDER) ================= */
export const login = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return next(new AppError("All fields are required", 400));
    }

    let account;

    if (role === "USER") {
      account = await User.findOne({ email }).select("+password");
    } else if (role === "PROVIDER") {
      account = await Provider.findOne({ email }).select("+password");
    } else {
      return next(new AppError("Invalid role", 400));
    }

    if (!account) {
      return next(new AppError("Invalid credentials", 401));
    }

    // ✅ BLOCKED USER CHECK (ADDED)
    if (account.isBlocked) {
      return next(new AppError("Account is blocked", 403));
    }

    // ✅ PROVIDER VERIFICATION CHECK (ADDED)
    if (role === "PROVIDER" && !account.isVerified) {
      return next(
        new AppError("Provider not verified by admin", 403)
      );
    }

    const isMatch = await account.comparePassword(password);
    if (!isMatch) {
      return next(new AppError("Invalid credentials", 401));
    }

    // 🔑 Generate JWT
    const token = generateToken({
      id: account._id,
      role,
    });

    // 🍪 Secure Cookie
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        success: true,
        message: "Login successful",
        role,
      });
  } catch (error) {
    next(error);
  }
};


/* ================= LOGOUT ================= */
export const logout = async (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .status(200)
    .json({
      success: true,
      message: "Logged out successfully",
    });
};


/* ================= FORGOT PASSWORD ================= */
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return next(new AppError("User not found", 404));
    }

    const token = crypto.randomBytes(20).toString("hex");

    user.forgotPasswordToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    user.forgotPasswordExpiry = Date.now() + 15 * 60 * 1000; // 15 min

    await user.save({ validateBeforeSave: false });

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${token}`;

    await sendEmail({
      to: user.email,
      subject: "Reset Your Password",
      html: `
        <h2>Password Reset</h2>
        <p>Click below link to reset password:</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>This link expires in 15 minutes.</p>
      `,
    });

    res.status(200).json({
      success: true,
      message: "Password reset link sent to email",
    });
  } catch (error) {
    next(error);
  }
};

/* ================= RESET PASSWORD ================= */
export const resetPassword = async (req, res, next) => {
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      forgotPasswordToken: hashedToken,
      forgotPasswordExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return next(new AppError("Token is invalid or expired", 400));
    }

    user.password = req.body.password;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    next(error);
  }
};


export const getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    role: req.user.role,
  });
};


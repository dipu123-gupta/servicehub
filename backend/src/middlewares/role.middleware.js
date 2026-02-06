import AppError from "../utils/AppError.js";

export const isUser = (req, res, next) => {
  if (req.user.role !== "USER") {
    return next(new AppError("Access denied", 403));
  }
  next();
};

export const isProvider = (req, res, next) => {
  if (req.user.role !== "PROVIDER") {
    return next(new AppError("Access denied", 403));
  }
  next();
};

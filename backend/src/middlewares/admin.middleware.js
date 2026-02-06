import AppError from "../utils/AppError.js";

const isAdmin = (req, res, next) => {
  if (req.user.role !== "ADMIN") {
    return next(new AppError("Admin access only", 403));
  }
  next();
};

export default isAdmin;

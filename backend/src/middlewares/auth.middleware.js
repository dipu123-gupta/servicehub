import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";

const protect = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return next(new AppError("Not logged in", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch (error) {
    return next(new AppError("Invalid token", 401));
  }
};

export default protect;

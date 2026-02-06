import AppError from "../utils/AppError.js";

const validateParams = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.params);
  if (error) {
    return next(new AppError("Invalid URL parameter", 400));
  }
  next();
};

export default validateParams;

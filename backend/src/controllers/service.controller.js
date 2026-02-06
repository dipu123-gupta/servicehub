import Service from "../models/service.model.js";
import AppError from "../utils/AppError.js";

/* ================= CREATE SERVICE (ADMIN) ================= */
export const createService = async (req, res, next) => {
  const { title, category, basePrice, description } = req.body;

  if (!title || !category || !basePrice) {
    return next(new AppError("All fields are required", 400));
  }

  const service = await Service.create({
    title,
    category,
    basePrice,
    description,
  });

  res.status(201).json({
    success: true,
    service,
  });
};

/* ================= GET ALL SERVICES (PUBLIC) ================= */
export const getAllServices = async (req, res) => {
  const services = await Service.find({ isActive: true });

  res.status(200).json({
    success: true,
    count: services.length,
    services,
  });
};

/* ================= GET SINGLE SERVICE ================= */
export const getServiceById = async (req, res, next) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    return next(new AppError("Service not found", 404));
  }

  res.status(200).json({
    success: true,
    service,
  });
};

/* ================= UPDATE SERVICE (ADMIN) ================= */
export const updateService = async (req, res, next) => {
  const service = await Service.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!service) {
    return next(new AppError("Service not found", 404));
  }

  res.status(200).json({
    success: true,
    service,
  });
};

/* ================= DELETE SERVICE (ADMIN) ================= */
export const deleteService = async (req, res, next) => {
  const service = await Service.findByIdAndDelete(req.params.id);

  if (!service) {
    return next(new AppError("Service not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Service deleted successfully",
  });
};

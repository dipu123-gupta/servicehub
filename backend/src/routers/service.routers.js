import express from "express";
import {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
} from "../controllers/service.controller.js";

import protect from "../middlewares/auth.middleware.js";
import isAdmin from "../middlewares/admin.middleware.js";
// Admin middleware later add hoga

const serviceRouter = express.Router();

/* PUBLIC */
serviceRouter.get("/", getAllServices);
serviceRouter.get("/:id", getServiceById);

/* ADMIN (for now protect only) */
serviceRouter.post("/", protect, isAdmin, createService);
serviceRouter.put("/:id", protect, isAdmin, updateService);
serviceRouter.delete("/:id", protect, isAdmin, deleteService);

export default serviceRouter;

import Joi from "joi";

export const createBookingSchema = Joi.object({
  serviceId: Joi.string().length(24).required(),
  address: Joi.string().min(5).required(),
  schedule: Joi.date().required(),
  problemDescription: Joi.string().allow(""),
  location: Joi.object({
    type: Joi.string().valid("Point").required(),
    coordinates: Joi.array().items(Joi.number()).length(2).required(),
  }).required(),
});

export const cancelBookingSchema = Joi.object({
  reason: Joi.string().min(3).required(),
});

export const bookingIdParamSchema = Joi.object({
  id: Joi.string().length(24).required(),
});

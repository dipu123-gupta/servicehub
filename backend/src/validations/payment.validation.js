import Joi from "joi";

export const createOrderSchema = Joi.object({
  bookingId: Joi.string().length(24).required(),
});


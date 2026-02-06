import Joi from "joi";

export const bookingIdParamSchema = Joi.object({
  id: Joi.string().length(24).required(),
});

export const verifyOtpSchema = Joi.object({
  otp: Joi.string().length(6).required(),
});

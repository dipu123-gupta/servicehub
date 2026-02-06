import Joi from "joi";

export const verifyProviderSchema = Joi.object({
  isVerified: Joi.boolean().required(),
});

export const refundSchema = Joi.object({
  reason: Joi.string().min(5).required(),
});

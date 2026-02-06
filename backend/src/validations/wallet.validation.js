import Joi from "joi";

export const withdrawSchema = Joi.object({
  amount: Joi.number().positive().required(),
});

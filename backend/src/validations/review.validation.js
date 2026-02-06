import Joi from "joi";

export const createReviewSchema = Joi.object({
  bookingId: Joi.string().length(24).required(),
  rating: Joi.number().min(1).max(5).required(),
  comment: Joi.string().min(5).required(),
});

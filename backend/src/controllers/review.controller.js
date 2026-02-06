import Review from "../models/review.model.js";
import Booking from "../models/booking.model.js";
import Provider from "../models/provider.model.js";
import AppError from "../utils/AppError.js";

/* ================= ADD REVIEW ================= */
export const addReview = async (req, res, next) => {
  try {
    const { bookingId, rating, comment } = req.body;

    if (!bookingId || !rating) {
      return next(new AppError("Booking ID and rating are required", 400));
    }

    if (rating < 1 || rating > 5) {
      return next(new AppError("Rating must be between 1 and 5", 400));
    }

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return next(new AppError("Booking not found", 404));
    }

    if (booking.userId.toString() !== req.user.id) {
      return next(new AppError("Unauthorized", 403));
    }

    if (booking.status !== "COMPLETED") {
      return next(new AppError("Review allowed only after completion", 400));
    }

    const exists = await Review.findOne({ bookingId });
    if (exists) {
      return next(new AppError("Review already submitted", 400));
    }

    const review = await Review.create({
      bookingId,
      userId: req.user.id,
      providerId: booking.providerId,
      rating,
      comment,
    });

    // 🔥 UPDATE PROVIDER AVG RATING
    const provider = await Provider.findById(booking.providerId);

    provider.averageRating =
      (provider.averageRating * provider.ratingCount + rating) /
      (provider.ratingCount + 1);

    provider.ratingCount += 1;

    await provider.save();

    res.status(201).json({
      success: true,
      review,
    });
  } catch (error) {
    next(error);
  }
};

/* ================= GET PROVIDER REVIEWS ================= */
export const getProviderReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({
      providerId: req.params.providerId,
    }).populate("userId", "name");

    res.status(200).json({
      success: true,
      count: reviews.length,
      reviews,
    });
  } catch (error) {
    next(error);
  }
};

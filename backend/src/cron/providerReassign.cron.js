import Booking from "../models/booking.model.js";
import assignProvider from "../utils/assignProvider.js";

const reassignExpiredBookings = async () => {
  const expiredBookings = await Booking.find({
    status: "PROVIDER_ASSIGNED",
    providerResponseDeadline: { $lt: new Date() },
  });

  for (const booking of expiredBookings) {
    booking.providerId = null;
    booking.status = "PENDING";
    await booking.save();
    await assignProvider(booking);
  }
};

export default reassignExpiredBookings;

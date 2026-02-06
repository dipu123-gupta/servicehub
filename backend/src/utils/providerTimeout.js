import Booking from "../models/booking.model.js";
import Provider from "../models/provider.model.js";
import assignProvider from "./assignProvider.js";

const PROVIDER_TIMEOUT = 2 * 60 * 1000;

const handleProviderTimeout = async (bookingId) => {
  const booking = await Booking.findById(bookingId).populate("serviceId");

  if (!booking || booking.status !== "PROVIDER_ASSIGNED") return;

  const provider = await Provider.findById(booking.providerId);

  if (provider) {
    provider.isAvailable = true;
    await provider.save();
  }

  booking.providerId = null;
  await booking.save();

  await assignProvider(booking);
};

export default handleProviderTimeout;

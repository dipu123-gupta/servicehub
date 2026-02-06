import Provider from "../models/provider.model.js";
import Notification from "../models/notification.model.js"; // ✅ ADDED
import sendEmail from "../config/sendEmail.js"; // ✅ ADDED

const assignProvider = async (booking) => {
  const providers = await Provider.find({
    isVerified: true,
    isAvailable: true,
    skills: booking.serviceId.category,
    location: {
      $near: {
        $geometry: booking.location,
        $maxDistance: 10000, // 10km
      },
    },
  });

  if (!providers.length) {
    return null;
  }

  const provider = providers[0]; // nearest provider

  booking.providerId = provider._id;
  booking.status = "PROVIDER_ASSIGNED";
  booking.assignedAt = new Date();
  booking.providerResponseDeadline =
  new Date(Date.now() + 5 * 60 * 1000); // 5 min

  await booking.save();

  provider.isAvailable = false;
  await provider.save();

  /* 🔔 NOTIFICATION (ADDED) */
  await Notification.create({
    userId: provider._id,
    userModel: "Provider",
    title: "New Job Assigned",
    message: "A new service booking has been assigned to you",
  });

  /* 📧 EMAIL (ADDED) */
  await sendEmail({
    to: provider.email,
    subject: "New Job Assigned",
    html: `
      <h2>New Service Job</h2>
      <p>You have been assigned a new booking.</p>
      <p>Please login to your dashboard to accept the job.</p>
    `,
  });

  return provider;
};

export default assignProvider;

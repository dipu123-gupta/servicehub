import Notification from "../models/notification.model.js";

/* ================= GET MY NOTIFICATIONS ================= */
export const getMyNotifications = async (req, res) => {
  const notifications = await Notification.find({
    userId: req.user.id,
  }).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: notifications.length,
    notifications,
  });
};

/* ================= MARK AS READ ================= */
export const markAsRead = async (req, res) => {
  await Notification.findByIdAndUpdate(req.params.id, {
    isRead: true,
  });

  res.status(200).json({
    success: true,
    message: "Notification marked as read",
  });
};

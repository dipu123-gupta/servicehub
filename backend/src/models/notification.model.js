import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "userModel",
      required: true,
    },

    userModel: {
      type: String,
      enum: ["User", "Provider", "Admin"],
      required: true,
    },

    title: String,
    message: String,

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);

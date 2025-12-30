import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    notificationSender: {
      type: String,
      required: true,
      trim: true,
    },

    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },

    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },

    notificationDescription: {
      type: String,
      trim: true,
    },

    notificationRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models?.Notification ||
  mongoose.model("Notification", NotificationSchema);

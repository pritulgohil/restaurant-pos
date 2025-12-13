import mongoose from "mongoose";

const tableSchema = new mongoose.Schema(
  {
    tableNumber: {
      type: Number,
      required: true,
    },
    occupancy: {
      type: Number,
      required: true,
    },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      default: null,
    },
    isOccupied: {
      type: Boolean,
      default: false,
      enum: [true, false],
    },
    peopleCount: {
      type: Number,
      default: 0,
    },
    customerName: {
      type: String,
      default: "",
    },
    paymentStatus: {
      type: Boolean,
      enum: [true, false],
      default: false,
    },
    assignedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Table || mongoose.model("Table", tableSchema);

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
    status: {
      type: String,
      default: "Free",
      enum: ["Free", "Occupied"],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Table || mongoose.model("Table", tableSchema);

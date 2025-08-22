import mongoose from "mongoose";

const DishSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
});

const OrderSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    table: Number,
    customerName: String,
    peopleCount: Number,
    totalItems: Number,
    dishes: {
      type: Map,
      of: DishSchema,
    },
    subtotal: Number,
    tax: Number,
    totalPayable: Number,
    status: String,
    paymentMethod: {
      type: String,
      enum: ["cash", "card"],
      default: "cash",
    },
    orderType: {
      type: String,
      enum: ["Dine-in", "Takeaway"],
      default: "Dine-in",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);

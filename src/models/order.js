import mongoose from "mongoose";

const DishSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
});

const OrderSchema = new mongoose.Schema(
  {
    table: Number,
    customerName: String,
    peopleCount: Number,
    dishes: {
      type: Map,
      of: DishSchema,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);

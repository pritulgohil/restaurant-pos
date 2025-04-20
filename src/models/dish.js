import mongoose from "mongoose";

const DishSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  emoji: { type: String },
  price: { type: Number, required: true },
  available: { type: Boolean, default: true },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

export default mongoose.models.Dish || mongoose.model("Dish", DishSchema);

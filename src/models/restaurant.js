import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema(
  {
    restaurantName: { type: String, required: true },
    cuisineType: { type: String, required: true },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, collection: "restaurants" }
);

export default mongoose.models.Restaurant ||
  mongoose.model("Restaurant", RestaurantSchema);

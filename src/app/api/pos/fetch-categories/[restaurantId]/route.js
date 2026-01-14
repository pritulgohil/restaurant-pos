import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Category from "@/models/category";
import Dish from "@/models/dish";
import { verifyAuth } from "@/lib/verifyAuth";

export async function GET(req, { params }) {
  try {
    await dbConnect();
    let decoded;

    try {
      decoded = verifyAuth(req);
    } catch (err) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    const { restaurantId } = await params;

    // Fetch categories
    const categories = await Category.find({ restaurantId });

    // Add dishCount to each category
    const categoriesWithDishCount = await Promise.all(
      categories.map(async (category) => {
        const dishCount = await Dish.countDocuments({
          categoryId: category._id,
        });
        return {
          ...category.toObject(),
          dishCount,
        };
      })
    );

    // Get total number of dishes for this restaurant
    const totalDishCount = await Dish.countDocuments({ restaurantId });

    return NextResponse.json(
      { categories: categoriesWithDishCount, totalDishCount },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

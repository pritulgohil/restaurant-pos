import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Category from "@/models/category";
import Dish from "@/models/dish";
import { verifyAuth } from "@/lib/verifyAuth";

export async function PATCH(req, { params }) {
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

    const { categoryId } = await params;
    const body = await req.json();

    const { name, description, emoji, restaurantId } = body;

    const updateFields = {
      ...(name && { name }),
      ...(description && { description }),
      ...(emoji && { emoji }),
      ...(restaurantId && { restaurantId }),
    };

    // Update Category
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      updateFields,
      { new: true }
    );

    if (!updatedCategory) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    // Update Dishes with new category name
    if (name) {
      await Dish.updateMany(
        { categoryId: categoryId },
        { $set: { categoryName: name } }
      );
    }

    return NextResponse.json(updatedCategory, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

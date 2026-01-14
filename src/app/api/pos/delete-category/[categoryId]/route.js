import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Category from "@/models/category";
import Dish from "@/models/dish";
import { verifyAuth } from "@/lib/verifyAuth";

export async function DELETE(req, { params }) {
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

    // Delete Category
    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    // Delete Associated Dishes
    await Dish.deleteMany({ categoryId });

    return NextResponse.json(
      { message: "Category and associated dishes deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

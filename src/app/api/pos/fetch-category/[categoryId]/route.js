import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Category from "@/models/category";
import mongoose from "mongoose";
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

    const { categoryId } = await params;

    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return NextResponse.json(
        { error: "Invalid category ID format" },
        { status: 400 }
      );
    }

    // Fetch category by _id
    const category = await Category.findById(categoryId).exec();

    if (!category) {
      return NextResponse.json(
        { message: "No category found with this ID" },
        { status: 404 }
      );
    }

    return NextResponse.json({ category }, { status: 200 });
  } catch (error) {
    console.error("Error fetching category:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

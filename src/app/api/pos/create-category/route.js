import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Category from "@/models/category";
import { verifyAuth } from "@/lib/verifyAuth";

export async function POST(req) {
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

    const body = await req.json();
    const { name, description, restaurantId, emoji } = body;

    if (!name || !description || !restaurantId || !emoji) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const newCategory = new Category({
      name,
      description,
      restaurantId,
      emoji,
    });
    await newCategory.save();

    return NextResponse.json(
      { message: "Category created successfully", category: newCategory },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Category from "@/models/category";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export async function GET(req, { params }) {
  try {
    await dbConnect();

    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    let decoded;

    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    // Extract restaurantId from dynamic route params
    const { restaurantId } = await params;

    // Fetch categories for the given restaurantId
    const categories = await Category.find({ restaurantId });

    // If no categories found, return a 404
    if (!categories.length) {
      return NextResponse.json(
        { error: "No categories found for this restaurant" },
        { status: 404 }
      );
    }

    // Return categories
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

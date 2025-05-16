import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Dish from "@/models/dish";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export async function PATCH(req, { params }) {
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

    const { dishId } = await params;
    const body = await req.json();

    const {
      name,
      description,
      categoryName,
      emoji,
      price,
      available,
      restaurantId,
      categoryId,
    } = body;

    const updateFields = {
      ...(name && { name }),
      ...(description && { description }),
      ...(categoryName && { categoryName }),
      ...(emoji && { emoji }),
      ...(price !== undefined && { price }),
      ...(available !== undefined && { available }),
      ...(restaurantId && { restaurantId }),
      ...(categoryId && { categoryId }),
    };

    const updatedDish = await Dish.findByIdAndUpdate(dishId, updateFields, {
      new: true,
    });

    if (!updatedDish) {
      return NextResponse.json({ error: "Dish not found" }, { status: 404 });
    }

    return NextResponse.json(updatedDish, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

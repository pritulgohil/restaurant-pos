import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
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

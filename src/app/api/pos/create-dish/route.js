import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Dish from "@/models/dish";
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

    if (
      !name ||
      !description ||
      !emoji ||
      price === undefined ||
      available === undefined ||
      !restaurantId
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newDish = new Dish({
      name,
      description,
      emoji,
      price,
      available,
      restaurantId,
      ...(categoryId && { categoryId }),
      ...(categoryName && { categoryName }),
    });

    await newDish.save();

    return NextResponse.json(newDish, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

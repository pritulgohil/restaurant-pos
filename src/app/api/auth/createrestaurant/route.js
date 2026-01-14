import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Restaurant from "@/models/restaurant";
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

    const { restaurantName, cuisineType, userId } = await req.json();

    if (!restaurantName || !cuisineType || !userId) {
      return NextResponse.json(
        { error: "All fields are required, including user ID" },
        { status: 400 }
      );
    }

    const newRestaurant = new Restaurant({
      restaurantName,
      cuisineType,
      userId,
    });

    await newRestaurant.save();

    console.log("Restaurant saved successfully:", newRestaurant);

    return NextResponse.json(
      { message: "Restaurant created successfully", restaurant: newRestaurant },
      { status: 201 }
    );
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

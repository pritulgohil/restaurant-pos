import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Restaurant from "@/models/restaurant";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export async function PATCH(req, { params }) {
  try {
    await dbConnect();

    // 🔐 Auth check
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    try {
      jwt.verify(token, JWT_SECRET);
    } catch {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    const { restaurantId } = await params;

    const body = await req.json();
    const { restaurantName, cuisineType } = body;

    if (!restaurantName && !cuisineType) {
      return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
    }

    // 🔍 Find restaurant
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return NextResponse.json(
        { error: "Restaurant not found" },
        { status: 404 }
      );
    }

    // 🛠 Update data
    const updateData = {};
    if (restaurantName) updateData.restaurantName = restaurantName;
    if (cuisineType) updateData.cuisineType = cuisineType;

    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      updateData,
      { new: true }
    );

    return NextResponse.json(updatedRestaurant, { status: 200 });
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

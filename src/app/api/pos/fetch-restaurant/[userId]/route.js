import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Restaurant from "@/models/restaurant";
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

    // Extract userId from dynamic route params
    const { userId } = await params;

    // Fetch restaurants for the given userId
    const restaurants = await Restaurant.find({ userId });

    // If no restaurants found, return a 404
    if (!restaurants.length) {
      return NextResponse.json(
        { error: "No restaurants found for this user" },
        { status: 404 }
      );
    }

    // Return restaurants
    return NextResponse.json(restaurants, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

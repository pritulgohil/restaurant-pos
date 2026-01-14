import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Restaurant from "@/models/restaurant";
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

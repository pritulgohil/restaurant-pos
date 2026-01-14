import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Dish from "@/models/dish";
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

    const { restaurantId } = await params;

    if (!restaurantId) {
      return NextResponse.json(
        { error: "Restaurant ID is required" },
        { status: 400 }
      );
    }

    const dishes = await Dish.find({ restaurantId }).exec();

    if (!dishes || dishes.length === 0) {
      return NextResponse.json({ dishes: [] }, { status: 200 });
    }

    return NextResponse.json({ dishes }, { status: 200 });
  } catch (error) {
    console.error("Error fetching dishes:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

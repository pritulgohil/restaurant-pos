import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Table from "@/models/table";
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
        { error: "restaurantId is required" },
        { status: 400 }
      );
    }

    // Fetch tables for the restaurant
    const tables = await Table.find({ restaurantId }).sort({ tableNumber: 1 });

    return NextResponse.json({ tables }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Table from "@/models/table";
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
    const { tableNumber, occupancy, restaurantId } = body;

    if (!tableNumber || !occupancy || !restaurantId) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const existing = await Table.findOne({
      tableNumber,
      restaurantId,
    });

    if (existing) {
      return NextResponse.json(
        { error: "Table number already exists" },
        { status: 400 }
      );
    }

    const newTable = new Table({
      tableNumber,
      occupancy,
      restaurantId,
    });

    await newTable.save();

    return NextResponse.json(
      { message: "Table created successfully", table: newTable },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

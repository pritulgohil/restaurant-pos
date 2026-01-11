import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/order";
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

    // Parse and validate body
    const body = await req.json();
    const {
      table,
      customerName,
      peopleCount,
      dishes,
      subtotal,
      tax,
      totalPayable,
      restaurantId,
      totalItems,
      status,
      paymentMethod,
      orderType,
    } = body;

    if (
      table === undefined ||
      !customerName ||
      peopleCount === undefined ||
      !dishes ||
      Object.keys(dishes).length === 0
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newOrder = new Order({
      table,
      customerName,
      peopleCount,
      dishes,
      subtotal,
      tax,
      totalPayable,
      restaurantId,
      totalItems,
      status,
      paymentMethod,
      orderType,
    });

    await newOrder.save();

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    console.error("Error saving order:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

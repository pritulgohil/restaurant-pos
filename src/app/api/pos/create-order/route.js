import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/order";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req) {
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

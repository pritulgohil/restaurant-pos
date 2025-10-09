// /app/api/dishes/[dishId]/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/order";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export async function DELETE(req, { params }) {
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

    const { orderId } = await params;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return NextResponse.json(
        { error: "Invalid order ID format" },
        { status: 400 }
      );
    }

    const deleteOrder = await Order.findByIdAndDelete(orderId);

    if (!deleteOrder) {
      return NextResponse.json({ error: "Dish not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Order deleted successfully", order: deleteOrder },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting order:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

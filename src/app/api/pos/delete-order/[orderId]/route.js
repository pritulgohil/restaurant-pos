// /app/api/dishes/[dishId]/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/order";
import mongoose from "mongoose";
import { verifyAuth } from "@/lib/verifyAuth";

export async function DELETE(req, { params }) {
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

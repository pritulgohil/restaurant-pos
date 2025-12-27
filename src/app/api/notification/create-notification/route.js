import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Notification from "@/models/notification";
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

    const body = await req.json();
    const { notificationSender, orderId, restaurantId } = body;

    if (!notificationSender || !orderId || !restaurantId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newNotification = new Notification({
      notificationSender,
      orderId,
      notificationDescription: `Order #${orderId.slice(
        -6
      )} has been added to queue`,
      notificationRead: false,
      restaurantId,
    });

    await newNotification.save();

    return NextResponse.json(newNotification, { status: 201 });
  } catch (error) {
    console.error("Notification POST error:", error);
    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
}

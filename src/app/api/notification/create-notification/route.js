import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Notification from "@/models/notification";
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
    const {
      notificationSender,
      orderId,
      restaurantId,
      notificationDescription,
    } = body;

    if (!notificationSender || !restaurantId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newNotification = new Notification({
      notificationSender,
      orderId,
      notificationDescription,
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

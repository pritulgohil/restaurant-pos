import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Notification from "@/models/notification";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export async function PATCH(req) {
  try {
    await dbConnect();

    // 🔐 Auth check
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    try {
      jwt.verify(token, JWT_SECRET);
    } catch {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { notificationId, restaurantId } = body;

    // 🔔 If notificationId is passed → mark single notification as read
    if (notificationId) {
      const notification = await Notification.findByIdAndUpdate(
        notificationId,
        { notificationRead: true },
        { new: true }
      );

      if (!notification) {
        return NextResponse.json(
          { error: "Notification not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(notification, { status: 200 });
    }

    // 🔔 If notificationId is NOT passed → mark all notifications as read
    const filter = {};
    if (restaurantId) {
      filter.restaurantId = restaurantId;
    }

    const result = await Notification.updateMany(filter, {
      notificationRead: true,
    });

    return NextResponse.json(
      {
        message: "All notifications marked as read",
        modifiedCount: result.modifiedCount,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

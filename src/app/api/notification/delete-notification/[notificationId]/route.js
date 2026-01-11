import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Notification from "@/models/notification";
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

    const { notificationId } = await params;

    if (!mongoose.Types.ObjectId.isValid(notificationId)) {
      return NextResponse.json(
        { error: "Invalid notification ID format" },
        { status: 400 }
      );
    }

    const deletedNotification = await Notification.findByIdAndDelete(
      notificationId
    );

    if (!deletedNotification) {
      return NextResponse.json(
        { error: "Notification not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Notification deleted successfully",
        notification: deletedNotification,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting notification:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

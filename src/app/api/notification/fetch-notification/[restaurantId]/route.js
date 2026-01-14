import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Notification from "@/models/notification";
import mongoose from "mongoose";
import { verifyAuth } from "@/lib/verifyAuth";

export async function GET(req, { params }) {
  try {
    await dbConnect();
    let decoded;

    try {
      decoded = verifyAuth(req);
    } catch {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    const { restaurantId } = await params;

    if (!restaurantId || !mongoose.Types.ObjectId.isValid(restaurantId)) {
      return NextResponse.json(
        { error: "Invalid restaurantId" },
        { status: 400 }
      );
    }

    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 6;
    const skip = (page - 1) * limit;

    const notifications = await Notification.find({ restaurantId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Notification.countDocuments({ restaurantId });

    return NextResponse.json(
      {
        notifications,
        pagination: {
          page,
          limit,
          total,
          hasMore: skip + notifications.length < total,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

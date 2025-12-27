import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Notification from "@/models/notification";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const JWT_SECRET = process.env.JWT_SECRET;

export async function GET(req, { params }) {
  try {
    await dbConnect();

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

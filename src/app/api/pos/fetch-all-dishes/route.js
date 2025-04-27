import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Dish from "@/models/dish";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export async function GET(req) {
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

    // Fetch all dishes
    const dishes = await Dish.find({}).exec();

    if (!dishes || dishes.length === 0) {
      return NextResponse.json({ message: "No dishes found" }, { status: 404 });
    }

    return NextResponse.json({ dishes }, { status: 200 });
  } catch (error) {
    console.error("Error fetching all dishes:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

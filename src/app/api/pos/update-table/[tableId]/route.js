import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Table from "@/models/table";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export async function PATCH(req, { params }) {
  try {
    await dbConnect();

    // --- Auth check ---
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

    // --- Params ---
    const { tableId } = await params;

    // --- Body ---
    const body = await req.json();
    const { customerName, peopleCount, orderId } = body;

    // if (customerName === undefined || peopleCount === undefined) {
    //   return NextResponse.json(
    //     { error: "customerName and peopleCount are required" },
    //     { status: 400 }
    //   );
    // }

    // Ensure peopleCount is number
    // if (typeof peopleCount !== "number") {
    //   return NextResponse.json(
    //     { error: "peopleCount must be a number" },
    //     { status: 400 }
    //   );
    // }

    // --- Update Table ---
    const updatedTable = await Table.findByIdAndUpdate(
      tableId,
      {
        customerName,
        peopleCount,
        isOccupied: true,
        orderId,
      },
      { new: true }
    );

    if (!updatedTable) {
      return NextResponse.json({ error: "Table not found" }, { status: 404 });
    }

    return NextResponse.json(updatedTable, { status: 200 });
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Table from "@/models/table";
import { verifyAuth } from "@/lib/verifyAuth";

export async function PATCH(req, { params }) {
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

    const { tableId } = await params;
    const body = await req.json();
    const { customerName, peopleCount, orderId, paymentStatus } = body;

    const table = await Table.findById(tableId);
    if (!table) {
      return NextResponse.json({ error: "Table not found" }, { status: 404 });
    }

    const updateData = {
      customerName,
      peopleCount,
      isOccupied: true,
      orderId,
      paymentStatus,
    };

    if (!table.isOccupied) {
      updateData.assignedAt = new Date();
    }

    const updatedTable = await Table.findByIdAndUpdate(tableId, updateData, {
      new: true,
    });

    return NextResponse.json(updatedTable, { status: 200 });
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

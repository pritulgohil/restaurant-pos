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
    } catch (err) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    // --- Params ---
    const { tableId } = await params;

    // --- Update table (unassign) ---
    const updatedTable = await Table.findByIdAndUpdate(
      tableId,
      {
        customerName: "",
        peopleCount: 0,
        isOccupied: false,
        orderId: null,
        paymentStatus: false,
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

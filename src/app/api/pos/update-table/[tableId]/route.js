import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Table from "@/models/table";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

// export async function PATCH(req, { params }) {
//   try {
//     await dbConnect();

//     // --- Auth check ---
//     const authHeader = req.headers.get("authorization");
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const token = authHeader.split(" ")[1];
//     let decoded;
//     try {
//       decoded = jwt.verify(token, JWT_SECRET);
//     } catch (err) {
//       return NextResponse.json(
//         { error: "Invalid or expired token" },
//         { status: 401 }
//       );
//     }

//     // --- Params ---
//     const { tableId } = await params;

//     // --- Body ---
//     const body = await req.json();
//     const { customerName, peopleCount, orderId, paymentStatus, assignedAt } =
//       body;

//     const updatedTable = await Table.findByIdAndUpdate(
//       tableId,
//       {
//         customerName,
//         peopleCount,
//         isOccupied: true,
//         orderId,
//         paymentStatus,
//         assignedAt,
//       },
//       { new: true }
//     );

//     if (!updatedTable) {
//       return NextResponse.json({ error: "Table not found" }, { status: 404 });
//     }

//     return NextResponse.json(updatedTable, { status: 200 });
//   } catch (error) {
//     console.error("Server Error:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

export async function PATCH(req, { params }) {
  try {
    await dbConnect();

    // --- Auth check ---
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

    const { tableId } = await params;
    const body = await req.json();
    const { customerName, peopleCount, orderId, paymentStatus } = body;

    // 🔹 1. Get existing table
    const table = await Table.findById(tableId);
    if (!table) {
      return NextResponse.json({ error: "Table not found" }, { status: 404 });
    }

    // 🔹 2. Prepare update object
    const updateData = {
      customerName,
      peopleCount,
      isOccupied: true,
      orderId,
      paymentStatus,
    };

    // 🔹 3. Set assignedAt ONLY once
    if (!table.isOccupied) {
      updateData.assignedAt = new Date();
    }

    // 🔹 4. Update table
    const updatedTable = await Table.findByIdAndUpdate(tableId, updateData, {
      new: true,
    });

    return NextResponse.json(updatedTable, { status: 200 });
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/order";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const JWT_SECRET = process.env.JWT_SECRET;

export async function GET(req, { params }) {
  try {
    await dbConnect();

    // ============================
    // Authorization
    // ============================
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

    // ============================
    // Validate restaurantId
    // ============================
    const { restaurantId } = await params;
    if (!restaurantId) {
      return NextResponse.json(
        { error: "Restaurant ID is required" },
        { status: 400 }
      );
    }

    const restaurantObjectId = new mongoose.Types.ObjectId(restaurantId);

    // ============================
    // Dates: Today & Yesterday
    // ============================
    const now = new Date();

    // Today
    const todayStartLocal = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      0,
      0,
      0,
      0
    );
    const todayEndLocal = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      23,
      59,
      59,
      999
    );

    // Yesterday
    const yesterdayDate = new Date(now);
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const yesterdayStartLocal = new Date(
      yesterdayDate.getFullYear(),
      yesterdayDate.getMonth(),
      yesterdayDate.getDate(),
      0,
      0,
      0,
      0
    );
    const yesterdayEndLocal = new Date(
      yesterdayDate.getFullYear(),
      yesterdayDate.getMonth(),
      yesterdayDate.getDate(),
      23,
      59,
      59,
      999
    );

    // Convert to UTC
    const todayStartUTC = new Date(
      todayStartLocal.getTime() - todayStartLocal.getTimezoneOffset() * 60000
    );
    const todayEndUTC = new Date(
      todayEndLocal.getTime() - todayEndLocal.getTimezoneOffset() * 60000
    );
    const yesterdayStartUTC = new Date(
      yesterdayStartLocal.getTime() -
        yesterdayStartLocal.getTimezoneOffset() * 60000
    );
    const yesterdayEndUTC = new Date(
      yesterdayEndLocal.getTime() -
        yesterdayEndLocal.getTimezoneOffset() * 60000
    );

    // ============================
    // Fetch orders
    // ============================
    const [todayOrders, yesterdayOrders] = await Promise.all([
      Order.find({
        restaurantId: restaurantObjectId,
        createdAt: { $gte: todayStartUTC, $lte: todayEndUTC },
      }),
      Order.find({
        restaurantId: restaurantObjectId,
        createdAt: { $gte: yesterdayStartUTC, $lte: yesterdayEndUTC },
      }),
    ]);

    // ============================
    // Compute totals
    // ============================
    const computeTotal = (orders) =>
      orders.reduce((sum, o) => sum + (o.totalPayable || 0), 0);

    const dashboardData = {
      orders: {
        today: {
          count: todayOrders.length,
          totalPayable: computeTotal(todayOrders),
        },
        yesterday: {
          count: yesterdayOrders.length,
          totalPayable: computeTotal(yesterdayOrders),
        },
      },
      summary: {
        percentageChange: (() => {
          const todayTotal = computeTotal(todayOrders);
          const yesterdayTotal = computeTotal(yesterdayOrders);
          if (yesterdayTotal > 0)
            return Number(
              (((todayTotal - yesterdayTotal) / yesterdayTotal) * 100).toFixed(
                2
              )
            );
          if (todayTotal > 0) return 100;
          return 0;
        })(),
      },
    };

    // ============================
    // Return organized response
    // ============================
    return NextResponse.json(dashboardData, { status: 200 });
  } catch (error) {
    console.error("Error fetching dashboard totals:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// import { NextResponse } from "next/server";
// import dbConnect from "@/lib/dbConnect";
// import Order from "@/models/order";
// import jwt from "jsonwebtoken";
// import mongoose from "mongoose";

// const JWT_SECRET = process.env.JWT_SECRET;

// export async function GET(req, { params }) {
//   try {
//     await dbConnect();

//     // 🔐 Authorization
//     const authHeader = req.headers.get("authorization");
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const token = authHeader.split(" ")[1];
//     try {
//       jwt.verify(token, JWT_SECRET);
//     } catch {
//       return NextResponse.json(
//         { error: "Invalid or expired token" },
//         { status: 401 }
//       );
//     }

//     // ✅ Validate & cast restaurantId
//     const { restaurantId } = params;
//     if (!restaurantId) {
//       return NextResponse.json(
//         { error: "Restaurant ID is required" },
//         { status: 400 }
//       );
//     }

//     const restaurantObjectId = new mongoose.Types.ObjectId(restaurantId);

//     // ============================
//     // Calculate last 15 days totals
//     // ============================
//     const today = new Date();
//     const totals = [];

//     for (let i = 0; i < 15; i++) {
//       const day = new Date();
//       day.setDate(today.getDate() - i);

//       // Start and end of day in local time
//       const startLocal = new Date(
//         day.getFullYear(),
//         day.getMonth(),
//         day.getDate(),
//         0,
//         0,
//         0,
//         0
//       );
//       const endLocal = new Date(
//         day.getFullYear(),
//         day.getMonth(),
//         day.getDate(),
//         23,
//         59,
//         59,
//         999
//       );

//       // Convert to UTC
//       const startUTC = new Date(
//         startLocal.getTime() - startLocal.getTimezoneOffset() * 60000
//       );
//       const endUTC = new Date(
//         endLocal.getTime() - endLocal.getTimezoneOffset() * 60000
//       );

//       // Fetch orders
//       const orders = await Order.find({
//         restaurantId: restaurantObjectId,
//         createdAt: { $gte: startUTC, $lte: endUTC },
//       });

//       // Sum totalPayable
//       const total = orders.reduce((sum, o) => sum + (o.totalPayable || 0), 0);

//       // Add to array
//       totals.push({
//         date: day.toISOString().split("T")[0], // YYYY-MM-DD
//         total,
//       });
//     }

//     // ============================
//     // Response
//     // ============================
//     return NextResponse.json({ last15Days: totals }, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching last 15 days totals:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

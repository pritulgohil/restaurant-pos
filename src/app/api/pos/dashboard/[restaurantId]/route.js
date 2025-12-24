// import { NextResponse } from "next/server";
// import dbConnect from "@/lib/dbConnect";
// import Order from "@/models/order";
// import Table from "@/models/table";
// import Dish from "@/models/dish";
// import Category from "@/models/category";
// import jwt from "jsonwebtoken";
// import mongoose from "mongoose";

// const JWT_SECRET = process.env.JWT_SECRET;

// export async function GET(req, { params }) {
//   try {
//     await dbConnect();

//     // ============================
//     // Authorization
//     // ============================
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

//     // ============================
//     // Validate restaurantId
//     // ============================
//     const { restaurantId } = await params;
//     if (!restaurantId) {
//       return NextResponse.json(
//         { error: "Restaurant ID is required" },
//         { status: 400 }
//       );
//     }

//     const restaurantObjectId = new mongoose.Types.ObjectId(restaurantId);

//     // ============================
//     // Dates: Today & Yesterday (LOCAL → UTC)
//     // ============================
//     const now = new Date();

//     const todayStartLocal = new Date(
//       now.getFullYear(),
//       now.getMonth(),
//       now.getDate(),
//       0,
//       0,
//       0,
//       0
//     );
//     const todayEndLocal = new Date(
//       now.getFullYear(),
//       now.getMonth(),
//       now.getDate(),
//       23,
//       59,
//       59,
//       999
//     );

//     const yesterdayDate = new Date(now);
//     yesterdayDate.setDate(yesterdayDate.getDate() - 1);

//     const yesterdayStartLocal = new Date(
//       yesterdayDate.getFullYear(),
//       yesterdayDate.getMonth(),
//       yesterdayDate.getDate(),
//       0,
//       0,
//       0,
//       0
//     );
//     const yesterdayEndLocal = new Date(
//       yesterdayDate.getFullYear(),
//       yesterdayDate.getMonth(),
//       yesterdayDate.getDate(),
//       23,
//       59,
//       59,
//       999
//     );

//     const toUTC = (date) =>
//       new Date(date.getTime() - date.getTimezoneOffset() * 60000);

//     const todayStartUTC = toUTC(todayStartLocal);
//     const todayEndUTC = toUTC(todayEndLocal);
//     const yesterdayStartUTC = toUTC(yesterdayStartLocal);
//     const yesterdayEndUTC = toUTC(yesterdayEndLocal);

//     // ============================
//     // Fetch orders
//     // ============================
//     const [todayOrders, yesterdayOrders] = await Promise.all([
//       Order.find({
//         restaurantId: restaurantObjectId,
//         createdAt: { $gte: todayStartUTC, $lte: todayEndUTC },
//       }),
//       Order.find({
//         restaurantId: restaurantObjectId,
//         createdAt: { $gte: yesterdayStartUTC, $lte: yesterdayEndUTC },
//       }),
//     ]);

//     // ============================
//     // Order status counts (NEW)
//     // ============================
//     const [queuedOrders, inProgressOrders] = await Promise.all([
//       Order.countDocuments({
//         restaurantId: restaurantObjectId,
//         status: "Queued",
//       }),
//       Order.countDocuments({
//         restaurantId: restaurantObjectId,
//         status: "In Progress",
//       }),
//     ]);

//     // ============================
//     // Fetch tables
//     // ============================
//     const tables = await Table.find({ restaurantId: restaurantObjectId });

//     // ============================
//     // Menu counts
//     // ============================
//     const [totalMenuItems, outOfStockItems, totalCategories] =
//       await Promise.all([
//         Dish.countDocuments({ restaurantId: restaurantObjectId }),
//         Dish.countDocuments({
//           restaurantId: restaurantObjectId,
//           available: false,
//         }),
//         Category.countDocuments({ restaurantId: restaurantObjectId }),
//       ]);

//     // ============================
//     // Helpers
//     // ============================
//     const computeTotal = (orders) =>
//       orders.reduce((sum, o) => sum + (o.totalPayable || 0), 0);

//     const todayTotal = computeTotal(todayOrders);
//     const yesterdayTotal = computeTotal(yesterdayOrders);

//     const totalItemsSoldToday = todayOrders.reduce(
//       (sum, o) => sum + (Number(o.totalItems) || 0),
//       0
//     );

//     // ============================
//     // Table occupancy
//     // ============================
//     const totalTables = tables.length;
//     const occupiedTables = tables.filter((t) => t.isOccupied).length;

//     const totalCapacity = tables.reduce(
//       (sum, t) => sum + (t.occupancy || 0),
//       0
//     );

//     const currentPeople = tables.reduce(
//       (sum, t) => sum + (t.peopleCount || 0),
//       0
//     );

//     const occupancyPercentage =
//       totalCapacity > 0
//         ? Number(((currentPeople / totalCapacity) * 100).toFixed(2))
//         : 0;

//     // ============================
//     // Last 20 days sales
//     // ============================
//     const days = 20;
//     const startDateLocal = new Date(
//       now.getFullYear(),
//       now.getMonth(),
//       now.getDate() - (days - 1),
//       0,
//       0,
//       0,
//       0
//     );
//     const startDateUTC = toUTC(startDateLocal);

//     const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";

//     const agg = await Order.aggregate([
//       {
//         $match: {
//           restaurantId: restaurantObjectId,
//           createdAt: { $gte: startDateUTC, $lte: todayEndUTC },
//         },
//       },
//       {
//         $group: {
//           _id: {
//             $dateToString: {
//               format: "%Y-%m-%d",
//               date: "$createdAt",
//               timezone: timeZone,
//             },
//           },
//           total: { $sum: { $ifNull: ["$totalPayable", 0] } },
//         },
//       },
//       { $project: { date: "$_id", total: 1, _id: 0 } },
//     ]);

//     const totalsMap = agg.reduce((m, d) => {
//       m[d.date] = d.total;
//       return m;
//     }, {});

//     const last20Days = [];
//     let last20Total = 0;

//     for (let i = 0; i < days; i++) {
//       const d = new Date(startDateLocal);
//       d.setDate(d.getDate() + i);

//       const dateStr = new Intl.DateTimeFormat("en-CA", {
//         timeZone,
//         year: "numeric",
//         month: "2-digit",
//         day: "2-digit",
//       }).format(d);

//       const total = totalsMap[dateStr] || 0;
//       last20Days.push({ date: dateStr, total });
//       last20Total += total;
//     }

//     // ============================
//     // Final response
//     // ============================
//     return NextResponse.json(
//       {
//         orders: {
//           today: {
//             count: todayOrders.length,
//             totalPayable: todayTotal,
//             totalItemsSold: totalItemsSoldToday,
//           },
//           yesterday: {
//             count: yesterdayOrders.length,
//             totalPayable: yesterdayTotal,
//           },
//           status: {
//             queued: queuedOrders,
//             inProgress: inProgressOrders,
//           },
//           last20Days: {
//             perDay: last20Days,
//             totalAmount: last20Total,
//           },
//         },
//         summary: {
//           percentageChange:
//             yesterdayTotal > 0
//               ? Number(
//                   (
//                     ((todayTotal - yesterdayTotal) / yesterdayTotal) *
//                     100
//                   ).toFixed(2)
//                 )
//               : todayTotal > 0
//               ? 100
//               : 0,
//         },
//         tables: {
//           totalTables,
//           occupiedTables,
//           totalCapacity,
//           currentPeople,
//           occupancyPercentage,
//         },
//         menu: {
//           totalMenuItems,
//           outOfStockItems,
//           totalCategories,
//         },
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error fetching dashboard totals:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/order";
import Table from "@/models/table";
import Dish from "@/models/dish";
import Category from "@/models/category";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const JWT_SECRET = process.env.JWT_SECRET;
const TIME_ZONE = "America/Toronto"; // London, Ontario timezone

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
    const { restaurantId } = params;
    if (!restaurantId) {
      return NextResponse.json(
        { error: "Restaurant ID is required" },
        { status: 400 }
      );
    }

    const restaurantObjectId = new mongoose.Types.ObjectId(restaurantId);

    // ============================
    // Dates: Today & Yesterday (LOCAL TZ)
    // ============================
    const todayStr = new Intl.DateTimeFormat("en-CA", {
      timeZone: TIME_ZONE,
    }).format(new Date());

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = new Intl.DateTimeFormat("en-CA", {
      timeZone: TIME_ZONE,
    }).format(yesterday);

    // ============================
    // Fetch today and yesterday orders
    // ============================
    const [todayOrders, yesterdayOrders] = await Promise.all([
      Order.aggregate([
        { $match: { restaurantId: restaurantObjectId } },
        {
          $addFields: {
            localDate: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$createdAt",
                timezone: TIME_ZONE,
              },
            },
          },
        },
        { $match: { localDate: todayStr } },
      ]),
      Order.aggregate([
        { $match: { restaurantId: restaurantObjectId } },
        {
          $addFields: {
            localDate: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$createdAt",
                timezone: TIME_ZONE,
              },
            },
          },
        },
        { $match: { localDate: yesterdayStr } },
      ]),
    ]);

    // ============================
    // Order status counts
    // ============================
    const [queuedOrders, inProgressOrders] = await Promise.all([
      Order.countDocuments({
        restaurantId: restaurantObjectId,
        status: "Queued",
      }),
      Order.countDocuments({
        restaurantId: restaurantObjectId,
        status: "In Progress",
      }),
    ]);

    // ============================
    // Fetch tables
    // ============================
    const tables = await Table.find({ restaurantId: restaurantObjectId });

    // ============================
    // Menu counts
    // ============================
    const [totalMenuItems, outOfStockItems, totalCategories] =
      await Promise.all([
        Dish.countDocuments({ restaurantId: restaurantObjectId }),
        Dish.countDocuments({
          restaurantId: restaurantObjectId,
          available: false,
        }),
        Category.countDocuments({ restaurantId: restaurantObjectId }),
      ]);

    // ============================
    // Compute totals
    // ============================
    const computeTotal = (orders) =>
      orders.reduce((sum, o) => sum + (o.totalPayable || 0), 0);

    const todayTotal = computeTotal(todayOrders);
    const yesterdayTotal = computeTotal(yesterdayOrders);

    const totalItemsSoldToday = todayOrders.reduce(
      (sum, o) => sum + (Number(o.totalItems) || 0),
      0
    );

    // ============================
    // Table occupancy
    // ============================
    const totalTables = tables.length;
    const occupiedTables = tables.filter((t) => t.isOccupied).length;
    const totalCapacity = tables.reduce(
      (sum, t) => sum + (t.occupancy || 0),
      0
    );
    const currentPeople = tables.reduce(
      (sum, t) => sum + (t.peopleCount || 0),
      0
    );
    const occupancyPercentage =
      totalCapacity > 0
        ? Number(((currentPeople / totalCapacity) * 100).toFixed(2))
        : 0;

    // ============================
    // Last 20 days sales
    // ============================
    const days = 20;
    const now = new Date();
    const startDateLocal = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - (days - 1)
    );
    const agg = await Order.aggregate([
      {
        $match: {
          restaurantId: restaurantObjectId,
          createdAt: { $gte: startDateLocal },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
              timezone: TIME_ZONE,
            },
          },
          total: { $sum: { $ifNull: ["$totalPayable", 0] } },
        },
      },
      { $project: { date: "$_id", total: 1, _id: 0 } },
    ]);

    const totalsMap = agg.reduce((m, d) => {
      m[d.date] = d.total;
      return m;
    }, {});
    const last20Days = [];
    let last20Total = 0;

    for (let i = 0; i < days; i++) {
      const d = new Date(startDateLocal);
      d.setDate(d.getDate() + i);
      const dateStr = new Intl.DateTimeFormat("en-CA", {
        timeZone: TIME_ZONE,
      }).format(d);
      const total = totalsMap[dateStr] || 0;
      last20Days.push({ date: dateStr, total });
      last20Total += total;
    }

    // ============================
    // Response
    // ============================
    return NextResponse.json(
      {
        orders: {
          today: {
            count: todayOrders.length,
            totalPayable: todayTotal,
            totalItemsSold: totalItemsSoldToday,
          },
          yesterday: {
            count: yesterdayOrders.length,
            totalPayable: yesterdayTotal,
          },
          status: {
            queued: queuedOrders,
            inProgress: inProgressOrders,
          },
          last20Days: {
            perDay: last20Days,
            totalAmount: last20Total,
          },
        },
        summary: {
          percentageChange:
            yesterdayTotal > 0
              ? Number(
                  (
                    ((todayTotal - yesterdayTotal) / yesterdayTotal) *
                    100
                  ).toFixed(2)
                )
              : todayTotal > 0
              ? 100
              : 0,
        },
        tables: {
          totalTables,
          occupiedTables,
          totalCapacity,
          currentPeople,
          occupancyPercentage,
        },
        menu: {
          totalMenuItems,
          outOfStockItems,
          totalCategories,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching dashboard totals:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

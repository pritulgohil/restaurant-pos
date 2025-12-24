// "use client";

// import React, { useEffect, useState } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import CustomTooltip from "@/app/components/Pos/Dashboard/CustomToolTip";
// import styles from "./DashboardChart.module.css";

// const DashboardChart = ({ data }) => {
//   const [salesData, setSalesData] = useState([]);

//   useEffect(() => {
//     if (!data?.orders?.last20Days?.perDay?.length) return;

//     const chartData = data.orders.last20Days.perDay
//       .sort((a, b) => new Date(a.date) - new Date(b.date)) // oldest first
//       .map((item) => {
//         const dateObj = new Date(item.date);
//         const formattedDate = dateObj.toLocaleDateString("en-US", {
//           month: "short",
//           day: "numeric",
//           timeZone: "UTC",
//         });
//         return {
//           name: formattedDate,
//           sales: Number(item.total.toFixed(2)),
//         };
//       });

//     console.log("Chart Data:", chartData); // debug
//     setSalesData(chartData);
//   }, [data]);

//   return (
//     <div className="w-full mt-6 h-[320px]">
//       <div className={styles.chartHeader}>Sales Performance</div>
//       <ResponsiveContainer width="100%" height="100%" className="mt-4">
//         <BarChart data={salesData}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="name" tick={{ fontSize: 12 }} />
//           <Tooltip content={<CustomTooltip />} />
//           <Bar dataKey="sales" radius={[8, 8, 0, 0]} fill="#2563eb" />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default DashboardChart;

"use client";

import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import CustomTooltip from "@/app/components/Pos/Dashboard/CustomToolTip";
import styles from "./DashboardChart.module.css";

const DashboardChart = ({ data }) => {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    console.log("==== DASHBOARD CHART DEBUG ====");
    console.log("Browser time:", new Date().toString());
    console.log(
      "Browser timezone:",
      Intl.DateTimeFormat().resolvedOptions().timeZone
    );

    if (!data?.orders?.last20Days?.perDay?.length) {
      console.log("No chart data available");
      return;
    }

    console.log(
      "Raw backend dates:",
      data.orders.last20Days.perDay.map((d) => d.date)
    );

    const chartData = data.orders.last20Days.perDay
      // IMPORTANT: string sort (date-only safe)
      .sort((a, b) => a.date.localeCompare(b.date))
      .map((item) => {
        const [year, month, day] = item.date.split("-");

        // IMPORTANT: local date construction (NO UTC)
        const localDate = new Date(
          Number(year),
          Number(month) - 1,
          Number(day)
        );

        console.log("Parsed date:", {
          original: item.date,
          parsed: localDate.toString(),
        });

        const formattedDate = localDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });

        return {
          name: formattedDate,
          sales: Number(item.total.toFixed(2)),
        };
      });

    console.log("Final chart data:", chartData);
    console.log("==== END DASHBOARD CHART DEBUG ====");

    setSalesData(chartData);
  }, [data]);

  return (
    <div className="w-full mt-6 h-[320px]">
      <div className={styles.chartHeader}>Sales Performance</div>

      <ResponsiveContainer width="100%" height="100%" className="mt-4">
        <BarChart data={salesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="sales" radius={[8, 8, 0, 0]} fill="#2563eb" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardChart;

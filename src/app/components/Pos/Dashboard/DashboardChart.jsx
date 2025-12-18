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
    if (!data?.orders?.last20Days?.perDay?.length) return;

    const chartData = data.orders.last20Days.perDay
      .sort((a, b) => new Date(a.date) - new Date(b.date)) // oldest first
      .map((item) => {
        const dateObj = new Date(item.date);
        const formattedDate = dateObj.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          timeZone: "UTC",
        });
        return {
          name: formattedDate,
          sales: Number(item.total.toFixed(2)),
        };
      });

    console.log("Chart Data:", chartData); // debug
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

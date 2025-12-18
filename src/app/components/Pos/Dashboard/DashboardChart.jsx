"use client";

import React from "react";
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

const DashboardChart = () => {
  // Generate last 20 days dynamically
  const salesData = Array.from({ length: 20 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i); // today - i days

    const options = { month: "short", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options); // e.g., "Dec 18"

    return {
      name: formattedDate,
      sales: Math.floor(Math.random() * 10000), // replace with actual sales later
    };
  }).reverse(); // reverse so oldest date is first

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

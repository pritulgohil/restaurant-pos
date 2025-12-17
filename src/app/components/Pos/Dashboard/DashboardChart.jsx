"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  YAxis,
} from "recharts";
import CustomTooltip from "@/app/components/Pos/Dashboard/CustomToolTip";
import styles from "./DashboardChart.module.css";

const DashboardChart = () => {
  const salesData = [
    { name: "Dec 15", sales: 2400 },
    { name: "Dec 14", sales: 1398 },
    { name: "Dec 13", sales: 9800 },
    { name: "Dec 12", sales: 3908 },
    { name: "Dec 11", sales: 4800 },
    { name: "Dec 10", sales: 3800 },
    { name: "Dec 9", sales: 4300 },
    { name: "Dec 8", sales: 5400 },
    { name: "Dec 7", sales: 3200 },
    { name: "Dec 6", sales: 2100 },
    { name: "Dec 5", sales: 4500 },
    { name: "Dec 4", sales: 6700 },
    { name: "Dec 3", sales: 8900 },
    { name: "Dec 2", sales: 1200 },
    { name: "Dec 1", sales: 3400 },
    { name: "Nov 30", sales: 2300 },
    { name: "Nov 29", sales: 5400 },
    { name: "Nov 28", sales: 3200 },
    { name: "Nov 27", sales: 4300 },
    { name: "Nov 26", sales: 2100 },
  ];
  return (
    <>
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
    </>
  );
};

export default DashboardChart;

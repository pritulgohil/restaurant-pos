"use client";

import React from "react";
import styles from "./DashboardTop.module.css";
import { DollarSign, List, Users, Armchair } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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

const DashboardTop = () => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;

    return (
      <div className="rounded-l border bg-background px-4 py-2 shadow-md">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-sm text-muted-foreground">
          Sales:{" "}
          <span className="font-semibold text-foreground">
            ${payload[0].value}
          </span>
        </p>
      </div>
    );
  };
  return (
    <div className={styles.mainContainer}>
      <div className={styles.welcomeContainer}>
        <div className={styles.header}>
          <h2>Dashboard</h2>
        </div>
        <div className={styles.welcomeUserContainer}>Hi, Pritul!</div>
      </div>

      <div className={styles.overviewCardsContainer}>
        <div className={styles.overviewCard}>
          <div className={styles.cardHeaderContainer}>
            <div className={styles.cardIcon}>
              <DollarSign />
            </div>
            <div className={styles.cardHeader}>Today's Sales</div>
          </div>
          <div className={styles.cardData}>$3,450</div>
        </div>

        <div className={styles.overviewCard}>
          <div className={styles.cardHeaderContainer}>
            <div className={styles.cardIcon}>
              <List />
            </div>
            <div className={styles.cardHeader}>Total Orders</div>
          </div>
          <div className={styles.cardData}>52</div>
        </div>

        <div className={styles.overviewCard}>
          <div className={styles.cardHeaderContainer}>
            <div className={styles.cardIcon}>
              <Users />
            </div>
            <div className={styles.cardHeader}>Live Diners</div>
          </div>
          <div className={styles.cardData}>34 Pax</div>
        </div>

        <div className={styles.overviewCard}>
          <div className={styles.cardHeaderContainer}>
            <div className={styles.cardIcon}>
              <Armchair />
            </div>
            <div className={styles.cardHeader}>Open Tables</div>
          </div>
          <div className={styles.cardData}>3/15</div>
        </div>
      </div>

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
    </div>
  );
};

export default DashboardTop;

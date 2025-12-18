"use client"; // important for client-side React

import React, { useState, useEffect } from "react";
import DashboardTop from "@/app/components/Pos/Dashboard/DashboardTop";
import DashboardChart from "@/app/components/Pos/Dashboard/DashboardChart";
import DashboardBottom from "@/app/components/Pos/Dashboard/DashboardBottom";
import styles from "./page.module.css";
import { useRestaurantContext } from "@/context/RestaurantContext";

const Page = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const { restaurant } = useRestaurantContext();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/pos/dashboard/${restaurant}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }

        const data = await res.json();
        setDashboardData(data);
      } catch (err) {
        console.error("Failed to fetch dashboard:", err);
        setError(err.message);
      } finally {
      }
    };

    fetchDashboard();
  }, []);

  console.log("Dashboard Data:", dashboardData);

  return (
    <div className={styles.mainContainer}>
      <DashboardTop data={dashboardData} />
      <DashboardChart data={dashboardData} />
      <DashboardBottom data={dashboardData} />
    </div>
  );
};

export default Page;

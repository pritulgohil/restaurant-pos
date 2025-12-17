import React from "react";
import DashboardTop from "@/app/components/Pos/Dashboard/DashboardTop";
import DashboardChart from "@/app/components/Pos/Dashboard/DashboardChart";
import styles from "./page.module.css";

const page = () => {
  return (
    <>
      <div className={styles.mainContainer}>
        <DashboardTop />
        <DashboardChart />
      </div>
    </>
  );
};

export default page;

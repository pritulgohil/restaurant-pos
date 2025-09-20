import React from "react";
import styles from "./page.module.css";
import ManageOrders from "@/app/components/Pos/ManageOrders/ManageOrders";

const page = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.topContainer}>
        <div className={styles.header}>
          <h2>Manage Orders</h2>
        </div>
      </div>
      <div className={styles.bottomContainer}>
        <ManageOrders />
      </div>
    </div>
  );
};

export default page;

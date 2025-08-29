import React from "react";
import styles from "./page.module.css";
import { OrderBoard } from "@/app/components/Pos/OrderBoard/OrderBoard";

const page = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.topContainer}>
        <div className={styles.header}>
          <h2>Order Board</h2>
        </div>
      </div>
      <div className={styles.bottomContainer}>
        <OrderBoard />
      </div>
    </div>
  );
};

export default page;

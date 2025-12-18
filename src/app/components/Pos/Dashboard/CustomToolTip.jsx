import React from "react";
import styles from "./CustomToolTip.module.css";

const CustomToolTip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  const value = payload[0].value;
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);

  return (
    <div className={`${styles.mainContainer} shadow-md`}>
      <p className={styles.text}>{label}</p>
      <div className={styles.dataContainer}>
        <div className={styles.iconLabel}>
          <div className={styles.dataIcon}></div>
          <p className={styles.text}>Sales</p>
        </div>
        <p className={styles.text}>{formatted}</p>
      </div>
    </div>
  );
};

export default CustomToolTip;

import React from "react";
import styles from "./CustomToolTip.module.css";

const CustomToolTip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  return (
    <div className={`${styles.mainContainer} shadow-md`}>
      <p className={styles.text}>{label}</p>
      <div className={styles.dataContainer}>
        <div className={styles.iconLabel}>
          <div className={styles.dataIcon}></div>
          <p className={styles.text}>Sales</p>
        </div>
        <p className={styles.text}>${payload[0].value}</p>
      </div>
    </div>
  );
};

export default CustomToolTip;

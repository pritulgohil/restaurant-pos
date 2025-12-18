import React from "react";
import styles from "./PieChartToolTip.module.css";

const PieChartToolTip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;

  const { name, value, fill } = payload[0].payload;

  return (
    <div className={`${styles.mainContainer} shadow-md`}>
      <div className={styles.dataContainer}>
        <div className={styles.iconLabel}>
          <div className={styles.dataIcon} style={{ backgroundColor: fill }} />
          <p className={styles.text}>{name}</p>
        </div>
        <p className={styles.text}>{value} orders</p>
      </div>
    </div>
  );
};

export default PieChartToolTip;

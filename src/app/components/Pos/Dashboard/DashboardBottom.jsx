import React from "react";
import styles from "./DashboardBottom.module.css";
import { ChartBarStacked } from "lucide-react";
import ActiveOrdersPieChart from "./ActiveOrdersPieChart";

const DashboardBottom = () => {
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.leftSideContainer}>
          <div className={styles.sectionHeader}>Menu Overview</div>
          <div className={styles.cardsContainer}>
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <ChartBarStacked size={24} />
              </div>
              <div className={styles.cardDetails}>
                <div className={styles.cardTitle}>Total Items</div>
                <div className={styles.cardData}>120</div>
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <ChartBarStacked size={24} />
              </div>
              <div className={styles.cardDetails}>
                <div className={styles.cardTitle}>Total Items</div>
                <div className={styles.cardData}>120</div>
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <ChartBarStacked size={24} />
              </div>
              <div className={styles.cardDetails}>
                <div className={styles.cardTitle}>Total Items</div>
                <div className={styles.cardData}>120</div>
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <ChartBarStacked size={24} />
              </div>
              <div className={styles.cardDetails}>
                <div className={styles.cardTitle}>Total Items</div>
                <div className={styles.cardData}>120</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.rightSideContainer}>
          <div className={styles.sectionHeader}>Active Orders</div>
          <div className={styles.pieChartContainer}>
            <ActiveOrdersPieChart />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardBottom;

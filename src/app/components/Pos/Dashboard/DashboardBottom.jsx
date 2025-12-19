import React from "react";
import styles from "./DashboardBottom.module.css";
import { Utensils, SquareMenu, Tag, Ban } from "lucide-react";
import ActiveOrdersPieChart from "./ActiveOrdersPieChart";

const DashboardBottom = ({ data }) => {
  const totalItemsSold = data?.orders?.today?.totalItemsSold || 0;
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.leftSideContainer}>
          <div className={styles.sectionHeader}>Menu Overview</div>
          <div className={styles.cardsContainer}>
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <Utensils size={24} className="text-green-500" />
              </div>
              <div className={styles.cardDetails}>
                <div className={styles.cardTitle}>Items Sold Today</div>
                <div className={styles.cardData}>{totalItemsSold}</div>
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <SquareMenu size={24} className="text-blue-500" />
              </div>
              <div className={styles.cardDetails}>
                <div className={styles.cardTitle}>Total Menu Items</div>
                <div className={styles.cardData}>
                  {data?.menu?.totalMenuItems}
                </div>
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <Tag size={24} className="text-amber-500" />
              </div>
              <div className={styles.cardDetails}>
                <div className={styles.cardTitle}>Total Categories</div>
                <div className={styles.cardData}>
                  {data?.menu?.totalCategories}
                </div>
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <Ban size={24} className="text-red-500" />
              </div>
              <div className={styles.cardDetails}>
                <div className={styles.cardTitle}>Out of Stock Items</div>
                <div className={styles.cardData}>
                  {data?.menu?.outOfStockItems}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.rightSideContainer}>
          <div className={styles.sectionHeader}>Active Orders</div>
          <div className={styles.pieChartContainer}>
            <ActiveOrdersPieChart dashboardData={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardBottom;

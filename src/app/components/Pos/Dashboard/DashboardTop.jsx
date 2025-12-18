import React from "react";
import styles from "./DashboardTop.module.css";
import {
  DollarSign,
  List,
  Users,
  Armchair,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

const DashboardTop = ({ data }) => {
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
          <div className={styles.cardData}>
            ${data?.orders.today.totalPayable || 0}
          </div>
          <div className={styles.comparison}>
            {data?.summary?.percentageChange >= 0 ? (
              <>
                <span className="text-green-600">
                  +{data.summary.percentageChange}%
                </span>
                <span> vs yesterday</span>
                <TrendingUp size={18} className="text-green-600" />
              </>
            ) : (
              <>
                <span className="text-red-600">
                  {data?.summary.percentageChange || 0}%
                </span>
                <span> vs yesterday</span>
                <TrendingDown size={18} className="text-red-600" />
              </>
            )}
          </div>
        </div>

        <div className={styles.overviewCard}>
          <div className={styles.cardHeaderContainer}>
            <div className={styles.cardIcon}>
              <List />
            </div>
            <div className={styles.cardHeader}>Total Orders</div>
          </div>

          {/* Today's total orders */}
          <div className={styles.cardData}>
            {data?.orders?.today?.count || 0}
          </div>

          {/* Comparison vs yesterday */}
          <div className={styles.comparison}>
            {data?.orders?.today?.count >= data?.orders?.yesterday?.count ? (
              <>
                <span className="text-green-600">
                  +{data.orders.today.count - data.orders.yesterday.count}
                </span>
                <span> vs yesterday</span>
                <TrendingUp size={18} className="text-green-600" />
              </>
            ) : (
              <>
                <span className="text-red-600">
                  -
                  {data?.orders.today.count ||
                    0 - data?.orders.yesterday.count ||
                    0}
                </span>
                <span> vs yesterday</span>
                <TrendingDown size={18} className="text-red-600" />
              </>
            )}
          </div>
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
    </div>
  );
};

export default DashboardTop;

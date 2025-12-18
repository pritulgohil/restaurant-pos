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
  const availableTables =
    data?.tables?.totalTables - data?.tables?.occupiedTables || 0;
  const occupancyPercentage = data?.tables?.occupancyPercentage || 0;
  return (
    <div className={styles.mainContainer}>
      <div className={styles.welcomeContainer}>
        <div className={styles.header}>
          <h2>Dashboard</h2>
        </div>
        <div className={styles.welcomeUserContainer}>Hi, Pritul!</div>
      </div>

      <div className={styles.overviewCardsContainer}>
        <div className={`${styles.overviewCard} shadow-sm`}>
          <div className={styles.cardHeaderContainer}>
            <div className={styles.cardIcon}>
              <DollarSign />
            </div>
            <div className={styles.cardHeader}>Today's Sales</div>
          </div>
          <div className={styles.cardData}>
            ${data?.orders.today.totalPayable?.toFixed(2) || "0.00"}
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

        <div className={`${styles.overviewCard} shadow-sm`}>
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

        <div className={`${styles.overviewCard} shadow-sm`}>
          <div className={styles.cardHeaderContainer}>
            <div className={styles.cardIcon}>
              <Users />
            </div>
            <div className={styles.cardHeader}>Live Diners</div>
          </div>
          <div className={styles.cardData}>
            {data?.tables?.currentPeople || 0} Pax
          </div>
          <div className={styles.comparison}>
            <div className={styles.indicatorWrapper}>
              {/* Outer ping ring */}
              <span
                className={`animate-ping ${styles.ping} ${
                  occupancyPercentage <= 33
                    ? "border-blue-500"
                    : occupancyPercentage <= 66
                    ? "border-amber-500"
                    : "border-red-500"
                }`}
              ></span>
              {/* Inner solid dot */}
              <span
                className={`${
                  occupancyPercentage <= 33
                    ? "bg-blue-500"
                    : occupancyPercentage <= 66
                    ? "bg-amber-500"
                    : "bg-red-500"
                } ${styles.dot}`}
              ></span>
            </div>
            Currently at{" "}
            <span
              className={`${
                occupancyPercentage <= 33
                  ? "text-blue-500"
                  : occupancyPercentage <= 66
                  ? "text-amber-500"
                  : "text-red-500"
              }`}
            >
              {occupancyPercentage}%
            </span>{" "}
            capacity{" "}
          </div>
        </div>

        <div className={`${styles.overviewCard} shadow-sm`}>
          <div className={styles.cardHeaderContainer}>
            <div className={styles.cardIcon}>
              <Armchair />
            </div>
            <div className={styles.cardHeader}>Open Tables</div>
          </div>
          <div className={styles.cardData}>
            {data?.tables?.occupiedTables || 0}/{data?.tables?.totalTables || 0}
          </div>
          <div className={styles.comparison}>
            {availableTables > 0
              ? `${availableTables} table${
                  availableTables > 1 ? "s" : ""
                } available now`
              : "No tables available"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTop;

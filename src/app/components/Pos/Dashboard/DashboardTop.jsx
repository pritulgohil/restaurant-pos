import React from "react";
import styles from "./DashboardTop.module.css";
import {
  DollarSign,
  List,
  Users,
  Armchair,
  TrendingUp,
  TrendingDown,
  Ban,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthContext } from "@/context/AuthContext";

const DashboardTop = ({ data }) => {
  const availableTables =
    data?.tables?.totalTables - data?.tables?.occupiedTables || 0;
  const occupancyPercentage = data?.tables?.occupancyPercentage || 0;
  const { user } = useAuthContext();
  return (
    <div className={styles.mainContainer}>
      <div className={styles.welcomeContainer}>
        <div className={styles.header}>
          <h2>Dashboard</h2>
        </div>
        <div className={styles.welcomeUserContainer}>
          {data ? (
            `Hi, ${user?.firstname}!`
          ) : (
            <Skeleton className="w-52 h-9 inline-block" />
          )}
        </div>
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
            {data ? (
              `$${Number(data?.orders?.today?.totalPayable || 0).toFixed(2)}`
            ) : (
              <Skeleton className="w-full h-9 inline-block" />
            )}
          </div>

          <div className={styles.comparison}>
            {data ? (
              (() => {
                const value = Number(data?.summary?.percentageChange || 0);
                const isPositive = value >= 0;

                return (
                  <>
                    <span
                      className={isPositive ? "text-green-600" : "text-red-600"}
                    >
                      {isPositive ? "+" : ""}
                      {value.toFixed(2)}%
                    </span>
                    <span> vs yesterday</span>
                    {isPositive ? (
                      <TrendingUp size={18} className="text-green-600" />
                    ) : (
                      <TrendingDown size={18} className="text-red-600" />
                    )}
                  </>
                );
              })()
            ) : (
              <Skeleton className="w-40 h-5 inline-block" />
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
            {data ? (
              data.orders?.today?.count ?? 0
            ) : (
              <Skeleton className="w-full h-9 inline-block" />
            )}
          </div>

          {/* Comparison vs yesterday */}
          <div className={styles.comparison}>
            {data ? (
              (() => {
                const today = data.orders?.today?.count ?? 0;
                const yesterday = data.orders?.yesterday?.count ?? 0;
                const diff = today - yesterday;

                return diff >= 0 ? (
                  <>
                    <span className="text-green-600">+{diff}</span>
                    <span> vs yesterday</span>
                    <TrendingUp size={18} className="text-green-600" />
                  </>
                ) : (
                  <>
                    <span className="text-red-600">{diff}</span>
                    <span> vs yesterday</span>
                    <TrendingDown size={18} className="text-red-600" />
                  </>
                );
              })()
            ) : (
              <Skeleton className="w-40 h-5 inline-block" />
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
            {data ? (
              <>{data.tables?.currentPeople ?? 0} Pax</>
            ) : (
              <Skeleton className="w-full h-9 inline-block" />
            )}
          </div>

          <div className={styles.comparison}>
            {data ? (
              <>
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
                  />

                  {/* Inner solid dot */}
                  <span
                    className={`${styles.dot} ${
                      occupancyPercentage <= 33
                        ? "bg-blue-500"
                        : occupancyPercentage <= 66
                        ? "bg-amber-500"
                        : "bg-red-500"
                    }`}
                  />
                </div>
                Currently at{" "}
                <span
                  className={
                    occupancyPercentage <= 33
                      ? "text-blue-500"
                      : occupancyPercentage <= 66
                      ? "text-amber-500"
                      : "text-red-500"
                  }
                >
                  {occupancyPercentage}%
                </span>{" "}
                capacity
              </>
            ) : (
              <Skeleton className="w-48 h-5 inline-block" />
            )}
          </div>
        </div>

        <div className={`${styles.overviewCard} shadow-sm`}>
          <div className={styles.cardHeaderContainer}>
            <div className={styles.cardIcon}>
              <Armchair />
            </div>
            <div className={styles.cardHeader}>Occupied Tables</div>
          </div>
          <div className={styles.cardData}>
            {data ? (
              <>
                {data?.tables?.occupiedTables || 0}/
                {data?.tables?.totalTables || 0}
              </>
            ) : (
              <Skeleton className="w-full h-9 inline-block" />
            )}
          </div>
          <div className={styles.comparison}>
            {data ? (
              availableTables > 0 ? (
                `${availableTables} table${
                  availableTables > 1 ? "s" : ""
                } available now`
              ) : (
                <>
                  <div className={styles.stop}></div>
                  No tables available
                </>
              )
            ) : (
              <Skeleton className="w-40 h-5 inline-block" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTop;

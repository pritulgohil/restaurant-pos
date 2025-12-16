import React from "react";
import styles from "./DashboardTop.module.css";
import { DollarSign } from "lucide-react";

const DashboardTop = () => {
  return (
    <>
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
            <div className={styles.cardData}>$3,450</div>
          </div>
          <div className={styles.overviewCard}>
            <div className={styles.cardHeaderContainer}>
              <div className={styles.cardIcon}>
                <DollarSign />
              </div>
              <div className={styles.cardHeader}>Today's Sales</div>
            </div>
            <div className={styles.cardData}>$3,450</div>
          </div>
          <div className={styles.overviewCard}>
            <div className={styles.cardHeaderContainer}>
              <div className={styles.cardIcon}>
                <DollarSign />
              </div>
              <div className={styles.cardHeader}>Today's Sales</div>
            </div>
            <div className={styles.cardData}>$3,450</div>
          </div>
          <div className={styles.overviewCard}>
            <div className={styles.cardHeaderContainer}>
              <div className={styles.cardIcon}>
                <DollarSign />
              </div>
              <div className={styles.cardHeader}>Today's Sales</div>
            </div>
            <div className={styles.cardData}>$3,450</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardTop;

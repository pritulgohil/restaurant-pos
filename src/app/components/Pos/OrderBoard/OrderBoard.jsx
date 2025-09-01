import React from "react";
import styles from "./OrderBoard.module.css";
import { Hourglass } from "lucide-react";

export const OrderBoard = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.cardCapsuleContainer}>
        <div className={`${styles.cardCapsule} ${styles.allCapsule}`}>
          <div className="capsuleHeader">All</div>
          <div
            className={`${styles.capsuleIconContainer} ${styles.allIconContainer}`}
          >
            07
          </div>
        </div>
        <div className={`${styles.cardCapsule} ${styles.inProgressCapsule}`}>
          <div className="capsuleHeader">Queued</div>
          <div
            className={`${styles.capsuleIconContainer} ${styles.inProgressIconContainer}`}
          >
            07
          </div>
        </div>
        <div className={`${styles.cardCapsule} ${styles.pendingCapsule}`}>
          <div className="capsuleHeader">In Progresss</div>
          <div
            className={`${styles.capsuleIconContainer} ${styles.pendingIconContainer}`}
          >
            07
          </div>
        </div>
        <div className={`${styles.cardCapsule} ${styles.completeCapsule}`}>
          <div className="capsuleHeader">Completed</div>
          <div
            className={`${styles.capsuleIconContainer} ${styles.completeIconContainer}`}
          >
            12
          </div>
        </div>
      </div>
      <div className={styles.orderCardContainer}>
        <div className={styles.orderCard}>
          <div className={styles.firstContainer}>
            <div className={styles.orderId}>Order #3dbefr</div>
            <div className={styles.orderStatus}>
              <Hourglass size={12} strokeWidth={2.5} />
              Queued
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from "react";
import styles from "./OrderBoard.module.css";
import { Hourglass, CircleCheckBig } from "lucide-react";

export const OrderBoard = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.cardCapsuleContainer}>
        <div className={`${styles.cardCapsule} ${styles.pendingCapsule}`}>
          <div
            className={`${styles.capsuleIconContainer} ${styles.pendingIconContainer}`}
          >
            <Hourglass className={styles.capsuleIcon} />
          </div>
          <div className="capsuleHeader">Pending</div>
        </div>
        <div className={`${styles.cardCapsule} ${styles.completeCapsule}`}>
          <div
            className={`${styles.capsuleIconContainer} ${styles.completeIconContainer}`}
          >
            <CircleCheckBig className={styles.completeCapsuleIcon} />
          </div>
          <div className="capsuleHeader">Completed</div>
        </div>
      </div>
    </div>
  );
};

import React from "react";
import styles from "./OrderBoard.module.css";
import { Hourglass, User, Clock, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

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
        <div className={`${styles.orderCard} shadow-md`}>
          <div className={styles.firstContainer}>
            <div className={styles.orderId}>Order #3dbefr</div>
            <div className={styles.orderStatus}>
              <Hourglass size={12} strokeWidth={2} />
              Queued
            </div>
          </div>
          <div className={styles.userContainer}>
            <User size={14} strokeWidth={2.5} />
            Pritul Gohil
          </div>
          <div className={styles.secondContainer}>
            <div className={styles.orderType}>Dine-in</div>
            <div className={styles.orderTime}>
              <Clock size={12} />
              Just Now
            </div>
          </div>
          <div className={styles.thirdContainer}>
            <div className={styles.orderItemContainer}>
              <div className={styles.itemName}>Caesar Salad</div>
              <div className={styles.itemCount}>x2</div>
            </div>
            <div className={styles.orderItemContainer}>
              <div className={styles.itemName}>Grilled Salmon</div>
              <div className={styles.itemCount}>x1</div>
            </div>
            <div className={styles.orderItemContainer}>
              <div className={styles.itemName}>Sparkling Water</div>
              <div className={styles.itemCount}>x1</div>
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <Button className={styles.startPrepButton}>
              <Rocket />
              Start Preparing
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

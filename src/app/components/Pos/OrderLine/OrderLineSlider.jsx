import React from "react";
import styles from "./OrderLineSlider.module.css";

const OrderLineSlider = () => {
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.header}>Order Line</div>
        <div className={styles.capsuleContainer}>
          <div className={styles.capsule}>
            <div className={styles.capsuleText}>All</div>
            <div className={styles.capsuleNumber}>78</div>
          </div>
          <div className={`${styles.capsule} ${styles.inactiveCapsule}`}>
            <div className={styles.capsuleText}>Dine in</div>
            <div className={`${styles.capsuleNumber} ${styles.dineIn}`}>04</div>
          </div>
          <div className={`${styles.capsule} ${styles.inactiveCapsule}`}>
            <div className={styles.capsuleText}>Wait List</div>
            <div className={`${styles.capsuleNumber} ${styles.waitlist}`}>
              03
            </div>
          </div>
          <div className={`${styles.capsule} ${styles.inactiveCapsule}`}>
            <div className={styles.capsuleText}>Takeaway</div>
            <div className={`${styles.capsuleNumber} ${styles.takeaway}`}>
              12
            </div>
          </div>
          <div className={`${styles.capsule} ${styles.inactiveCapsule}`}>
            <div className={styles.capsuleText}>Served</div>
            <div className={`${styles.capsuleNumber} ${styles.served}`}>59</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderLineSlider;

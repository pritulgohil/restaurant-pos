import React from "react";
import styles from "./OrderLineSummary.module.css";
import { SquarePen, Trash2 } from "lucide-react";

const OrderLineSummary = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.summaryContainer}>
        <div className={styles.tableContainer}>
          <div className={styles.topContainer}>
            <div className={styles.tableNumber}>Table No #4</div>
            <div className={styles.iconContainer}>
              <SquarePen size={20} className="text-gray-400 cursor-pointer" />
              <Trash2 size={20} className="text-red-400 cursor-pointer" />
            </div>
          </div>
          <div className={styles.bottomContainer}>
            <div className={styles.orderId}>Order #F0030</div>
            <div className={styles.peopleContainer}>2 People</div>
          </div>
        </div>
        <hr className="border-t border-dashed border-gray-300" />
        <div className={styles.orderedItemsContainer}>
          <div className={styles.topContainer}>
            <div className={styles.sectionHeader}>Ordered Items</div>
            <div className={styles.totalItems}>06</div>
          </div>
          <div className={styles.orderBottomContainer}>
            <div className={styles.orderEntry}>
              <div className={styles.orderItems}>
                <div className={styles.orderQuantity}>2x</div>
                <div className={styles.orderName}>Pasta with Roast Beef</div>
              </div>
              <div className={styles.orderPrice}>$20.00</div>
            </div>
            <div className={styles.orderEntry}>
              <div className={styles.orderItems}>
                <div className={styles.orderQuantity}>2x</div>
                <div className={styles.orderName}>Shrimp Rice Bowl</div>
              </div>
              <div className={styles.orderPrice}>$12.00</div>
            </div>
            <div className={styles.orderEntry}>
              <div className={styles.orderItems}>
                <div className={styles.orderQuantity}>1x</div>
                <div className={styles.orderName}>Apple Stuffed Pancake</div>
              </div>
              <div className={styles.orderPrice}>$35.00</div>
            </div>
            <div className={styles.orderEntry}>
              <div className={styles.orderItems}>
                <div className={styles.orderQuantity}>1x</div>
                <div className={styles.orderName}>Vegetable Shrimp</div>
              </div>
              <div className={styles.orderPrice}>$10.00</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderLineSummary;

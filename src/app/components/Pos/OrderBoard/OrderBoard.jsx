"use client";

import React, { useEffect } from "react";
import styles from "./OrderBoard.module.css";
import {
  Hourglass,
  User,
  Clock,
  Rocket,
  Check,
  CircleCheckBig,
  CheckCheck,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRestaurantContext } from "@/context/RestaurantContext";
import TimeStamp from "@/app/components/Pos/OrderLine/OrderLineSlider/Timestamp";

export const OrderBoard = () => {
  const { orders, fetchAllOrders, orderTrigger, setOrderTrigger } =
    useRestaurantContext();

  // Initial fetch on mount + refetch on trigger
  useEffect(() => {
    fetchAllOrders();
  }, [orderTrigger]);

  const handleStatusUpdate = async (order) => {
    try {
      let newStatus;
      if (order.status === "Queued") {
        newStatus = "In Progress";
      } else if (order.status === "In Progress") {
        newStatus = "Completed";
      } else {
        return; // Already completed → no action
      }

      const token = localStorage.getItem("token");
      const res = await fetch(`/api/pos/update-order-status/${order._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        throw new Error("Failed to update order status");
      }

      await res.json();

      // Refetch orders after update
      setOrderTrigger(!orderTrigger);
    } catch (err) {
      console.error("Error updating order status:", err);
    }
  };

  return (
    <div className={styles.mainContainer}>
      {/* Order summary cards */}
      <div className={styles.cardCapsuleContainer}>
        <div className={`${styles.cardCapsule} ${styles.allCapsule}`}>
          <div className="capsuleHeader">All</div>
          <div
            className={`${styles.capsuleIconContainer} ${styles.allIconContainer}`}
          >
            {orders.length}
          </div>
        </div>
        <div className={`${styles.cardCapsule} ${styles.inProgressCapsule}`}>
          <div className="capsuleHeader">Queued</div>
          <div
            className={`${styles.capsuleIconContainer} ${styles.inProgressIconContainer}`}
          >
            {orders.filter((o) => o.status === "Queued").length}
          </div>
        </div>
        <div className={`${styles.cardCapsule} ${styles.pendingCapsule}`}>
          <div className="capsuleHeader">In Progress</div>
          <div
            className={`${styles.capsuleIconContainer} ${styles.pendingIconContainer}`}
          >
            {orders.filter((o) => o.status === "In Progress").length}
          </div>
        </div>
        <div className={`${styles.cardCapsule} ${styles.completeCapsule}`}>
          <div className="capsuleHeader">Completed</div>
          <div
            className={`${styles.capsuleIconContainer} ${styles.completeIconContainer}`}
          >
            {orders.filter((o) => o.status === "Completed").length}
          </div>
        </div>
      </div>

      {/* Orders list */}
      <div className={styles.orderCardContainer}>
        {orders && orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order._id}
              className={`${styles.orderCard} ${
                order.status === "In Progress" ? styles.inProgressOrderCard : ""
              } ${
                order.status === "Completed" ? styles.completedOrderCard : ""
              }`}
            >
              <div className={styles.firstContainer}>
                <div className={styles.orderId}>
                  Order #{order._id.slice(-6)}
                </div>
                <div
                  className={`${styles.orderStatus} ${
                    order.status === "In Progress"
                      ? styles.inProgressStatus
                      : ""
                  } ${
                    order.status === "Completed" ? styles.completedStatus : ""
                  }`}
                >
                  {order.status === "Queued" ? (
                    <Layers size={12} strokeWidth={2} />
                  ) : order.status === "In Progress" ? (
                    <Hourglass size={12} strokeWidth={2} />
                  ) : order.status === "Completed" ? (
                    <CheckCheck size={12} strokeWidth={2} />
                  ) : null}

                  {order.status}
                </div>
              </div>

              <div className={styles.userContainer}>
                <User size={14} strokeWidth={2.5} />
                {order.customerName}
              </div>

              <div className={styles.secondContainer}>
                <div className={styles.orderType}>{order.orderType}</div>
                <div className={styles.orderTime}>
                  <Clock size={12} />
                  <TimeStamp createdAt={order.createdAt} />
                </div>
              </div>

              <div className={styles.thirdContainer}>
                {Object.values(order.dishes).map((item, idx) => (
                  <div key={idx} className={styles.orderItemContainer}>
                    <div className={styles.itemName}>{item.name}</div>
                    <div className={styles.itemCount}>x{item.quantity}</div>
                  </div>
                ))}
              </div>

              <div className={styles.buttonContainer}>
                {order.status !== "Completed" ? (
                  <Button
                    className={`${styles.startPrepButton} ${
                      order.status === "In Progress"
                        ? styles.inProgressButton
                        : ""
                    } w-full`}
                    onClick={() => handleStatusUpdate(order)}
                  >
                    {order.status === "Queued" ? (
                      <>
                        <Rocket />
                        Start Preparing
                      </>
                    ) : (
                      <>
                        <Check />
                        Mark Complete
                      </>
                    )}
                  </Button>
                ) : (
                  <Button
                    className={`${
                      order.status === "Completed" ? styles.completeButton : ""
                    }`}
                  >
                    <CircleCheckBig />
                    Completed
                  </Button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No orders yet.</p>
        )}
      </div>
    </div>
  );
};

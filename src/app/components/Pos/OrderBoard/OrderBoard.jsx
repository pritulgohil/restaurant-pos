"use client";

import React, { useState, useEffect } from "react";
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
  LoaderCircle,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRestaurantContext } from "@/context/RestaurantContext";
import TimeStamp from "@/app/components/Pos/OrderLine/OrderLineSlider/Timestamp";
import { Skeleton } from "@/components/ui/skeleton";
import { useNotification } from "@/context/NotificationContext";

export const OrderBoard = () => {
  const {
    orders,
    fetchAllOrders,
    orderTrigger,
    setOrderTrigger,
    orderLineSliderLoader,
    restaurant,
  } = useRestaurantContext();
  const { sendNotification, fetchNotifications } = useNotification();

  const [loadingOrders, setLoadingOrders] = useState(new Set());
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    fetchAllOrders();
  }, [orderTrigger]);

  const handleStatusUpdate = async (order) => {
    try {
      let newStatus;
      setLoadingOrders((prev) => new Set(prev).add(order._id));
      if (order.status === "Queued") {
        newStatus = "In Progress";
      } else if (order.status === "In Progress") {
        newStatus = "Completed";
      } else {
        setLoadingOrders((prev) => {
          const newSet = new Set(prev);
          newSet.delete(order._id);
          return newSet;
        });
        return;
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
      if (!res.ok) throw new Error("Failed to update order status");
      await res.json();
      setTimeout(() => {
        setLoadingOrders((prev) => {
          const newSet = new Set(prev);
          newSet.delete(order._id);
          return newSet;
        });
        setOrderTrigger((prev) => !prev);
      }, 2000);
      {
        newStatus === "In Progress"
          ? await sendNotification({
              notificationSender: "Order Board",
              orderId: order._id,
              restaurantId: restaurant,
              notificationDescription: `Order #${order._id.slice(
                -6
              )} is now being prepared.`,
            })
          : await sendNotification({
              notificationSender: "Order Board",
              orderId: order._id,
              restaurantId: restaurant,
              notificationDescription: `Order #${order._id.slice(
                -6
              )} is now ready to be served.`,
            });
      }
      await fetchNotifications({ restaurantId: restaurant, reset: true });
    } catch (err) {
      console.error("Error updating order status:", err);
      setLoadingOrders((prev) => {
        const newSet = new Set(prev);
        newSet.delete(order._id);
        return newSet;
      });
    }
  };

  // Filter orders based on selected status
  const filteredOrders =
    filterStatus === "All"
      ? orders
      : orders.filter((o) => o.status === filterStatus);

  const statusPriority = { Queued: 1, "In Progress": 2, Completed: 3 };
  const sortedOrders = [...filteredOrders].sort(
    (a, b) => statusPriority[a.status] - statusPriority[b.status]
  );

  const queuedAndInProgress = sortedOrders.filter(
    (o) => o.status !== "Completed"
  );
  const completedOrders = sortedOrders
    .filter((o) => o.status === "Completed")
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const finalOrders = [...queuedAndInProgress, ...completedOrders];

  return (
    <div className={styles.mainContainer}>
      <div className={styles.cardCapsuleContainer}>
        <div
          className={`${styles.cardCapsule} ${
            filterStatus === "All" ? styles.allActiveCapsule : ""
          }`}
          onClick={() => setFilterStatus("All")}
        >
          <div className="capsuleHeader">All</div>
          <div
            className={`${styles.capsuleIconContainer} ${styles.allIconContainer}`}
          >
            {orders.filter((o) => o.status !== "Completed").length +
              Math.min(
                orders.filter((o) => o.status === "Completed").length,
                5
              )}
          </div>
        </div>

        <div
          className={`${styles.cardCapsule} ${
            filterStatus === "Queued" ? styles.queueActiveCapsule : ""
          } ${styles.inProgressCapsule}`}
          onClick={() => setFilterStatus("Queued")}
        >
          <div className="capsuleHeader">Queued</div>
          <div
            className={`${styles.capsuleIconContainer} ${styles.inProgressIconContainer}`}
          >
            {orders.filter((o) => o.status === "Queued").length}
          </div>
        </div>

        <div
          className={`${styles.cardCapsule} ${
            filterStatus === "In Progress" ? styles.progressActiveCapsule : ""
          } ${styles.pendingCapsule}`}
          onClick={() => setFilterStatus("In Progress")}
        >
          <div className="capsuleHeader">In Progress</div>
          <div
            className={`${styles.capsuleIconContainer} ${styles.pendingIconContainer}`}
          >
            {orders.filter((o) => o.status === "In Progress").length}
          </div>
        </div>

        <div
          className={`${styles.cardCapsule} ${
            filterStatus === "Completed" ? styles.completeActiveCapsule : ""
          } ${styles.completeCapsule}`}
          onClick={() => setFilterStatus("Completed")}
        >
          <div className="capsuleHeader">Completed</div>
          <div
            className={`${styles.capsuleIconContainer} ${styles.completeIconContainer}`}
          >
            {Math.min(orders.filter((o) => o.status === "Completed").length, 5)}
          </div>
        </div>
      </div>

      <div className={styles.orderCardContainer}>
        {orderLineSliderLoader ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div
                key={idx}
                className="p-4 border rounded-xl animate-pulse space-y-4 w-full"
              >
                <div className="flex justify-between items-center">
                  <Skeleton className="h-5 w-1/2 rounded" />
                  <Skeleton className="h-5 w-1/4 rounded" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-4 w-3/4 rounded" />
                </div>
                <div className="flex justify-between items-center">
                  <Skeleton className="h-4 w-1/3 rounded" />
                  <Skeleton className="h-4 w-1/4 rounded" />
                </div>
                <div className="space-y-2">
                  {[1, 2, 3].map((_, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center"
                    >
                      <Skeleton className="h-4 w-3/4 rounded" />
                      <Skeleton className="h-4 w-1/6 rounded" />
                    </div>
                  ))}
                </div>
                <Skeleton className="h-10 w-full rounded" />
              </div>
            ))}
          </div>
        ) : finalOrders.length > 0 ? (
          finalOrders.map((order) => (
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
                  <ExternalLink
                    size={16}
                    className="cursor-pointer"
                    onClick={() => {
                      const url = `${window.location.origin}/pos/manage-orders?orderId=${order._id}`;
                      window.open(url, "_blank");
                    }}
                  />
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
                    disabled={loadingOrders.has(order._id)}
                  >
                    {order.status === "Queued" ? (
                      loadingOrders.has(order._id) ? (
                        <>
                          <LoaderCircle className="animate-spin" />
                          Start Preparing...
                        </>
                      ) : (
                        <>
                          <Rocket />
                          Start Preparing
                        </>
                      )
                    ) : loadingOrders.has(order._id) ? (
                      <>
                        <LoaderCircle className="animate-spin" />
                        Marking Complete...
                      </>
                    ) : (
                      <>
                        <Check />
                        Mark Complete
                      </>
                    )}
                  </Button>
                ) : (
                  <Button className={`${styles.completeButton}`} disabled>
                    <CircleCheckBig />
                    Completed
                  </Button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className={styles.placeholderCard}>No Active Orders</div>
        )}
      </div>
    </div>
  );
};

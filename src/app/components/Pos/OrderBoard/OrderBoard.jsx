import React from "react";
import styles from "./OrderBoard.module.css";
import { Hourglass, User, Clock, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

const orders = [
  {
    id: "#A123",
    customer: "Pritul Gohil",
    type: "Dine-in",
    time: "Just Now",
    items: [
      { name: "Caesar Salad", count: 2 },
      { name: "Grilled Salmon", count: 1 },
    ],
  },
  {
    id: "#B456",
    customer: "Anita Sharma",
    type: "Takeaway",
    time: "2 mins ago",
    items: [
      { name: "Veggie Burger", count: 1 },
      { name: "French Fries", count: 1 },
    ],
  },
  {
    id: "#C789",
    customer: "Rahul Mehta",
    type: "Delivery",
    time: "5 mins ago",
    items: [
      { name: "Pepperoni Pizza", count: 1 },
      { name: "Coke", count: 2 },
    ],
  },
  {
    id: "#D234",
    customer: "Sophia Patel",
    type: "Dine-in",
    time: "10 mins ago",
    items: [
      { name: "Pasta Alfredo", count: 1 },
      { name: "Garlic Bread", count: 1 },
    ],
  },
  {
    id: "#E567",
    customer: "Mohammed Khan",
    type: "Takeaway",
    time: "15 mins ago",
    items: [
      { name: "Chicken Shawarma", count: 2 },
      { name: "Lemonade", count: 1 },
    ],
  },
  {
    id: "#F890",
    customer: "Emily Davis",
    type: "Delivery",
    time: "20 mins ago",
    items: [
      { name: "Sushi Platter", count: 1 },
      { name: "Miso Soup", count: 1 },
    ],
  },
  {
    id: "#G321",
    customer: "Arjun Desai",
    type: "Dine-in",
    time: "30 mins ago",
    items: [
      { name: "Paneer Tikka", count: 1 },
      { name: "Naan", count: 2 },
    ],
  },
  {
    id: "#H654",
    customer: "Olivia Smith",
    type: "Delivery",
    time: "45 mins ago",
    items: [
      { name: "Club Sandwich", count: 1 },
      { name: "Iced Tea", count: 1 },
    ],
  },
  {
    id: "#I987",
    customer: "Karan Patel",
    type: "Takeaway",
    time: "1 hr ago",
    items: [
      { name: "Tandoori Chicken", count: 1 },
      { name: "Mango Lassi", count: 1 },
    ],
  },
  {
    id: "#J543",
    customer: "Sarah Johnson",
    type: "Dine-in",
    time: "2 hrs ago",
    items: [
      { name: "Chocolate Cake", count: 1 },
      { name: "Cappuccino", count: 1 },
    ],
  },
];

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
        {orders.map((order) => (
          <div key={order.id} className={`${styles.orderCard} shadow-md`}>
            <div className={styles.firstContainer}>
              <div className={styles.orderId}>Order {order.id}</div>
              <div className={styles.orderStatus}>
                <Hourglass size={12} strokeWidth={2} />
                Queued
              </div>
            </div>

            <div className={styles.userContainer}>
              <User size={14} strokeWidth={2.5} />
              {order.customer}
            </div>

            <div className={styles.secondContainer}>
              <div className={styles.orderType}>{order.type}</div>
              <div className={styles.orderTime}>
                <Clock size={12} />
                {order.time}
              </div>
            </div>

            <div className={styles.thirdContainer}>
              {order.items.map((item, idx) => (
                <div key={idx} className={styles.orderItemContainer}>
                  <div className={styles.itemName}>{item.name}</div>
                  <div className={styles.itemCount}>x{item.count}</div>
                </div>
              ))}
            </div>

            <div className={styles.buttonContainer}>
              <Button className={styles.startPrepButton}>
                <Rocket />
                Start Preparing
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

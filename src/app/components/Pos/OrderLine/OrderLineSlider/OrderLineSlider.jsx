import React, { useRef, useState, useEffect } from "react";
import styles from "./OrderLineSlider.module.css";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon, ChevronLeftIcon } from "lucide-react";
import { useRestaurantContext } from "@/context/RestaurantContext";
import TimeStamp from "@/app/components/Pos/OrderLine/OrderLineSlider/Timestamp";

const OrderLineSlider = () => {
  const cardContainerRef = useRef(null);
  const [isScrollStart, setIsScrollStart] = useState(true);
  const [isScrollEnd, setIsScrollEnd] = useState(false);
  const { orders, fetchAllOrders } = useRestaurantContext();
  const [selectedCapsule, setSelectedCapsule] = useState("All");
  const SCROLL_AMOUNT = 300;

  // Scroll handlers
  const handleScrollRight = () => {
    cardContainerRef.current?.scrollBy({
      left: SCROLL_AMOUNT,
      behavior: "smooth",
    });
  };

  const handleScrollLeft = () => {
    cardContainerRef.current?.scrollBy({
      left: -SCROLL_AMOUNT,
      behavior: "smooth",
    });
  };

  const checkScrollPosition = () => {
    const container = cardContainerRef.current;
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    const clientWidth = container.clientWidth;
    const scrollWidth = container.scrollWidth;

    const atStart = scrollLeft <= 0;
    const atEnd = scrollLeft + clientWidth >= scrollWidth - 1;
    const isScrollable = scrollWidth > clientWidth;

    setIsScrollStart(atStart);
    setIsScrollEnd(!isScrollable || atEnd);
  };

  useEffect(() => {
    const container = cardContainerRef.current;
    if (!container) return;

    container.addEventListener("scroll", checkScrollPosition);
    requestAnimationFrame(checkScrollPosition);

    return () => container.removeEventListener("scroll", checkScrollPosition);
  }, []);

  useEffect(() => {
    fetchAllOrders();
  }, []);

  // Capsules
  const capsules = [
    { label: "All", count: orders.length },
    {
      label: "Dine-in",
      count: orders.filter((o) => o.orderType === "Dine-in").length,
      style: styles.dineIn,
      borderStyle: styles.dineInCapsule,
    },
    {
      label: "Queued",
      count: orders.filter((o) => o.status === "Queued").length,
      style: styles.waitlist,
      borderStyle: styles.waitlistCapsule,
    },
    {
      label: "Takeaway",
      count: orders.filter((o) => o.orderType === "Takeaway").length,
      style: styles.takeaway,
      borderStyle: styles.takeawayCapsule,
    },
    {
      label: "Served",
      count: orders.filter((o) => o.status === "Served").length,
      style: styles.served,
      borderStyle: styles.servedCapsule,
    },
  ];

  // Map capsule label to filter field/value
  const capsuleFilterMap = {
    All: null,
    "Dine-in": { field: "orderType", value: "Dine-in" },
    Takeaway: { field: "orderType", value: "Takeaway" },
    Queued: { field: "status", value: "Queued" },
    Served: { field: "status", value: "Completed" },
  };

  // Filter orders based on selected capsule
  let filteredOrders = [...orders].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  const filterInfo = capsuleFilterMap[selectedCapsule];
  if (filterInfo) {
    filteredOrders = filteredOrders.filter(
      (order) => order[filterInfo.field] === filterInfo.value
    );
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.header}>
        <h2>Order Line</h2>
      </div>

      {/* Capsules */}
      <div className={styles.capsuleContainer}>
        {capsules.map((c) => (
          <div
            key={c.label}
            className={`${styles.capsule} ${
              selectedCapsule === c.label
                ? `${styles.activeCapsule} ${c.borderStyle || ""}`
                : styles.inactiveCapsule
            }`}
            onClick={() => setSelectedCapsule(c.label)}
          >
            <div className={styles.capsuleText}>{c.label}</div>
            <div className={`${styles.capsuleNumber} ${c.style || ""}`}>
              {c.count.toString().padStart(2, "0")}
            </div>
          </div>
        ))}
      </div>

      {/* Card Slider */}
      <div className={styles.cardSliderContainer}>
        {!isScrollStart && (
          <div className={styles.leftButton}>
            <Button
              variant="secondary"
              size="icon"
              className="bg-white rounded-full shadow-lg size-8"
              onClick={handleScrollLeft}
            >
              <ChevronLeftIcon />
            </Button>
          </div>
        )}

        <div className={styles.cardContainer} ref={cardContainerRef}>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <div
                key={order._id}
                className={`${styles.card} ${
                  order.status === "Queued" ? styles.waitListCard : ""
                }`}
              >
                <div className={styles.cardTop}>
                  <div className={styles.orderId}>
                    Order #{order._id.slice(-6)}
                  </div>
                  {order.table === "n/a" ? (
                    <div className={styles.table}>Takeaway</div>
                  ) : (
                    <div className={styles.table}>
                      Table {String(order.table).padStart(2, "0")}
                    </div>
                  )}
                </div>
                <div className={styles.cardMiddle}>
                  <div className={styles.itemCount}>
                    Item: {order.totalItems}X
                  </div>
                </div>
                <div className={styles.cardBottom}>
                  <div className={styles.timeStamp}>
                    <TimeStamp createdAt={order.createdAt} />
                  </div>
                  <div
                    className={`${styles.statusPill} ${
                      order.status === "Queued" ? styles.waitlist : ""
                    }`}
                  >
                    {order.status}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.cardPlaceholder}>No Active Orders</div>
          )}
        </div>

        {!isScrollEnd && (
          <div className={styles.rightButton}>
            <Button
              variant="secondary"
              size="icon"
              className="bg-white rounded-full shadow-lg size-8"
              onClick={handleScrollRight}
            >
              <ChevronRightIcon />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderLineSlider;

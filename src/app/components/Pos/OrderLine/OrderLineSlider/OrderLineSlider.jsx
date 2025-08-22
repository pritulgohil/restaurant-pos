import React, { useRef, useState, useEffect } from "react";
import styles from "./OrderLineSlider.module.css";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon, ChevronLeftIcon } from "lucide-react";
import { useRestaurantContext } from "@/context/RestaurantContext";
import TimeStamp from "@/app/components/Pos/OrderLine/OrderLineSlider/Timestamp";

const OrderLineSlider = () => {
  const cardContainerRef = useRef(null);
  const [orders, setOrders] = useState([]);
  const [isScrollStart, setIsScrollStart] = useState(true);
  const [isScrollEnd, setIsScrollEnd] = useState(false);
  const { restaurant } = useRestaurantContext();
  const SCROLL_AMOUNT = 300;

  const handleScrollRight = () => {
    if (cardContainerRef.current) {
      cardContainerRef.current.scrollBy({
        left: SCROLL_AMOUNT,
        behavior: "smooth",
      });
    }
  };

  const handleScrollLeft = () => {
    if (cardContainerRef.current) {
      cardContainerRef.current.scrollBy({
        left: -SCROLL_AMOUNT,
        behavior: "smooth",
      });
    }
  };

  const checkScrollPosition = () => {
    const container = cardContainerRef.current;
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    const clientWidth = container.clientWidth;
    const scrollWidth = container.scrollWidth;

    const atStart = scrollLeft <= 0;
    const atEnd = scrollLeft + clientWidth >= scrollWidth - 1; // -1 to allow rounding tolerance
    const isScrollable = scrollWidth > clientWidth;

    setIsScrollStart(atStart);
    setIsScrollEnd(!isScrollable || atEnd);
  };

  useEffect(() => {
    const container = cardContainerRef.current;
    if (!container) return;

    container.addEventListener("scroll", checkScrollPosition);

    // Delay initial check to ensure layout is ready
    requestAnimationFrame(() => {
      checkScrollPosition();
    });

    return () => {
      container.removeEventListener("scroll", checkScrollPosition);
    };
  }, []);

  const fetchAllOrders = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`/api/pos/fetch-all-order-cards/${restaurant}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (res.ok) {
        const orders = data.orders || [];
        console.log("Fetched Orders:", orders);
        setOrders(orders);
      } else {
        console.error(
          "Failed to fetch orders:",
          data.message || res.statusText
        );
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.header}>
        <h2>Order Line</h2>
      </div>

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
          <div className={`${styles.capsuleNumber} ${styles.waitlist}`}>03</div>
        </div>
        <div className={`${styles.capsule} ${styles.inactiveCapsule}`}>
          <div className={styles.capsuleText}>Takeaway</div>
          <div className={`${styles.capsuleNumber} ${styles.takeaway}`}>12</div>
        </div>
        <div className={`${styles.capsule} ${styles.inactiveCapsule}`}>
          <div className={styles.capsuleText}>Served</div>
          <div className={`${styles.capsuleNumber} ${styles.served}`}>59</div>
        </div>
      </div>

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
          {orders.length > 0 ? (
            orders.map((order) => (
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
                  <div className={styles.table}>
                    Table {String(order.table).padStart(2, "0")}
                  </div>
                </div>

                <div className={styles.cardMiddle}>
                  <div className={styles.itemCount}>
                    Item: {order.totalItems}X
                  </div>
                </div>

                <div className={styles.cardBottom}>
                  <div className={styles.timeStamp}>
                    {/* Replace with <TimeStamp createdAt={order.createdAt} /> later */}
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
            <>
              <div className={styles.cardPlaceholder}>No Active Orders</div>
            </>
          )}

          {/* <div className={`${styles.card} ${styles.waitListCard}`}>
            <div className={styles.cardTop}>
              <div className={styles.orderId}>Order #F0028</div>
              <div className={styles.table}>Table 07</div>
            </div>
            <div className={styles.cardMiddle}>
              <div className={styles.itemCount}>Item: 3X</div>
            </div>
            <div className={styles.cardBottom}>
              <div className={styles.timeStamp}>Just Now</div>
              <div className={`${styles.statusPill} ${styles.waitlist}`}>
                Wait List
              </div>
            </div>
          </div>

          <div className={`${styles.card} ${styles.takeawayCard}`}>
            <div className={styles.cardTop}>
              <div className={styles.orderId}>Order #F0019</div>
              <div className={styles.table}>Table 09</div>
            </div>
            <div className={styles.cardMiddle}>
              <div className={styles.itemCount}>Item: 2X</div>
            </div>
            <div className={styles.cardBottom}>
              <div className={styles.timeStamp}>25 mins ago</div>
              <div className={`${styles.statusPill} ${styles.takeaway}`}>
                Ready
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardTop}>
              <div className={styles.orderId}>Order #F0020</div>
              <div className={styles.table}>Table 04</div>
            </div>
            <div className={styles.cardMiddle}>
              <div className={styles.itemCount}>Item: 3X</div>
            </div>
            <div className={styles.cardBottom}>
              <div className={styles.timeStamp}>6 mins ago</div>
              <div className={styles.statusPill}>In Kitchen</div>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardTop}>
              <div className={styles.orderId}>Order #F0021</div>
              <div className={styles.table}>Table 06</div>
            </div>
            <div className={styles.cardMiddle}>
              <div className={styles.itemCount}>Item: 5X</div>
            </div>
            <div className={styles.cardBottom}>
              <div className={styles.timeStamp}>10 mins ago</div>
              <div className={styles.statusPill}>In Kitchen</div>
            </div>
          </div> */}
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

import React, { useRef, useState, useEffect } from "react";
import styles from "./OrderLineMenu.module.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

const OrderLineMenu = () => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = () => {
    const container = scrollRef.current;
    if (!container) return;

    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft + container.offsetWidth < container.scrollWidth
    );
  };

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = container.offsetWidth * 0.5;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    updateScrollState();
    const container = scrollRef.current;

    if (!container) return;

    container.addEventListener("scroll", updateScrollState);
    window.addEventListener("resize", updateScrollState);
    return () => {
      container.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.header}>
        <h2>Foodies Menu</h2>
        <div className={styles.navigators}>
          <ChevronLeft
            strokeWidth={1.5}
            onClick={() => scroll("left")}
            className={`cursor-pointer transition-opacity ${
              canScrollLeft ? "text-gray-600" : "text-gray-300"
            }`}
          />
          <ChevronRight
            strokeWidth={1.5}
            onClick={() => scroll("right")}
            className={`cursor-pointer transition-opacity ${
              canScrollRight ? "text-gray-600" : "text-gray-300"
            }`}
          />
        </div>
      </div>

      <div className={styles.categoriesCardContainer} ref={scrollRef}>
        <div className={styles.categoryCard}>
          <div className={styles.categoryImage}>❤️</div>
          <div className={styles.categoryDetails}>
            <div className={styles.categoryName}>All Menu</div>
            <div className={styles.categoryCount}>154 items</div>
          </div>
        </div>
        <div className={`${styles.categoryCard} ${styles.inactive}`}>
          <div className={styles.categoryImage}>🍔</div>
          <div className={styles.categoryDetails}>
            <div className={styles.categoryName}>Special</div>
            <div className={styles.categoryCount}>79 items</div>
          </div>
        </div>
        <div className={`${styles.categoryCard} ${styles.inactive}`}>
          <div className={styles.categoryImage}>🍟</div>
          <div className={styles.categoryDetails}>
            <div className={styles.categoryName}>Soups</div>
            <div className={styles.categoryCount}>23 items</div>
          </div>
        </div>
        <div className={`${styles.categoryCard} ${styles.inactive}`}>
          <div className={styles.categoryImage}>🍨</div>
          <div className={styles.categoryDetails}>
            <div className={styles.categoryName}>Desserts</div>
            <div className={styles.categoryCount}>15 items</div>
          </div>
        </div>
        <div className={`${styles.categoryCard} ${styles.inactive}`}>
          <div className={styles.categoryImage}>🍕</div>
          <div className={styles.categoryDetails}>
            <div className={styles.categoryName}>Chicken</div>
            <div className={styles.categoryCount}>8 items</div>
          </div>
        </div>
        <div className={`${styles.categoryCard} ${styles.inactive}`}>
          <div className={styles.categoryImage}>🥩</div>
          <div className={styles.categoryDetails}>
            <div className={styles.categoryName}>Meat</div>
            <div className={styles.categoryCount}>18 items</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderLineMenu;

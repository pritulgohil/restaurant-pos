import React, { useRef, useState, useEffect } from "react";
import styles from "./OrderLineMenu.module.css";
import { ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      <div className={styles.stickyTopContainer}>
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
      <div className={styles.menuCardContainer}>
        {Array.from({ length: 30 }).map((_, index) => (
          <div key={index} className={styles.menuCard}>
            <div className={styles.cardEmoji}>🍔</div>
            <div className={styles.menuCategory}>Lunch</div>
            <div className={styles.itemName}>Grilled Burger</div>
            <div className={styles.priceQuantityContainer}>
              <div className={styles.price}>$15.00</div>
              <div className={styles.quantity}>
                <div className={styles.minusContainer}>
                  <Button className="w-4 h-4 rounded-full bg-gray-200 shadow-none text-black p-0 hover:bg-gray-300">
                    <Minus className="w-[10px] h-[10px]" />
                  </Button>
                </div>
                <div className={styles.quantityText}>0</div>
                <div className={styles.minusContainer}>
                  <Button className="w-4 h-4 rounded-full bg-emerald-600 shadow-none text-white p-0 hover:bg-emerald-700">
                    <Plus className="w-[10px] h-[10px]" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderLineMenu;

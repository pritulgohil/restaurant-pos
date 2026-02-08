"use client";

import CategorySidebar from "@/app/components/Pos/ManageDishes/CategorySidebar";
import styles from "./page.module.css";
import DishesCards from "@/app/components/Pos/ManageDishes/DishesCards";
import { useRestaurantContext } from "@/context/RestaurantContext";

const page = () => {
  const { dishesCategoryVisible } = useRestaurantContext();
  return (
    <>
      <div className={styles.mainContainer}>
        <div
          className={`${styles.categorySidebar} ${dishesCategoryVisible ? styles.visible : styles.hidden}`}
        >
          <CategorySidebar />
        </div>
        <div
          className={`${styles.dishesCards} ${dishesCategoryVisible ? styles.blur : ""}`}
        >
          <DishesCards />
        </div>
      </div>
    </>
  );
};

export default page;

"use client";

import { useEffect } from "react";
import styles from "./CategorySidebar.module.css";
import AddCategoryDialog from "./AddCategoryDialog";
import { useRestaurantContext } from "@/context/RestaurantContext";
import { Skeleton } from "@/components/ui/skeleton";

const CategorySidebar = () => {
  //State for restaurantId
  const {
    categoryId,
    setCategoryId,
    categories,
    totalDishCount,
    dishes,
    fetchCategories,
    orderLineCategoryLoader,
  } = useRestaurantContext();

  //State for total dish count

  // Setting null on clicking All Dishes category
  const handleAllDishesClick = () => {
    setCategoryId(null);
  };

  // useEffect(() => {
  //   fetchCategories();
  // }, [dishes]);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.subContainer}>
        <div className={styles.headerContainer}>
          <h2>Dishes Category</h2>
        </div>
        <div className={styles.cardsContainer}>
          {orderLineCategoryLoader ? (
            // Loading skeleton
            <div className="space-y-2">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="p-4 border rounded-md">
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-1/2 rounded" />
                    <Skeleton className="h-4 w-1/6 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Loaded categories
            <>
              {/* All Dishes card */}
              <div
                className={`${styles.cardContainer} ${
                  categoryId === null ? styles.selectedCard : ""
                }`}
                onClick={handleAllDishesClick}
              >
                <div className={styles.leftSideContainer}>
                  <div className={styles.vectorContainer}>
                    <img src="/food-icons/burger.png" alt="Category Icon" />
                  </div>
                  <div className={styles.categoryHeader}>
                    <h4>All Dishes</h4>
                  </div>
                </div>
                <div className={styles.rightSideContainer}>
                  <div
                    className={`${styles.itemCount} ${
                      categoryId === null ? styles.selectedItemCount : ""
                    }`}
                  >
                    {totalDishCount}
                  </div>
                </div>
              </div>

              {/* Category cards */}
              {categories.map((category) => (
                <div
                  key={category._id || `temp-${Date.now()}`}
                  onClick={() => setCategoryId(category._id)}
                  className={`${styles.cardContainer} ${
                    categoryId === category._id ? styles.selectedCard : ""
                  }`}
                >
                  <div className={styles.leftSideContainer}>
                    <div className={styles.vectorContainer}>
                      {category.emoji}
                    </div>
                    <div className={styles.categoryHeader}>
                      <h4>{category.name}</h4>
                    </div>
                  </div>
                  <div className={styles.rightSideContainer}>
                    <div
                      className={`${styles.itemCount} ${
                        categoryId === category._id
                          ? styles.selectedItemCount
                          : ""
                      }`}
                    >
                      {category.dishCount || 0}
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <AddCategoryDialog onCategoryAdded={fetchCategories} />
      </div>
    </div>
  );
};

export default CategorySidebar;

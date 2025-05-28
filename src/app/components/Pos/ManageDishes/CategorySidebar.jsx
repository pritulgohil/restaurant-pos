"use client";

import { useEffect, useState } from "react";
import styles from "./CategorySidebar.module.css";
import AddCategoryDialog from "./AddCategoryDialog";
import { useRestaurantContext } from "@/context/RestaurantContext";

const CategorySidebar = () => {
  //State for restaurantId
  const {
    restaurant,
    categoryId,
    setCategoryId,
    categories,
    totalDishCount,
    dishes,
    fetchCategories,
  } = useRestaurantContext();

  //State for total dish count

  // Setting null on clicking All Dishes category
  const handleAllDishesClick = () => {
    setCategoryId(null);
  };

  useEffect(() => {
    fetchCategories();
  }, [dishes]);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.subContainer}>
        <div className={styles.headerContainer}>
          <h2>Dishes Category</h2>
        </div>
        <div className={styles.cardsContainer}>
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
              <div className={styles.itemCount}>{totalDishCount}</div>
            </div>
          </div>
          {categories.map((category) => (
            <div
              key={category._id || `temp-${Date.now()}`}
              onClick={() => setCategoryId(category._id)}
              className={`${styles.cardContainer} ${
                categoryId === category._id ? styles.selectedCard : ""
              }`}
            >
              <div className={styles.leftSideContainer}>
                <div className={styles.vectorContainer}>{category.emoji}</div>
                <div className={styles.categoryHeader}>
                  <h4>{category.name}</h4>
                </div>
              </div>
              <div className={styles.rightSideContainer}>
                <div className={styles.itemCount}>
                  {category.dishCount || 0}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <AddCategoryDialog onCategoryAdded={fetchCategories} />
      </div>
    </div>
  );
};

export default CategorySidebar;

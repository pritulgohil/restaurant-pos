"use client";

import { useEffect, useState } from "react";
import styles from "./CategorySidebar.module.css";
import AddCategoryDialog from "./AddCategoryDialog";
import { useRestaurantContext } from "@/context/RestaurantContext";

const CategorySidebar = () => {
  const [categories, setCategories] = useState([]);
  const { restaurant } = useRestaurantContext();
  const { categoryId, setCategoryId } = useRestaurantContext();

  // Setting null on clicking All Dishes category
  const handleAllDishesClick = () => {
    setCategoryId(null);
  };

  // Function to fetch categories from API
  const fetchCategories = async () => {
    const token = localStorage.getItem("token");
    try {
      // Passing restaurant in api to fetch that restaurant's category
      const res = await fetch(`/api/pos/fetch-categories/${restaurant}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await res.json();

      // Save categories array in state
      setCategories(data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

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
              <div className={styles.itemCount}>48</div>
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
                <div className={styles.vectorContainer}>🌮</div>
                <div className={styles.categoryHeader}>
                  <h4>{category.name}</h4>
                </div>
              </div>
              <div className={styles.rightSideContainer}>
                <div className={styles.itemCount}>
                  {category.itemCount || 0}
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

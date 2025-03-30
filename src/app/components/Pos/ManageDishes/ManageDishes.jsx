"use client";

import { useEffect, useState } from "react";
import styles from "./ManageDishes.module.css";
import AddCategoryDialog from "./AddCategoryDialog";
import { useRestaurantContext } from "@/context/RestaurantContext";
import { useAuthContext } from "@/context/AuthContext";

const ManageDishes = () => {
  const [categories, setCategories] = useState([]); // Store categories in state
  const { restaurant, setRestaurant } = useRestaurantContext();
  const { loggedInUser, setLoggedInUser } = useAuthContext();

  console.log("Current User", loggedInUser);

  // const fetchRestaurant = async () => {
  //   const token = localStorage.getItem("token");
  //   try {
  //     const res = await fetch(`/api/pos/fetch-restaurant/${loggedInUser}`, {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     if (!res.ok) {
  //       throw new Error("Failed to fetch categories");
  //     }
  //     const data = await res.json();
  //     if (Array.isArray(data) && data.length > 0) {
  //       console.log("Setting Restaurant ID:", data[0]._id);
  //       setRestaurant(data[0]._id);
  //     } else {
  //       console.warn("No restaurant found or data is not an array");
  //     }
  //     setCategories(data); // Update categories in state
  //     console.log("Current Restaurant", restaurant);
  //   } catch (err) {
  //     console.error("Error fetching categories:", err);
  //   }
  // };

  // useEffect(() => {
  //   fetchRestaurant();
  // }, []);

  // Function to fetch categories from API
  const fetchCategories = async () => {
    const token = localStorage.getItem("token");
    try {
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
      console.log("Fetched categories:", data);
      setCategories(data); // Update categories in state
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
          <h3>Dishes Category</h3>
        </div>
        <div className={styles.cardsContainer}>
          <div className={styles.cardContainer}>
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
              className={styles.cardContainer}
            >
              <div className={styles.leftSideContainer}>
                <div className={styles.vectorContainer}>
                  <img src="/food-icons/burger.png" alt="Category Icon" />
                </div>
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

export default ManageDishes;

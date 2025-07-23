"use client";

import { createContext, useState, useContext, useEffect } from "react";

const RestaurantContext = createContext();

export const RestaurantProvider = ({ children }) => {
  const [restaurantName, setRestaurantName] = useState(() => {
    // Load initial value from localStorage
    const stored = localStorage.getItem("restaurantName");
    return stored ? JSON.parse(stored) : "";
  });

  const [restaurant, setRestaurant] = useState(() => {
    const stored = localStorage.getItem("restaurant");
    return stored ? JSON.parse(stored) : null;
  });

  const [categoryId, setCategoryId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [totalDishCount, setTotalDishCount] = useState(0);
  const [categoryName, setCategoryName] = useState("");

  // Sync restaurantName to localStorage
  useEffect(() => {
    if (restaurantName) {
      localStorage.setItem("restaurantName", JSON.stringify(restaurantName));
    } else {
      localStorage.removeItem("restaurantName");
    }
  }, [restaurantName]);

  // Sync restaurant to localStorage
  useEffect(() => {
    if (restaurant) {
      localStorage.setItem("restaurant", JSON.stringify(restaurant));
    } else {
      localStorage.removeItem("restaurant");
    }
  }, [restaurant]);

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
      if (!res.ok) throw new Error("Failed to fetch categories");
      const data = await res.json();
      setCategories(data.categories);
      setTotalDishCount(data.totalDishCount);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  return (
    <RestaurantContext.Provider
      value={{
        restaurantName,
        setRestaurantName,
        restaurant,
        setRestaurant,
        categoryId,
        setCategoryId,
        categories,
        setCategories,
        dishes,
        setDishes,
        totalDishCount,
        setTotalDishCount,
        fetchCategories,
        categoryName,
        setCategoryName,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurantContext = () => useContext(RestaurantContext);

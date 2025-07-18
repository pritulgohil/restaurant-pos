"use client";

import { createContext, useState, useContext, useEffect } from "react";

const RestaurantContext = createContext();

export const RestaurantProvider = ({ children }) => {
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurant, setRestaurant] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [totalDishCount, setTotalDishCount] = useState(0);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    const storedRestaurant = localStorage.getItem("restaurant");
    if (storedRestaurant) {
      setRestaurant(JSON.parse(storedRestaurant));
    } else {
      setRestaurant(null);
    }
  }, []);

  useEffect(() => {
    if (restaurant) {
      localStorage.setItem("restaurant", JSON.stringify(restaurant));
    } else {
      localStorage.removeItem("restaurant");
    }
  }, [restaurant]);

  // Fetch categories and total dish count
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

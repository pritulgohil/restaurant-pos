"use client";

import { createContext, useState, useContext, useEffect } from "react";

// Create the RestaurantContext
const RestaurantContext = createContext();

export const RestaurantProvider = ({ children }) => {
  const [restaurant, setRestaurant] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    const storedRestaurant = localStorage.getItem("restaurant");
    if (storedRestaurant) {
      setRestaurant(JSON.parse(storedRestaurant)); // Parse the stored JSON string back into an object
    } else {
      // If no restaurant is stored, ensure the restaurant state is null
      setRestaurant(null);
    }
  }, []);

  // Save restaurant data to localStorage whenever it changes
  useEffect(() => {
    if (restaurant) {
      localStorage.setItem("restaurant", JSON.stringify(restaurant)); // Store the restaurant data as a JSON string
    } else {
      localStorage.removeItem("restaurant"); // Remove the data from localStorage if the restaurant is null
    }
  }, [restaurant]);

  return (
    <RestaurantContext.Provider
      value={{
        restaurant,
        setRestaurant,
        categoryId,
        setCategoryId,
        categories,
        setCategories,
        dishes,
        setDishes,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

// Custom hook to use the restaurant context
export const useRestaurantContext = () => useContext(RestaurantContext);

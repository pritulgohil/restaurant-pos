"use client";

import { createContext, useState, useContext, useEffect } from "react";

const RestaurantContext = createContext();

export const RestaurantProvider = ({ children }) => {
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurant, setRestaurant] = useState(null);
  const [restaurantCuisine, setRestaurantCuisine] = useState("");
  const [categoryId, setCategoryId] = useState(null);
  const [orderLineCategoryId, setOrderLineCategoryId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [totalDishCount, setTotalDishCount] = useState(0);
  const [dishCountbyCategory, setDishCountbyCategory] = useState(0);
  const [categoryName, setCategoryName] = useState("");
  const [orderLine, setOrderLine] = useState({});
  const [orders, setOrders] = useState([]);
  const [orderType, setOrderType] = useState("Dine-in");
  const [orderTrigger, setOrderTrigger] = useState(false);
  const [orderLineSliderLoader, setOrderLineSliderLoader] = useState(false);
  const [orderLineCategoryLoader, setOrderLineCategoryLoader] = useState(false);
  const [orderLineDishLoader, setOrderLineDishLoader] = useState(false);
  const [occupancyPercentage, setOccupancyPercentage] = useState(0);

  // Load localStorage values on client only
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedName = localStorage.getItem("restaurantName");
      const storedRestaurant = localStorage.getItem("restaurant");

      if (storedName) setRestaurantName(JSON.parse(storedName));
      if (storedRestaurant) setRestaurant(JSON.parse(storedRestaurant));
    }
  }, []);

  // Sync restaurantName to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (restaurantName) {
        localStorage.setItem("restaurantName", JSON.stringify(restaurantName));
      } else {
        localStorage.removeItem("restaurantName");
      }
    }
  }, [restaurantName]);

  // Sync restaurant to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (restaurant) {
        localStorage.setItem("restaurant", JSON.stringify(restaurant));
      } else {
        localStorage.removeItem("restaurant");
      }
    }
  }, [restaurant]);

  const fetchCategories = async () => {
    const token = localStorage.getItem("token");
    try {
      setOrderLineCategoryLoader(true);
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
    } finally {
      setOrderLineCategoryLoader(false);
    }
  };

  const fetchAllDishes = async () => {
    const token = localStorage.getItem("token");
    try {
      setOrderLineDishLoader(true);
      const res = await fetch(`/api/pos/fetch-all-dishes/${restaurant}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (res.ok) {
        const dishes = data.dishes || [];
        setDishes(dishes);
        setTotalDishCount(dishes.length);
      } else {
        console.error(
          "Failed to fetch dishes:",
          data.message || res.statusText
        );
      }
    } catch (err) {
      console.error("Error fetching dishes:", err);
    } finally {
      setOrderLineDishLoader(false);
    }
  };

  const fetchDishByCategory = async (categoryIdParam = categoryId) => {
    setDishes([]);
    const token = localStorage.getItem("token");
    try {
      setOrderLineDishLoader(true);
      const res = await fetch(`/api/pos/fetch-dish/${categoryIdParam}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        setDishes([]);
        setDishCountbyCategory(0);
        throw new Error("Failed to fetch dishes");
      }

      const data = await res.json();
      setDishes(data.dishes);
      setDishCountbyCategory(data.dishes.length);
    } catch (err) {
      console.error("Error fetching dishes:", err);
    } finally {
      setOrderLineDishLoader(false);
    }
  };

  const orderLineFetchDishByCategory = async (
    categoryOrderIdParam = orderLineCategoryId
  ) => {
    setDishes([]);
    const token = localStorage.getItem("token");
    try {
      setOrderLineDishLoader(true);
      const res = await fetch(`/api/pos/fetch-dish/${categoryOrderIdParam}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        setDishes([]);
        setDishCountbyCategory(0);
        throw new Error("Failed to fetch dishes");
      }

      const data = await res.json();
      setDishes(data.dishes);
      setDishCountbyCategory(data.dishes.length);
    } catch (err) {
      console.error("Error fetching dishes:", err);
    } finally {
      setOrderLineDishLoader(false);
    }
  };

  const fetchAllOrders = async () => {
    const token = localStorage.getItem("token");
    try {
      setOrderLineSliderLoader(true);
      const res = await fetch(`/api/pos/fetch-all-orders/${restaurant}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (res.ok) {
        const orders = data.orders || [];
        console.log("Fetched Orders:", orders);
        setOrders(orders);
      } else {
        console.error(
          "Failed to fetch orders:",
          data.message || res.statusText
        );
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setOrderLineSliderLoader(false);
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
        fetchAllDishes,
        fetchDishByCategory,
        categoryName,
        setCategoryName,
        dishCountbyCategory,
        orderLineCategoryId,
        setOrderLineCategoryId,
        orderLineFetchDishByCategory,
        orderLine,
        setOrderLine,
        orders,
        fetchAllOrders,
        orderType,
        setOrderType,
        setOrders,
        orderTrigger,
        setOrderTrigger,
        orderLineSliderLoader,
        orderLineCategoryLoader,
        orderLineDishLoader,
        occupancyPercentage,
        setOccupancyPercentage,
        restaurantCuisine,
        setRestaurantCuisine,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurantContext = () => useContext(RestaurantContext);

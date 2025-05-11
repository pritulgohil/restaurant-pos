"use client";

import { useEffect, useState } from "react";
import styles from "./DishesCards.module.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Plus,
  SquarePlus,
  LayoutGrid,
  List,
  SlidersHorizontal,
} from "lucide-react";
import { DialogTrigger } from "@/components/ui/dialog";
import AddDishDialog from "@/app/components/Pos/ManageDishes/AddDishDialog";
import { useRestaurantContext } from "@/context/RestaurantContext";
import { CircleChevronDown } from "lucide-react";

const Dishes = () => {
  //state to manage the view type (list or grid)
  const [listView, setListView] = useState(false);

  //state to display the dishes saved from API
  const [dishes, setDishes] = useState([]);

  //functions to handle the view type
  const handleListView = () => setListView(true);
  const handleGridView = () => setListView(false);

  //state context for restaurantId
  const { restaurant } = useRestaurantContext();

  //state context for categoryId
  const { categoryId } = useRestaurantContext();

  //state for dishes count
  const [dishCount, setDishCount] = useState(0);

  //state to save category name fetched from API
  const [categoryName, setCategoryName] = useState("");

  //function to fetch all dishes
  const fetchAllDishes = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`/api/pos/fetch-all-dishes/${restaurant}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch dishes");
      }
      const data = await res.json();
      //Saving the dishes in state
      setDishes(data.dishes);
      //Saving the dishes count in state
      setDishCount(data.dishes.length);
    } catch (err) {
      console.error("Error fetching dishes:", err);
    }
  };

  //function to fetch dishes by category
  const fetchDishByCategory = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`/api/pos/fetch-dish/${categoryId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch dishes");
      }
      const data = await res.json();
      //Saving the dishes in state
      setDishes(data.dishes);
      //Saving the dishes count in state
      setDishCount(data.dishes.length);
    } catch (err) {
      console.error("Error fetching dishes:", err);
    }
  };

  //function to fetch category name
  const fetchCategoryName = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`/api/pos/fetch-category/${categoryId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch category");
      }
      const data = await res.json();
      //Saving the category name in state
      setCategoryName(data.category.name);
    } catch (err) {
      console.error("Error fetching category:", err);
    }
  };

  //Snipped that fetches dishes on the basis of category selected and also handles category name
  useEffect(() => {
    //When all dishes are selected
    if (categoryId === null) {
      fetchAllDishes();
      setCategoryName("All Dishes");
    } else {
      fetchDishByCategory();
      fetchCategoryName();
    }
  }, [categoryId]);

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.headerContainer}>
          <div className={styles.leftSide}>
            <div className={styles.componentHeader}>
              <h2>Manage Dishes</h2>
            </div>
          </div>
          <div className={styles.rightSide}>
            <div className={styles.searchbarContainer}>
              <Input
                type="text"
                className={styles.searchInput}
                placeholder="Search dishes"
              />
            </div>
            {/* First dialog trigger */}
            <AddDishDialog onDishAdded={fetchAllDishes}>
              <DialogTrigger asChild>
                <Button>
                  <SquarePlus className="mr-2" />
                  Add New Dishes
                </Button>
              </DialogTrigger>
            </AddDishDialog>
          </div>
        </div>
        <div className={styles.componentBody}>
          <div className={styles.componentHeaderContainer}>
            <div className={styles.leftSide}>
              <div className={styles.componentHeader}>
                <h3>
                  {categoryName} ({dishCount})
                </h3>
              </div>
            </div>
            <div className={styles.rightSide}>
              <div className={styles.sliderContainer}>
                <Button
                  variant="ghost"
                  onClick={handleGridView}
                  className={`${styles.iconLeftContainer} ${
                    !listView ? styles.inactive : ""
                  }`}
                >
                  <LayoutGrid className={styles.sliderIcon} />
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleListView}
                  className={`${styles.iconRightContainer} ${
                    listView ? styles.active : ""
                  }`}
                >
                  <List className={styles.sliderIcon} />
                </Button>
              </div>
              <div className={styles.filterContainer}>
                <Button variant="ghost" className={styles.filterButton}>
                  <SlidersHorizontal className={styles.filterIcon} />
                  Filter
                </Button>
              </div>
            </div>
          </div>

          <div className={styles.dishesContainer}>
            {/* Second dialog tigger */}
            <AddDishDialog onDishAdded={fetchAllDishes}>
              <DialogTrigger asChild>
                <div
                  className={`${
                    listView
                      ? styles.plusCardContainerList
                      : styles.plusCardContainer
                  } ${styles.dottedBorder}`}
                >
                  <div className={styles.addIconContainer}>
                    <Button className={styles.addIcon}>
                      <Plus />
                    </Button>
                  </div>
                  <div className={styles.cardText}>Add New Dish</div>
                </div>
              </DialogTrigger>
            </AddDishDialog>
            {dishes.map((dish, index) => (
              <div
                key={index}
                className={`${
                  listView
                    ? styles.addDishCardContainerList
                    : styles.addDishCardContainer
                } ${styles.solidBorder}`}
              >
                <div
                  className={`${
                    listView
                      ? styles.editIconContainerList
                      : styles.editIconContainer
                  }`}
                >
                  <CircleChevronDown
                    className={`${
                      listView ? styles.editIconList : styles.editIcon
                    }`}
                  />
                </div>
                <div
                  className={`${
                    listView ? styles.dishLeftSideList : styles.dishLeftSide
                  }`}
                >
                  <div className={styles.dishImage}>{dish.emoji}</div>
                  <div className={styles.dishDetails}>
                    <div className={styles.dishCategory}>
                      {dish.categoryName}
                    </div>
                    <div
                      className={
                        listView ? styles.dishNameList : styles.dishName
                      }
                    >
                      {dish.name}
                    </div>
                  </div>
                </div>
                <div className={styles.dishRightSide}>
                  <div
                    className={
                      listView ? styles.dishPriceList : styles.dishPrice
                    }
                  >
                    ${dish.price}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dishes;

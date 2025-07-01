// Author: Pritul Gohil

// File: DishesCards.jsx

// Description: This component is responsible for displaying the dishes in a card format. It also handles the addition, deletion, and editing of dishes. It also supports grid and list views for displaying the dishes. The component fetches data from the API to display the dishes and their details, including name, price, and availability status.

// (1) Remaining Tasks: Filter functionality is not implemented yet.

// (2) Remaining Task: The component also includes a search bar for searching dishes, but the search functionality is not implemented yet.

// (3) Remaining Task: It should also handle the category deletion and edit functionality, but these features are not implemented yet.

// (4) Remaining Task: Component is lengthy, should be broken down wherever possible for maintainability and readability.

// Remarks: After completing above tasks, the DishesCards.jsx will be fully functional until further update.

//-------------------------------------------------------------------------------------------------------------------------------------------------

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
  ChevronDown,
  SquarePen,
  Trash2,
  Pencil,
} from "lucide-react";
import { DialogTrigger } from "@/components/ui/dialog";
import AddDishDialog from "@/app/components/Pos/ManageDishes/AddDishDialog";
import { useRestaurantContext } from "@/context/RestaurantContext";
import DeleteDialog from "@/app/components/Pos/ManageDishes/DeleteDialog";
import EditDishDialog from "@/app/components/Pos/ManageDishes/EditDishDialog";
import EditCategoryDialog from "@/app/components/Pos/ManageDishes/EditCategoryDialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const Dishes = () => {
  //state for list view or grid view of dishes cards
  const [listView, setListView] = useState(false);

  //state for total dish count
  const [dishCount, setDishCount] = useState(0);

  //state to save categoryname based on categorySidebar category selection
  // const [categoryName, setCategoryName] = useState("");

  //state to handle delete dialog visibility
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  //state to save dish name to display in delete dialog
  const [selectedDish, setSelectedDish] = useState(null);

  //state to save dishId to delete the dish for passing in api
  const [selectedDishId, setSelectedDishId] = useState(null);

  //state for edit dialog visibility handle
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  // state holds the dish data to be edited and passed to the EditDishDialog
  const [editDishData, setEditDishData] = useState(null);

  //restaurant has restaurantId, categoryId has objectId, dishes has array of dishes, setDishes is setter function to set dishes
  const {
    restaurant,
    categoryId,
    dishes,
    setDishes,
    categoryName,
    setCategoryName,
    setTotalDishCount,
  } = useRestaurantContext();

  //dishes card view handlers
  const handleListView = () => setListView(true);
  const handleGridView = () => setListView(false);

  // function to fetch all dishes from API, runs by default or when all dishes on the CategorySidebar.jsx are selected
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

      const data = await res.json();

      if (res.ok) {
        const dishes = data.dishes || [];
        setDishes(dishes);
        setDishCount(dishes.length);
        setTotalDishCount(dishes.length);
      } else {
        console.error(
          "Failed to fetch dishes:",
          data.message || res.statusText
        );
      }
    } catch (err) {
      console.error("Error fetching dishes:", err);
    }
  };

  // function to fetch dishes by category from API, runs when a category is selected from the CategorySidebar.jsx
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
        setDishes([]); // Set to empty array on failed response
        setDishCount("0");
        throw new Error("Failed to fetch dishes");
      }
      const data = await res.json();
      setDishes(data.dishes);
      setDishCount(data.dishes.length);
    } catch (err) {
      console.error("Error fetching dishes:", err);
    }
  };

  // function to fetch category name to display in the title of the dishes card
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
      if (!res.ok) throw new Error("Failed to fetch category");
      const data = await res.json();
      setCategoryName(data.category.name);
    } catch (err) {
      console.error("Error fetching category:", err);
    }
  };

  //useEffect for displaying dishes based on category selection
  useEffect(() => {
    if (categoryId === null) {
      fetchAllDishes();
      setCategoryName("All Dishes");
    } else {
      fetchDishByCategory();
      fetchCategoryName();
    }
  }, [categoryId]);

  // handler for edit press on dropdown menu, sets the selected dish data to be edited and opens the edit dialog
  const handleEdit = (dish) => {
    setEditDishData(dish);
    setEditDialogOpen(true);
  };

  // handler for delete press on dropdown menu, sets the selected dish name for displaying in dialog and id to pass in api. Also, opens the delete dialog
  const handleDelete = (dish) => {
    setSelectedDish(dish.name);
    setSelectedDishId(dish._id);
    setDeleteDialogOpen(true);
  };

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
            {/* Triggers dialog and runs either of two functions to fetch updated dishes */}
            <AddDishDialog
              onDishAdded={fetchAllDishes}
              fetchByCategory={fetchDishByCategory}
            >
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
              {/* Displays categoryname and dishcount */}
              <div className={styles.componentHeader}>
                <h3>
                  {categoryName} ({dishCount})
                </h3>
              </div>
              {categoryId !== null && (
                <div className={styles.categoryEditContainer}>
                  <EditCategoryDialog
                    fetchAllDishes={fetchAllDishes}
                    fetchDishByCategory={fetchDishByCategory}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className={styles.editButtonContainer}
                      >
                        <Pencil className={styles.editIcon} />
                      </Button>
                    </DialogTrigger>
                  </EditCategoryDialog>
                </div>
              )}
            </div>
            <div className={styles.rightSide}>
              {/* Switch to handle list view or grid view of dishes cards */}
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
              {/* Not implement yet */}
              <div className={styles.filterContainer}>
                <Button variant="ghost" className={styles.filterButton}>
                  <SlidersHorizontal className={styles.filterIcon} />
                  Filter
                </Button>
              </div>
              {/* Not implemented yet */}
            </div>
          </div>

          <div className={styles.dishesContainer}>
            {/* Add dish card to add new dish */}
            <AddDishDialog
              onDishAdded={fetchAllDishes}
              fetchByCategory={fetchDishByCategory}
            >
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

            {/* Map through dishes and display them in card format */}
            {dishes.map((dish, index) => (
              <div
                key={index}
                className={`${
                  listView
                    ? styles.addDishCardContainerList
                    : styles.addDishCardContainer
                } ${styles.solidBorder}`}
              >
                {/* Edit and Delete dropdown for dish */}
                <div
                  className={`${
                    listView
                      ? styles.editIconContainerList
                      : styles.editIconContainer
                  }`}
                >
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className={styles.dropdownButton}
                      >
                        <ChevronDown
                          className={`${
                            listView ? styles.editIconList : styles.editIcon
                          }`}
                        />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(dish)}>
                        <SquarePen />
                        Edit
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        className="text-red-500"
                        onClick={() => handleDelete(dish)}
                      >
                        <Trash2 />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                {/* Gets a little bit messy here due to inaccurate class names, dishLeft and dishRight should be named top and bottom instead, but in list context it is right */}
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
                {!dish.available && (
                  <div className={styles.notAvailableLabel}></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* DeleteDialog for deleting dish */}
      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        dishName={selectedDish}
        dishId={selectedDishId}
        fetchAllDishes={fetchAllDishes}
        fetchDishByCategory={fetchDishByCategory}
      />
      {/* if editDishData is there, then only show the edit dialog, just a basic check */}
      {editDishData && (
        <EditDishDialog
          open={editDialogOpen}
          setOpen={setEditDialogOpen}
          dish={editDishData}
          onDishUpdated={fetchAllDishes}
          fetchByCategory={fetchDishByCategory}
        />
      )}
    </>
  );
};

export default Dishes;

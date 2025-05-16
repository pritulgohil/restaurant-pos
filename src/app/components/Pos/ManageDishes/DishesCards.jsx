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
} from "lucide-react";
import { DialogTrigger } from "@/components/ui/dialog";
import AddDishDialog from "@/app/components/Pos/ManageDishes/AddDishDialog";
import { useRestaurantContext } from "@/context/RestaurantContext";
import DeleteDialog from "@/app/components/Pos/ManageDishes/DeleteDialog";
import EditDishDialog from "@/app/components/Pos/ManageDishes/EditDishDialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const Dishes = () => {
  //state for list view or grid view of dishes cards
  const [listView, setListView] = useState(false);

  //state for dishes object
  const { dishes, setDishes } = useRestaurantContext();

  //state for total dish count
  const [dishCount, setDishCount] = useState(0);

  //state to save categoryname based on categorySidebar category selection
  const [categoryName, setCategoryName] = useState("");

  //context state - restaurant has restaurantId to fetch all dishes, categoryId is used to fetch dishes based on category, also the category name
  const { restaurant, categoryId } = useRestaurantContext();

  //state to handle delete dialog visibility
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  //state to save dish name to display in delete dialog
  const [selectedDish, setSelectedDish] = useState(null);

  //state to save dishId to delete the dish for passing in api
  const [selectedDishId, setSelectedDishId] = useState(null);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editDishData, setEditDishData] = useState(null);

  //dishes card view handlers
  const handleListView = () => setListView(true);
  const handleGridView = () => setListView(false);

  console.log("Dishes:", dishes);

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
      if (!res.ok) throw new Error("Failed to fetch dishes");
      const data = await res.json();
      setDishes(data.dishes);
      setDishCount(data.dishes.length);
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

  const handleEdit = (dish) => {
    setEditDishData(dish);
    setEditDialogOpen(true);
  };

  // handler for delete press on dropdown menu, sets the selected dish name and id, and opens the delete dialog
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
      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        dishName={selectedDish}
        dishId={selectedDishId}
        fetchAllDishes={fetchAllDishes}
        fetchDishByCategory={fetchDishByCategory}
      />
      {editDishData && (
        <EditDishDialog
          open={editDialogOpen}
          setOpen={setEditDialogOpen}
          dish={editDishData}
          onDishUpdated={fetchAllDishes}
        />
      )}
    </>
  );
};

export default Dishes;

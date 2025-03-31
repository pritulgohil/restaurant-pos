"use client";

import { useState } from "react";
import styles from "./Dishes.module.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { SquarePlus } from "lucide-react";

import { LayoutGrid } from "lucide-react";
import { List } from "lucide-react";
import { SlidersHorizontal } from "lucide-react";

const Dishes = () => {
  const [listView, setListView] = useState(false);

  const handleListView = () => {
    setListView(true);
  };

  const handleGridView = () => {
    setListView(false);
  };

  const dishes = new Array(15).fill({
    category: "Dessert",
    name: "Belgian Waffle",
    price: "$8.00",
    emoji: "🥗",
  });

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
            <div className={styles.addDishButton}>
              <Button>
                <SquarePlus />
                Add New Dishes
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.componentBody}>
          <div className={styles.componentHeaderContainer}>
            <div className={styles.leftSide}>
              <div className={styles.componentHeader}>
                <h3>Desserts (19)</h3>
              </div>
            </div>
            <div className={styles.rightSide}>
              <div className={styles.sliderContainer}>
                <div>
                  <Button
                    variant="ghost"
                    onClick={handleGridView}
                    className={`${styles.iconLeftContainer} ${
                      !listView ? styles.inactive : ""
                    }`}
                  >
                    <LayoutGrid className={styles.sliderIcon} />
                  </Button>
                </div>
                <div>
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
            <div
              className={`${styles.addDishCardContainer} ${styles.dottedBorder}`}
            >
              <div className={styles.addIconContainer}>
                <Button className={styles.addIcon}>
                  <Plus />
                </Button>
              </div>
              <div className={styles.cardText}>Add New Dish</div>
            </div>
            {dishes.map((dish, index) => (
              <div
                key={index}
                className={`${styles.addDishCardContainer} ${styles.solidBorder}`}
              >
                <div className={styles.dishImage}>{dish.emoji}</div>
                <div className={styles.dishDetails}>
                  <div className={styles.dishCategory}>{dish.category}</div>
                  <div className={styles.dishName}>{dish.name}</div>
                </div>
                <div className={styles.dishPrice}>{dish.price}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dishes;

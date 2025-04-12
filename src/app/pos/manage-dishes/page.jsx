"use client";

import { useState } from "react";
import CategorySidebar from "@/app/components/Pos/ManageDishes/CategorySidebar";
import styles from "./page.module.css";
import DishesCards from "@/app/components/Pos/ManageDishes/DishesCards";

const page = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  return (
    <>
      <div className={styles.mainContainer}>
        <CategorySidebar />
        <DishesCards />
      </div>
    </>
  );
};

export default page;

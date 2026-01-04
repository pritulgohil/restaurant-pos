import SettingsSidebar from "@/app/components/Pos/Settings/SettingsSidebar/SettingsSidebar";
import React from "react";
import styles from "./page.module.css";
import RestaurantSettings from "@/app/components/Pos/Settings/RestaurantSettings/RestaurantSettings";

const page = () => {
  return (
    <>
      <div className={styles.mainContainer}>
        <SettingsSidebar />
        <RestaurantSettings />
      </div>
    </>
  );
};

export default page;

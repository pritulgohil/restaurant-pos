import SettingsSidebar from "@/app/components/Pos/Settings/SettingsSidebar/SettingsSidebar";
import UserSettings from "@/app/components/Pos/Settings/UserSettings/UserSettings";
import React from "react";
import styles from "./page.module.css";

const page = () => {
  return (
    <>
      <div className={styles.mainContainer}>
        <SettingsSidebar />
        <UserSettings />
      </div>
    </>
  );
};

export default page;

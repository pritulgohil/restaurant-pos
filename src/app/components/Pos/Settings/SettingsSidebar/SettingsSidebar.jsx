"use client";
import React from "react";
import styles from "./SettingsSidebar.module.css";
import { User, Store } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

const SettingsSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const handleNavigation = (path) => {
    router.push(path);
  };
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.settingsTitleContainer}>
          <h2>Settings</h2>
        </div>
        <div className={styles.subSettingsContainer}>
          <ul className={styles.subSettingsList}>
            <li
              className={
                pathname === "/pos/settings/user" ? styles.activeSettings : ""
              }
              onClick={() => handleNavigation("/pos/settings/user")}
            >
              <User size={16} />
              User
            </li>
            <li
              className={
                pathname === "/pos/settings/restaurant"
                  ? styles.activeSettings
                  : ""
              }
              onClick={() => handleNavigation("/pos/settings/restaurant")}
            >
              <Store size={16} />
              Restaurant
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SettingsSidebar;

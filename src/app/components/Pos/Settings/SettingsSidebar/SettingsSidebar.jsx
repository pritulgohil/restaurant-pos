import React from "react";
import styles from "./SettingsSidebar.module.css";
import { User, Store } from "lucide-react";

const SettingsSidebar = () => {
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.settingsTitleContainer}>
          <h2>Settings</h2>
        </div>
        <div className={styles.subSettingsContainer}>
          <ul className={styles.subSettingsList}>
            <li className={styles.activeSettings}>
              <User size={16} />
              User
            </li>
            <li>
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

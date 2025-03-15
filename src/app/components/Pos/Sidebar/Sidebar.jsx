import React from "react";
import styles from "./Sidebar.module.css";
import { LayoutDashboard } from "lucide-react";
import { ArrowRightLeft } from "lucide-react";
import { TableCellsMerge } from "lucide-react";
import { Soup } from "lucide-react";
import { Users } from "lucide-react";
import { Settings } from "lucide-react";
import { Globe } from "lucide-react";
import { LogOut } from "lucide-react";

const Sidebar = () => {
  return (
    <>
      <div className={`${styles.mainContainer} shadow-md`}>
        <div className={styles.topSidebar}>
          <ul>
            <li>
              <LayoutDashboard className={styles.sidebarIcon} />
              Dashboard
            </li>
            <li>
              <ArrowRightLeft className={styles.sidebarIcon} />
              Order Line
            </li>
            <li>
              <TableCellsMerge className={styles.sidebarIcon} />
              Manage Table
            </li>
            <li>
              <Soup className={styles.sidebarIcon} />
              Manage Dishes
            </li>
            <li>
              <Users className={styles.sidebarIcon} />
              Customers
            </li>
          </ul>
        </div>
        <div className={styles.bottomSidebar}>
          <ul>
            <li>
              <Settings className={styles.sidebarIcon} />
              Settings
            </li>
            <li>
              <Globe className={styles.sidebarIcon} />
              Help Center
            </li>
            <li>
              <LogOut className={styles.sidebarIcon} />
              Logout
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

import React from "react";
import styles from "./Sidebar.module.css";
import { LayoutDashboard } from "lucide-react";
import { ArrowRightLeft } from "lucide-react";
import { TableCellsMerge } from "lucide-react";
import { Soup } from "lucide-react";
import { Users } from "lucide-react";

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
        <div className={styles.bottomSidebar}></div>
      </div>
    </>
  );
};

export default Sidebar;

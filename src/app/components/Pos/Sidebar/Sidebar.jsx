"use client";

import styles from "./Sidebar.module.css";
import { LayoutDashboard, ClipboardList } from "lucide-react";
import { ArrowRightLeft } from "lucide-react";
import { TableCellsMerge } from "lucide-react";
import { Soup } from "lucide-react";
import { Users } from "lucide-react";
import { Settings } from "lucide-react";
import { Globe } from "lucide-react";
import { LogOut } from "lucide-react";
import { LoaderCircle } from "lucide-react";
import { History } from "lucide-react";
import { useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useRestaurantContext } from "@/context/RestaurantContext";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [logoutState, setLogoutState] = useState(false);
  const { setLoggedInUser } = useAuthContext();
  const { setCategoryId, setCategories, setDishes, setRestaurant } =
    useRestaurantContext();

  const handleLogout = () => {
    setLogoutState(true);
    setTimeout(() => {
      localStorage.removeItem("loggedInUser");
      setLoggedInUser(null);
      setDishes([]);
      setCategories([]);
      setCategoryId(null);
      setRestaurant(null);
      router.push("/login");
    }, 2000);
  };

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <>
      <div className={`${styles.mainContainer} shadow-md`}>
        <div className={styles.topSidebar}>
          <ul>
            <li
              className={` ${
                pathname === "/pos/dashboard"
                  ? styles.active
                  : styles.sidebarItem
              }`}
              onClick={() => handleNavigation("/pos/manage-dishes")}
            >
              <LayoutDashboard className={styles.sidebarIcon} />
              Dashboard
            </li>
            <li
              className={` ${
                pathname === "/pos/order-line"
                  ? styles.active
                  : styles.sidebarItem
              }`}
              onClick={() => handleNavigation("/pos/order-line")}
            >
              <ArrowRightLeft className={styles.sidebarIcon} />
              Order Line
            </li>
            <li
              className={` ${
                pathname === "/pos/order-board"
                  ? styles.active
                  : styles.sidebarItem
              }`}
              onClick={() => handleNavigation("/pos/order-board")}
            >
              <ClipboardList className={styles.sidebarIcon} />
              Order Board
            </li>
            <li
              className={` ${
                pathname === "/pos/manage-table"
                  ? styles.active
                  : styles.sidebarItem
              }`}
              onClick={() => handleNavigation("/pos/manage-table")}
            >
              <TableCellsMerge className={styles.sidebarIcon} />
              Manage Table
            </li>
            <li
              className={` ${
                pathname === "/pos/manage-dishes"
                  ? styles.active
                  : styles.sidebarItem
              }`}
              onClick={() => handleNavigation("/pos/manage-dishes")}
            >
              <Soup className={styles.sidebarIcon} />
              Manage Dishes
            </li>
            <li
              className={` ${
                pathname === "/pos/manage-orders"
                  ? styles.active
                  : styles.sidebarItem
              }`}
              onClick={() => handleNavigation("/pos/manage-orders")}
            >
              <History className={styles.sidebarIcon} />
              Manage Orders
            </li>
            <li
              className={` ${
                pathname === "/pos/customers"
                  ? styles.active
                  : styles.sidebarItem
              }`}
              onClick={() => handleNavigation("/pos/manage-dishes")}
            >
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
            <li onClick={handleLogout}>
              {logoutState ? (
                <>
                  <LoaderCircle
                    className={`animate-spin ${styles.sidebarIcon}`}
                  />
                  Logging out...
                </>
              ) : (
                <>
                  <LogOut className={styles.sidebarIcon} />
                  Logout
                </>
              )}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

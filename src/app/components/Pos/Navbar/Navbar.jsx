"use client";

import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { Bell, ChevronDown, Check, SquarePlus } from "lucide-react";
import { useAuthContext } from "@/context/AuthContext";
import { useRestaurantContext } from "@/context/RestaurantContext";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [user, setUser] = useState({ firstname: "", lastname: "" });
  const { loggedInUser } = useAuthContext();
  const { restaurantName } = useRestaurantContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (!loggedInUser) return;

    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch(`/api/pos/fetch-user/${loggedInUser}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await res.json();
        console.log("Fetched user data:", data);
        setUser({
          firstname: data.firstname,
          lastname: data.lastname,
        });
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, [loggedInUser]);

  return (
    <div className={`${styles.mainContainer} shadow-sm`}>
      <div className={styles.logoContainer}>
        <h1>Plates Up</h1>
      </div>
      <div className={styles.adminContainer}>
        <div className={styles.bellIconContainer}>
          <Bell className={styles.bellIcon} />
        </div>
        <div className={styles.restaurantContainer}>
          <div className={styles.userName}>
            <div className={styles.name}>Managing</div>
            <DropdownMenu onOpenChange={(open) => setIsDropdownOpen(open)}>
              <DropdownMenuTrigger asChild>
                <div
                  className={`${styles.role} flex items-center gap-1 cursor-pointer`}
                >
                  {restaurantName}
                  <ChevronDown
                    className={`w-3 h-3 transition-transform duration-200 ${
                      isDropdownOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <div className={styles.menuContainer}>
                  <DropdownMenuItem className="bg-green-300 text-green-900 hover:bg-green-400 focus:bg-green-400 text-sm cursor-pointer">
                    <div className={styles.menuItem}>
                      <Check className="w-4" />
                      {restaurantName}
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="border border-green-600 text-green-600 focus:text-green-700 hover:border-green-700 text-sm cursor-pointer">
                    <div className={styles.menuItem}>
                      <SquarePlus className="w-4" />
                      Add Restaurant
                    </div>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className={styles.userContainer}>
          <div className={styles.avatarContainer}>
            <img src="/user-avatar/chef.jpg" alt="" />
          </div>
          <div className={styles.userName}>
            <div className={styles.name}>
              {user.firstname} {user.lastname}
            </div>
            <div className={styles.role}>Admin</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

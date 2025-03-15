"use client";

import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { Bell } from "lucide-react";
import { useAuthContext } from "@/context/AuthContext";

const Navbar = () => {
  const [user, setUser] = useState({ firstname: "", lastname: "" });
  const { loggedInUser, setLoggedInUser } = useAuthContext();

  useEffect(() => {
    if (!loggedInUser) return;

    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/pos/fetch-user/${loggedInUser}`);
        if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await res.json();
        console.log("Fetched user data:", data);
        setUser({
          firstname: data.user.firstname,
          lastname: data.user.lastname,
        });
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      <div className={`${styles.mainContainer} shadow-md`}>
        <div className={styles.logoContainer}>
          <h1>Plates Up</h1>
        </div>
        <div className={styles.adminContainer}>
          <div className={styles.bellIconContainer}>
            <Bell className={styles.bellIcon} />
          </div>
          <div className={styles.userContainer}>
            <div className={styles.avatarContainer}>
              <img src="user-avatar/chef.jpg" alt="" />
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
    </>
  );
};

export default Navbar;

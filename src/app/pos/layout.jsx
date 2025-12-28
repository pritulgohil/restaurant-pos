"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Pos/Navbar/Navbar";
import Sidebar from "../components/Pos/Sidebar/Sidebar";
import { useAuthContext } from "@/context/AuthContext";
import styles from "./layout.module.css";

const Page = ({ children }) => {
  useEffect(() => {
    document.title = "POS - Plates Up";
  }, []);
  const { loggedInUser } = useAuthContext();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Make sure the component is mounted before checking loggedInUser
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !loggedInUser) {
      router.push("/login"); // Redirect to the login page if not logged in
    }
  }, [isMounted, loggedInUser, router]);

  // Return null or a loading spinner until the component is mounted
  if (!isMounted || !loggedInUser) {
    return null; // Could also return a loading spinner
  }

  return (
    <>
      <div className={styles.navbarContainer}>
        <Navbar />
      </div>
      <div className={styles.mainContainer}>
        <div className={styles.sidebarContainer}>
          <Sidebar />
        </div>
        <div className={styles.componentContainer}>
          <main>{children}</main>
        </div>
      </div>
    </>
  );
};

export default Page;

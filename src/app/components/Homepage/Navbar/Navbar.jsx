"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Navbar.module.css";
const Navbar = () => {
  const [mobileMenuVisibility, setMobileMenuVisibility] = useState(false);
  const router = useRouter();

  const handleLoginButton = () => {
    router.push("/login");
  };

  const handleMobileMenuVisibility = () => {
    setMobileMenuVisibility(true);
  };

  const handleCloseMobileMenu = () => {
    setMobileMenuVisibility(false);
  };

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.navbarContainer}>
          <div className={styles.logoContainer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.0"
              stroke="currentColor"
              className={styles.hamBurgerIcon}
              onClick={handleMobileMenuVisibility}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
            Plates Up
          </div>
          <div className={styles.menuContainer}>
            <nav>
              <ul className={styles.menuItemsContainer}>
                <li>
                  <a href="#home">Home Page</a>
                </li>
                <li>
                  <a href="#about">Our Services</a>
                </li>
                <li>
                  <a href="#services">Contact Us</a>
                </li>
                <li>
                  <a href="#contact">More Info</a>
                </li>
              </ul>
            </nav>
          </div>
          <div className={styles.signUpButtonContainer}>
            <button
              onClick={handleLoginButton}
              className={`${styles.signUpButton} shadow-sm`}
            >
              Login
            </button>
          </div>
        </div>
      </div>
      <div
        className={`${styles.mobileMenuContainer} ${
          mobileMenuVisibility ? styles.showMobileMenuContainer : ""
        }`}
      >
        <div className={styles.mobileLogoContainer}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={styles.mobileMenuCloseIcon}
            onClick={handleCloseMobileMenu}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
          <h1>Plates Up</h1>
        </div>
        <div className={styles.mobileMenu}>
          <nav>
            <ul className={styles.menuItemsContainer}>
              <li>
                <a href="#home">Home Page</a>
              </li>
              <li>
                <a href="#about">Our Services</a>
              </li>
              <li>
                <a href="#services">Contact Us</a>
              </li>
              <li>
                <a href="#contact">More Info</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;

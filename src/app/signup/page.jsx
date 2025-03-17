"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import Signup from "../components/Signup/Signup";
import SignupImage from "../components/Signup/SignupImage";
import SignupOnboarding from "../components/Signup/SignupOnboarding";
import Navbar from "../components/Homepage/Navbar/Navbar";

const page = () => {
  const [onboardingVisibility, setOnboardingVisibility] = useState(false);
  useEffect(() => {
    document.title = "Sign Up - Plates Up";
  }, []);
  return (
    <>
      <Navbar />
      <div className={styles.mainContainer}>
        <div className={styles.leftSide}>
          <SignupImage />
        </div>
        <div className={styles.rightSide}>
          {onboardingVisibility ? (
            <SignupOnboarding />
          ) : (
            <Signup setOnboardingVisibility={setOnboardingVisibility} />
          )}
        </div>
      </div>
    </>
  );
};

export default page;

"use client";
import React from "react";
import styles from "./page.module.css";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  return (
    <div className={styles.pageWrapper}>
      <video className={styles.backgroundVideo} autoPlay muted loop playsInline>
        <source src="/background.mp4" type="video/mp4" />
      </video>

      <div className={styles.overlay} />

      <div className={styles.mainContainer}>
        <div className={styles.contentContainer}>
          <div className={styles.siteHeader}>Plates Up</div>
          <div className={styles.comingSoon}>Coming Soon!</div>
          <div className={styles.description}>
            We’re building something great here. <br />
            This page will be available in a future update.
          </div>
          <div className={styles.backButton}>
            <Button
              variant="ghost"
              size="lg"
              className="border border-2 flex items-center gap-2"
              onClick={() => router.back()}
            >
              <ChevronLeft strokeWidth={3} />
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

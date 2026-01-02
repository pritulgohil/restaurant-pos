"use client";
import React from "react";
import styles from "./RestaurantSettings.module.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRestaurantContext } from "@/context/RestaurantContext";

const RestaurantSettings = () => {
  const { restaurantName, restaurantCuisine } = useRestaurantContext();
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.settingsTitle}>
          <h3>Restaurant Settings</h3>
        </div>
        <div className={styles.settingsContainer}>
          <div className={styles.settingsGroup}>
            <div className={styles.settingGroupTitle}>Restaurant Details</div>
            <div className={styles.settingsGroupFields}>
              <div className={styles.userDetails}>
                <div className={styles.settingsField}>
                  <div className={styles.fieldLabel}>
                    <Label htmlFor="restaurantname">Restaurant Name</Label>
                  </div>
                  <div className={styles.fieldValue}>
                    <Input
                      type="text"
                      id="restaurantname"
                      placeholder="Restaurant Name"
                      className={styles.inputField}
                      defaultValue={restaurantName}
                    />
                  </div>
                </div>
                <div className={styles.settingsField}>
                  <div className={styles.fieldLabel}>
                    <Label htmlFor="cuisinetype">Cuisine Type</Label>
                  </div>
                  <div className={styles.fieldValue}>
                    <Input
                      type="text"
                      id="cuisinetype"
                      placeholder="Cuisine Type"
                      defaultValue={restaurantCuisine}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.updatePasswordButton}>
                <Button variant="outline">Update Details</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RestaurantSettings;

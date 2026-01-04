"use client";
import React, { useState } from "react";
import styles from "./RestaurantSettings.module.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRestaurantContext } from "@/context/RestaurantContext";
import { useAuthContext } from "@/context/AuthContext";
import { LoaderCircle } from "lucide-react";

const RestaurantSettings = () => {
  const {
    restaurantName,
    restaurantCuisine,
    updateRestaurant,
    restaurant,
    fetchRestaurant,
  } = useRestaurantContext();
  const { loggedInUser } = useAuthContext();
  const [restaurantDetails, setRestaurantDetails] = useState({
    restaurantName: restaurantName,
    cuisineType: restaurantCuisine,
  });
  const [loading, setLoading] = useState(false);
  const handleInputChange = (e) => {
    const { id, value } = e.target;

    setRestaurantDetails((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  const handleUpdateDetails = async () => {
    setLoading(true);
    await updateRestaurant({
      restaurantId: restaurant,
      payload: restaurantDetails,
    });
    setTimeout(() => {
      setLoading(false);
      fetchRestaurant(loggedInUser);
    }, 2000);
  };
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
                      id="restaurantName"
                      placeholder="Restaurant Name"
                      className={styles.inputField}
                      value={restaurantDetails.restaurantName}
                      onChange={handleInputChange}
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
                      id="cuisineType"
                      placeholder="Cuisine Type"
                      value={restaurantDetails.cuisineType}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.updatePasswordButton}>
                {loading ? (
                  <Button variant="outline" disabled>
                    <LoaderCircle className="animate-spin" />
                    Updating...
                  </Button>
                ) : (
                  <Button variant="outline" onClick={handleUpdateDetails}>
                    Update Details
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RestaurantSettings;

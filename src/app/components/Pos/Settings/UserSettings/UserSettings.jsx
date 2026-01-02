"use client";

import React, { useState, useEffect } from "react";
import styles from "./UserSettings.module.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthContext } from "@/context/AuthContext";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

const UserSettings = () => {
  const { user, loggedInUser, refreshUser } = useAuthContext();
  const [updateUsername, setUpdateUsername] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
  });
  const [detailsLoader, setDetailsLoader] = useState(false);
  useEffect(() => {
    setUpdateUsername({
      firstname: user.firstname,
      lastname: user.lastname,
    });
  }, [user]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUpdateUsername((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const updateUserDetails = async () => {
    const token = localStorage.getItem("token");
    try {
      setDetailsLoader(true);
      // First API Call: Update the user's firstname and lastname
      const userUpdateResponse = await fetch(
        `/api/auth/signup/${loggedInUser}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateUsername),
        }
      );

      const userUpdateResult = await userUpdateResponse.json();
      setTimeout(() => {
        setDetailsLoader(false);
        toast.success("User details updated successfully.");
        refreshUser();
      }, 2000);

      if (!userUpdateResponse.ok) {
        console.error("User update error:", userUpdateResult.error);
        return; // If updating the user fails, exit the function
      }
    } catch (error) {
      console.error("An error occurred while updating user details:", error);
    }
  };

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.settingsTitle}>
          <h3>User Settings</h3>
        </div>
        <div className={styles.settingsContainer}>
          <div className={styles.settingsGroup}>
            <div className={styles.settingGroupTitle}>Personal Information</div>
            <div className={styles.settingsGroupFields}>
              <div className={styles.profileImage}>
                <img src="/user-avatar/male.png" alt="" />
                <Button variant="outline" size="sm" disabled>
                  Edit Picture
                </Button>
              </div>
              <div className={styles.userDetails}>
                <div className={styles.settingsField}>
                  <div className={styles.fieldLabel}>
                    <Label htmlFor="email">Email</Label>
                  </div>
                  <div className={styles.fieldValue}>
                    <Input
                      type="email"
                      id="email"
                      placeholder="Email"
                      defaultValue={user.email}
                      disabled
                    />
                  </div>
                </div>
                <div className={styles.settingsField}>
                  <div className={styles.fieldLabel}>
                    <Label htmlFor="email">First Name</Label>
                  </div>
                  <div className={styles.fieldValue}>
                    <Input
                      type="text"
                      id="firstname"
                      placeholder="First Name"
                      value={updateUsername.firstname}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className={styles.settingsField}>
                  <div className={styles.fieldLabel}>
                    <Label htmlFor="email">Last Name</Label>
                  </div>
                  <div className={styles.fieldValue}>
                    <Input
                      type="text"
                      id="lastname"
                      placeholder="Last Name"
                      value={updateUsername.lastname}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.updatePasswordButton}>
                {detailsLoader ? (
                  <Button variant="outline" disabled>
                    <LoaderCircle className="animate-spin" />
                    Updating...
                  </Button>
                ) : (
                  <Button variant="outline" onClick={updateUserDetails}>
                    Update Details
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div className={styles.settingsGroup}>
            <div className={styles.settingGroupTitle}>Change Password</div>
            <div className={styles.settingsGroupFields}>
              <div className={styles.userDetails}>
                <div className={styles.settingsField}>
                  <div className={styles.fieldLabel}>
                    <Label htmlFor="email">Old Password</Label>
                  </div>
                  <div className={styles.fieldValue}>
                    <Input
                      type="password"
                      id="oldpassword"
                      placeholder="Old Password"
                    />
                  </div>
                </div>
                <div className={styles.settingsField}>
                  <div className={styles.fieldLabel}>
                    <Label htmlFor="email">New Password</Label>
                  </div>
                  <div className={styles.fieldValue}>
                    <Input
                      type="password"
                      id="newpassword"
                      placeholder="New Password"
                      className={styles.inputField}
                    />
                  </div>
                </div>
                <div className={styles.settingsField}>
                  <div className={styles.fieldLabel}>
                    <Label htmlFor="email">New Password Again</Label>
                  </div>
                  <div className={styles.fieldValue}>
                    <Input
                      type="password"
                      id="newpasswordagain"
                      placeholder="New Password Again"
                    />
                  </div>
                </div>
              </div>
              <div className={styles.updatePasswordButton}>
                <Button variant="outline">Update Password</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserSettings;

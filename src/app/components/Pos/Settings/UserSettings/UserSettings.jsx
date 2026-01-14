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
  const [updatePassword, setUpdatePassword] = useState({
    oldPassword: "",
    newPassword: "",
    newPasswordAgain: "",
  });
  const [detailsLoader, setDetailsLoader] = useState(false);
  useEffect(() => {
    setUpdateUsername({
      firstname: user.firstname,
      lastname: user.lastname,
    });
  }, [user]);

  const handlePasswordChange = (e) => {
    const { id, value } = e.target;
    setUpdatePassword((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUpdateUsername((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const updateUserDetails = async () => {
    try {
      setDetailsLoader(true);
      // First API Call: Update the user's firstname and lastname
      const userUpdateResponse = await fetch(
        `/api/auth/signup/${loggedInUser}`,
        {
          method: "PATCH",
          credentials: "include",
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

  const updateUserPassword = async () => {
    try {
      const passwordUpdateResponse = await fetch(
        `/api/auth/change-password/${loggedInUser}`,
        {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({
            currentPassword: updatePassword.oldPassword,
            newPassword: updatePassword.newPassword,
            confirmNewPassword: updatePassword.newPasswordAgain,
          }),
        }
      );

      const passwordUpdateResult = await passwordUpdateResponse.json();
      if (passwordUpdateResponse.ok) {
        toast.success("Password updated successfully.");
        setUpdatePassword({
          oldPassword: "",
          newPassword: "",
          newPasswordAgain: "",
        });
      } else {
        console.error("Password update error:", passwordUpdateResult.error);
        toast.error(passwordUpdateResult.error || "Failed to update password.");
      }
    } catch (error) {
      console.error("An error occurred while updating password:", error);
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
                      id="oldPassword"
                      placeholder="Old Password"
                      onChange={handlePasswordChange}
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
                      id="newPassword"
                      placeholder="New Password"
                      className={styles.inputField}
                      onChange={handlePasswordChange}
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
                      id="newPasswordAgain"
                      placeholder="New Password Again"
                      onChange={handlePasswordChange}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.updatePasswordButton}>
                <Button variant="outline" onClick={updateUserPassword}>
                  Update Password
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserSettings;

"use client";

import React, { useEffect, useState } from "react";
import styles from "./UserSettings.module.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthContext } from "@/context/AuthContext";

const UserSettings = () => {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const { loggedInUser } = useAuthContext();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token || !loggedInUser) {
          console.error("No token or userId found");
          return;
        }

        const res = await fetch(`/api/pos/fetch-user/${loggedInUser}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch user");
        }

        const data = await res.json();

        setUser({
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

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
                      id="firstName"
                      placeholder="First Name"
                      defaultValue={user.firstname}
                      className={styles.inputField}
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
                      id="lastName"
                      placeholder="Last Name"
                      defaultValue={user.lastname}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.updatePasswordButton}>
                <Button variant="outline">Update Details</Button>
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

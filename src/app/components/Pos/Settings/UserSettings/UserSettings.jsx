import React from "react";
import styles from "./UserSettings.module.css";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const UserSettings = () => {
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.settingsTitle}>
          <h3>User Settings</h3>
        </div>
        <div className={styles.settingsContainer}>
          <div className={styles.settingsGroup}>
            <div className={styles.settingGroupTitle}>Personal Information</div>
            {/* <Separator className="my-4" /> */}
            <div className={styles.settingsGroupFields}>
              <div className={styles.profileImage}>
                <img src="/user-avatar/male.png" alt="" />
                <Button variant="outline" size="sm">
                  <Pen />
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
                      value="pritulgohil@gmail.com"
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
                      value="Pritul"
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
                      value="Gohil"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserSettings;

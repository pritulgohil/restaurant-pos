import React from "react";
import styles from "./ManageTable.module.css";
import { Input } from "@/components/ui/input";
import { Plus, Armchair, CircleUser, Phone, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const ManageTable = () => {
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.leftSideContainer}>
          <div className={styles.searchBarContainer}>
            <div className={styles.searchBar}>
              <Input
                className="bg-white"
                type="email"
                placeholder="Search Customers"
              />
            </div>
            <div className={styles.filterButton}>
              <Button variant="outline" size="icon">
                <Plus />
              </Button>
            </div>
          </div>
          <div className={styles.customerContainer}>
            <div className={styles.customerCardContainer}>
              <div className={styles.customerCard}>
                <div className={styles.timeCard}>
                  7:30
                  <br />
                  PM
                </div>
                <div className={styles.customerDetails}>
                  <div className={styles.customerName}>John Doe</div>
                  <div className={styles.tableDetails}>
                    <div className={styles.table}>
                      <Armchair size={16} color="gray" />
                      02
                    </div>
                    <div className={styles.people}>
                      <CircleUser size={16} color="gray" />4
                    </div>
                  </div>
                  <div className={styles.phoneNumber}>
                    <Phone size={16} color="gray" />
                    (519)-740-9945
                  </div>
                </div>
                <div className={styles.paymentStatus}>
                  <div className={styles.checkIconContainer}>
                    <Check size={10} color="white" strokeWidth={3} />
                  </div>
                  Payment
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageTable;

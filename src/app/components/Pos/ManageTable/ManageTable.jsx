import React from "react";
import styles from "./ManageTable.module.css";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
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
        </div>
      </div>
    </>
  );
};

export default ManageTable;

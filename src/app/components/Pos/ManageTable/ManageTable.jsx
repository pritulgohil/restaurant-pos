import React from "react";
import styles from "./ManageTable.module.css";
import { Input } from "@/components/ui/input";
import { Plus, Armchair, CircleUser, ListOrdered, Check } from "lucide-react";
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
                <div className={styles.firstContainer}>
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
                        Table 01
                      </div>
                      <div className={styles.people}>
                        <CircleUser size={14} color="gray" />4
                      </div>
                    </div>
                    <div className={styles.phoneNumber}>
                      <ListOrdered size={16} color="gray" />
                      Order #7a0e34
                    </div>
                  </div>
                </div>
                <div className={styles.secondContainer}>
                  <div className={styles.paymentStatus}>
                    <div className={styles.checkIconContainer}>
                      <Check size={10} color="white" strokeWidth={3} />
                    </div>
                    Payment
                  </div>
                </div>
              </div>
              <div className={styles.customerCard}>
                <div className={styles.firstContainer}>
                  <div className={styles.timeCard}>
                    9:47
                    <br />
                    PM
                  </div>
                  <div className={styles.customerDetails}>
                    <div className={styles.customerName}>Tyson Schell</div>
                    <div className={styles.tableDetails}>
                      <div className={styles.table}>
                        <Armchair size={16} color="gray" />
                        Table 02
                      </div>
                      <div className={styles.people}>
                        <CircleUser size={14} color="gray" />4
                      </div>
                    </div>
                    <div className={styles.phoneNumber}>
                      <ListOrdered size={16} color="gray" />
                      No order assigned
                    </div>
                  </div>
                </div>
                <div className={styles.secondContainer}>
                  <div className={styles.paymentStatus}>
                    <div className={styles.UncheckIconContainer}>
                      <Check size={10} color="white" strokeWidth={3} />
                    </div>
                    Unpaid
                  </div>
                </div>
              </div>
              <div className={styles.customerCard}>
                <div className={styles.firstContainer}>
                  <div className={styles.freeTimeCard}>Free</div>
                  <div className={styles.customerDetails}>
                    <div className={styles.tableDetails}>
                      <div className={styles.table}>
                        <Armchair size={16} color="gray" />
                        Table 03
                      </div>
                      <div className={styles.people}>
                        <CircleUser size={14} color="gray" />0
                      </div>
                    </div>
                    <div className={styles.phoneNumber}>
                      <ListOrdered size={16} color="gray" />
                      No order assigned
                    </div>
                  </div>
                </div>
                <div className={styles.secondContainer}>
                  <div className={styles.paymentStatus}>
                    <div className={styles.UncheckIconContainer}>
                      <Check size={10} color="white" strokeWidth={3} />
                    </div>
                    Unpaid
                  </div>
                </div>
              </div>
              <div className={styles.customerCard}>
                <div className={styles.firstContainer}>
                  <div className={styles.freeTimeCard}>Free</div>
                  <div className={styles.customerDetails}>
                    <div className={styles.tableDetails}>
                      <div className={styles.table}>
                        <Armchair size={16} color="gray" />
                        Table 04
                      </div>
                      <div className={styles.people}>
                        <CircleUser size={14} color="gray" />0
                      </div>
                    </div>
                    <div className={styles.phoneNumber}>
                      <ListOrdered size={16} color="gray" />
                      No order assigned
                    </div>
                  </div>
                </div>
                <div className={styles.secondContainer}>
                  <div className={styles.paymentStatus}>
                    <div className={styles.UncheckIconContainer}>
                      <Check size={10} color="white" strokeWidth={3} />
                    </div>
                    Unpaid
                  </div>
                </div>
              </div>
              <div className={styles.customerCard}>
                <div className={styles.firstContainer}>
                  <div className={styles.freeTimeCard}>Free</div>
                  <div className={styles.customerDetails}>
                    <div className={styles.tableDetails}>
                      <div className={styles.table}>
                        <Armchair size={16} color="gray" />
                        Table 05
                      </div>
                      <div className={styles.people}>
                        <CircleUser size={14} color="gray" />0
                      </div>
                    </div>
                    <div className={styles.phoneNumber}>
                      <ListOrdered size={16} color="gray" />
                      No order assigned
                    </div>
                  </div>
                </div>
                <div className={styles.secondContainer}>
                  <div className={styles.paymentStatus}>
                    <div className={styles.UncheckIconContainer}>
                      <Check size={10} color="white" strokeWidth={3} />
                    </div>
                    Unpaid
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

export default ManageTable;

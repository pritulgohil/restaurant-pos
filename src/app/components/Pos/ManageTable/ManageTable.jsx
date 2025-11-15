"use client";

import React, { useState, useEffect } from "react";
import styles from "./ManageTable.module.css";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Armchair,
  CircleUser,
  ListOrdered,
  Check,
  UsersRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AddTableDialog from "@/app/components/Pos/ManageTable/AddTableDialog";
import { useRestaurantContext } from "@/context/RestaurantContext";

const ManageTable = () => {
  const { restaurant } = useRestaurantContext();
  const [tables, setTables] = useState([]);

  const fetchTables = async () => {
    if (!restaurant) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/pos/fetch-tables/${restaurant}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to fetch tables");
      } else {
        setTables(data.tables);
        console.log("Fetched tables:", data.tables);
      }
    } catch (err) {
      console.error("Network error:", err);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchTables();
  }, [restaurant]);
  // set the create table api to have isOccupied as boolean value
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
              {tables.map((table) => (
                <div key={table._id} className={styles.customerCard}>
                  <div className={styles.firstContainer}>
                    <div className={styles.freeTimeCard}>
                      {table.isOccupied ? "Occupied" : "Free"}
                    </div>
                    <div className={styles.customerDetails}>
                      <div className={styles.tableDetails}>
                        <div className={styles.table}>
                          <Armchair size={16} color="gray" />
                          Table {table.tableNumber.toString().padStart(2, "0")}
                        </div>
                        <div className={styles.people}>
                          <CircleUser size={14} color="gray" />
                          {table.currentOccupancy || 0}
                        </div>
                      </div>
                      <div className={styles.phoneNumber}>
                        <ListOrdered size={16} color="gray" />
                        {table.currentOrder
                          ? table.currentOrder
                          : "No order assigned"}
                      </div>
                    </div>
                  </div>
                  <div className={styles.secondContainer}>
                    <div className={styles.paymentStatus}>
                      <div className={styles.UncheckIconContainer}>
                        <Check size={10} color="white" strokeWidth={3} />
                      </div>
                      {table.isPaid ? "Paid" : "Unpaid"}
                    </div>
                  </div>
                </div>
              ))}

              {/* <div className={styles.customerCard}>
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
              </div> */}
            </div>
          </div>
          <div className={styles.addTableButtonContainer}>
            <AddTableDialog onTableAdded={fetchTables} />
          </div>
        </div>
        <div className={styles.rightSideContainer}>
          <h2 className={styles.ManageTableHeader}>Manage Table</h2>
          <div className={styles.tableLegendContainer}>
            <div className={styles.tableLegendItem}>
              <div className={styles.OccupiedIndicator}></div>
              <div className={styles.legendLabel}>Occupied</div>
            </div>
            <div className={styles.tableLegendItem}>
              <div className={styles.AvailableIndicator}></div>
              <div className={styles.legendLabel}>Available</div>
            </div>
          </div>
          <div className={styles.tableCanvasContainer}>
            <div className={styles.tableRow}>
              <div className={styles.tableContainer}>
                <div className={`${styles.tableFlex} ${styles.tableGap}`}>
                  <Armchair size={16} className="text-green-700" />
                  <Armchair size={16} className="text-green-700" />
                  <Armchair size={16} className="text-green-700" />
                  <Armchair size={16} className="text-gray-400" />
                </div>
                <div className={styles.tableFlex}>
                  <Armchair size={16} className="-rotate-90 text-gray-400" />
                  <div className={styles.tableCard}>
                    Table 01
                    <div className={styles.iconRow}>
                      <UsersRound size={14} />6
                    </div>
                  </div>
                  <Armchair size={16} className="rotate-90 text-gray-400" />
                </div>
                <div className={`${styles.tableFlex} ${styles.tableGap}`}>
                  <Armchair size={16} className="-rotate-180 text-green-700" />
                  <Armchair size={16} className="-rotate-180 text-green-700" />
                  <Armchair size={16} className="-rotate-180 text-green-700" />
                  <Armchair size={16} className="-rotate-180 text-gray-400" />
                </div>
              </div>
              <div className={styles.tableContainer}>
                <div className={`${styles.tableFlex} ${styles.tableGap}`}>
                  <Armchair size={16} className="text-green-700" />
                </div>
                <div className={styles.tableFlex}>
                  <Armchair size={16} className="-rotate-90 text-gray-400" />
                  <div className={styles.tableCardSquare}>
                    Table 02
                    <div className={styles.iconRow}>
                      <UsersRound size={14} />2
                    </div>
                  </div>
                  <Armchair size={16} className="rotate-90 text-gray-400" />
                </div>
                <div className={`${styles.tableFlex} ${styles.tableGap}`}>
                  <Armchair size={16} className="-rotate-180 text-green-700" />
                </div>
              </div>
              <div className={styles.tableContainer}>
                <div className={`${styles.tableFlex} ${styles.tableGap}`}>
                  <Armchair size={16} className="text-gray-400" />
                </div>
                <div className={styles.tableFlex}>
                  <Armchair size={16} className="-rotate-90 text-gray-400" />
                  <div className={styles.freeTableCardSquare}>
                    Table 03
                    <div className={styles.iconRow}>
                      <UsersRound size={14} />0
                    </div>
                  </div>
                  <Armchair size={16} className="rotate-90 text-gray-400" />
                </div>
                <div className={`${styles.tableFlex} ${styles.tableGap}`}>
                  <Armchair size={16} className="-rotate-180 text-gray-400" />
                </div>
              </div>
              <div className={styles.tableContainer}>
                <div className={`${styles.tableFlex} ${styles.tableGap}`}>
                  <Armchair size={16} className="text-gray-400" />
                </div>
                <div className={styles.tableFlex}>
                  <Armchair size={16} className="-rotate-90 text-gray-400" />
                  <div className={styles.freeTableCardSquare}>
                    Table 03
                    <div className={styles.iconRow}>
                      <UsersRound size={14} />0
                    </div>
                  </div>
                  <Armchair size={16} className="rotate-90 text-gray-400" />
                </div>
                <div className={`${styles.tableFlex} ${styles.tableGap}`}>
                  <Armchair size={16} className="-rotate-180 text-gray-400" />
                </div>
              </div>
              <div className={styles.tableContainer}>
                <div className={`${styles.tableFlex} ${styles.tableGap}`}>
                  <Armchair size={16} className="text-green-700" />
                </div>
                <div className={styles.tableFlex}>
                  <Armchair size={16} className="-rotate-90 text-gray-400" />
                  <div className={styles.tableCardSquare}>
                    Table 02
                    <div className={styles.iconRow}>
                      <UsersRound size={14} />2
                    </div>
                  </div>
                  <Armchair size={16} className="rotate-90 text-gray-400" />
                </div>
                <div className={`${styles.tableFlex} ${styles.tableGap}`}>
                  <Armchair size={16} className="-rotate-180 text-green-700" />
                </div>
              </div>
              <div className={styles.tableContainer}>
                <div className={`${styles.tableFlex} ${styles.tableGap}`}>
                  <Armchair size={16} className="text-green-700" />
                  <Armchair size={16} className="text-green-700" />
                  <Armchair size={16} className="text-green-700" />
                  <Armchair size={16} className="text-gray-400" />
                </div>
                <div className={styles.tableFlex}>
                  <Armchair size={16} className="-rotate-90 text-gray-400" />
                  <div className={styles.tableCard}>
                    Table 01
                    <div className={styles.iconRow}>
                      <UsersRound size={14} />6
                    </div>
                  </div>
                  <Armchair size={16} className="rotate-90 text-gray-400" />
                </div>
                <div className={`${styles.tableFlex} ${styles.tableGap}`}>
                  <Armchair size={16} className="-rotate-180 text-green-700" />
                  <Armchair size={16} className="-rotate-180 text-green-700" />
                  <Armchair size={16} className="-rotate-180 text-green-700" />
                  <Armchair size={16} className="-rotate-180 text-gray-400" />
                </div>
              </div>
              <div className={styles.tableContainer}>
                <div className={`${styles.tableFlex} ${styles.tableGap}`}>
                  <Armchair size={16} className="text-gray-400" />
                </div>
                <div className={styles.tableFlex}>
                  <Armchair size={16} className="-rotate-90 text-gray-400" />
                  <div className={styles.freeTableCardSquare}>
                    Table 03
                    <div className={styles.iconRow}>
                      <UsersRound size={14} />0
                    </div>
                  </div>
                  <Armchair size={16} className="rotate-90 text-gray-400" />
                </div>
                <div className={`${styles.tableFlex} ${styles.tableGap}`}>
                  <Armchair size={16} className="-rotate-180 text-gray-400" />
                </div>
              </div>
              <div className={styles.tableContainer}>
                <div className={`${styles.tableFlex} ${styles.tableGap}`}>
                  <Armchair size={16} className="text-green-700" />
                  <Armchair size={16} className="text-green-700" />
                  <Armchair size={16} className="text-green-700" />
                  <Armchair size={16} className="text-gray-400" />
                </div>
                <div className={styles.tableFlex}>
                  <Armchair size={16} className="-rotate-90 text-gray-400" />
                  <div className={styles.tableCard}>
                    Table 01
                    <div className={styles.iconRow}>
                      <UsersRound size={14} />6
                    </div>
                  </div>
                  <Armchair size={16} className="rotate-90 text-gray-400" />
                </div>
                <div className={`${styles.tableFlex} ${styles.tableGap}`}>
                  <Armchair size={16} className="-rotate-180 text-green-700" />
                  <Armchair size={16} className="-rotate-180 text-green-700" />
                  <Armchair size={16} className="-rotate-180 text-green-700" />
                  <Armchair size={16} className="-rotate-180 text-gray-400" />
                </div>
              </div>
              <div className={styles.tableContainer}>
                <div className={`${styles.tableFlex} ${styles.tableGap}`}>
                  <Armchair size={16} className="text-green-700" />
                  <Armchair size={16} className="text-green-700" />
                  <Armchair size={16} className="text-green-700" />
                  <Armchair size={16} className="text-gray-400" />
                </div>
                <div className={styles.tableFlex}>
                  <Armchair size={16} className="-rotate-90 text-gray-400" />
                  <div className={styles.tableCard}>
                    Table 01
                    <div className={styles.iconRow}>
                      <UsersRound size={14} />6
                    </div>
                  </div>
                  <Armchair size={16} className="rotate-90 text-gray-400" />
                </div>
                <div className={`${styles.tableFlex} ${styles.tableGap}`}>
                  <Armchair size={16} className="-rotate-180 text-green-700" />
                  <Armchair size={16} className="-rotate-180 text-green-700" />
                  <Armchair size={16} className="-rotate-180 text-green-700" />
                  <Armchair size={16} className="-rotate-180 text-gray-400" />
                </div>
              </div>
              <div className={styles.tableContainer}>
                <div className={`${styles.tableFlex} ${styles.tableGap}`}>
                  <Armchair size={16} className="text-green-700" />
                </div>
                <div className={styles.tableFlex}>
                  <Armchair size={16} className="-rotate-90 text-gray-400" />
                  <div className={styles.tableCardSquare}>
                    Table 02
                    <div className={styles.iconRow}>
                      <UsersRound size={14} />2
                    </div>
                  </div>
                  <Armchair size={16} className="rotate-90 text-gray-400" />
                </div>
                <div className={`${styles.tableFlex} ${styles.tableGap}`}>
                  <Armchair size={16} className="-rotate-180 text-green-700" />
                </div>
              </div>
              <div className={styles.tableContainer}>
                <div className={`${styles.tableFlex} ${styles.tableGap}`}>
                  <Armchair size={16} className="text-gray-400" />
                </div>
                <div className={styles.tableFlex}>
                  <Armchair size={16} className="-rotate-90 text-gray-400" />
                  <div className={styles.freeTableCardSquare}>
                    Table 03
                    <div className={styles.iconRow}>
                      <UsersRound size={14} />0
                    </div>
                  </div>
                  <Armchair size={16} className="rotate-90 text-gray-400" />
                </div>
                <div className={`${styles.tableFlex} ${styles.tableGap}`}>
                  <Armchair size={16} className="-rotate-180 text-gray-400" />
                </div>
              </div>
              <div className={styles.tableContainer}>
                <div className={`${styles.tableFlex} ${styles.tableGap}`}>
                  <Armchair size={16} className="text-gray-400" />
                </div>
                <div className={styles.tableFlex}>
                  <Armchair size={16} className="-rotate-90 text-gray-400" />
                  <div className={styles.freeTableCardSquare}>
                    Table 03
                    <div className={styles.iconRow}>
                      <UsersRound size={14} />0
                    </div>
                  </div>
                  <Armchair size={16} className="rotate-90 text-gray-400" />
                </div>
                <div className={`${styles.tableFlex} ${styles.tableGap}`}>
                  <Armchair size={16} className="-rotate-180 text-gray-400" />
                </div>
              </div>
              <div className={styles.tableContainer}>
                <div className={`${styles.tableFlex} ${styles.tableGap}`}>
                  <Armchair size={16} className="text-green-700" />
                </div>
                <div className={styles.tableFlex}>
                  <Armchair size={16} className="-rotate-90 text-gray-400" />
                  <div className={styles.tableCardSquare}>
                    Table 02
                    <div className={styles.iconRow}>
                      <UsersRound size={14} />2
                    </div>
                  </div>
                  <Armchair size={16} className="rotate-90 text-gray-400" />
                </div>
                <div className={`${styles.tableFlex} ${styles.tableGap}`}>
                  <Armchair size={16} className="-rotate-180 text-green-700" />
                </div>
              </div>
              <div className={styles.tableContainer}>
                <div className={`${styles.tableFlex} ${styles.tableGap}`}>
                  <Armchair size={16} className="text-green-700" />
                  <Armchair size={16} className="text-green-700" />
                  <Armchair size={16} className="text-green-700" />
                  <Armchair size={16} className="text-gray-400" />
                </div>
                <div className={styles.tableFlex}>
                  <Armchair size={16} className="-rotate-90 text-gray-400" />
                  <div className={styles.tableCard}>
                    Table 01
                    <div className={styles.iconRow}>
                      <UsersRound size={14} />6
                    </div>
                  </div>
                  <Armchair size={16} className="rotate-90 text-gray-400" />
                </div>
                <div className={`${styles.tableFlex} ${styles.tableGap}`}>
                  <Armchair size={16} className="-rotate-180 text-green-700" />
                  <Armchair size={16} className="-rotate-180 text-green-700" />
                  <Armchair size={16} className="-rotate-180 text-green-700" />
                  <Armchair size={16} className="-rotate-180 text-gray-400" />
                </div>
              </div>
              <div className={styles.tableContainer}>
                <div className={`${styles.tableFlex} ${styles.tableGap}`}>
                  <Armchair size={16} className="text-gray-400" />
                </div>
                <div className={styles.tableFlex}>
                  <Armchair size={16} className="-rotate-90 text-gray-400" />
                  <div className={styles.freeTableCardSquare}>
                    Table 03
                    <div className={styles.iconRow}>
                      <UsersRound size={14} />0
                    </div>
                  </div>
                  <Armchair size={16} className="rotate-90 text-gray-400" />
                </div>
                <div className={`${styles.tableFlex} ${styles.tableGap}`}>
                  <Armchair size={16} className="-rotate-180 text-gray-400" />
                </div>
              </div>
              <div className={styles.tableContainer}>
                <div className={`${styles.tableFlex} ${styles.tableGap}`}>
                  <Armchair size={16} className="text-green-700" />
                  <Armchair size={16} className="text-green-700" />
                  <Armchair size={16} className="text-green-700" />
                  <Armchair size={16} className="text-gray-400" />
                </div>
                <div className={styles.tableFlex}>
                  <Armchair size={16} className="-rotate-90 text-gray-400" />
                  <div className={styles.tableCard}>
                    Table 01
                    <div className={styles.iconRow}>
                      <UsersRound size={14} />6
                    </div>
                  </div>
                  <Armchair size={16} className="rotate-90 text-gray-400" />
                </div>
                <div className={`${styles.tableFlex} ${styles.tableGap}`}>
                  <Armchair size={16} className="-rotate-180 text-green-700" />
                  <Armchair size={16} className="-rotate-180 text-green-700" />
                  <Armchair size={16} className="-rotate-180 text-green-700" />
                  <Armchair size={16} className="-rotate-180 text-gray-400" />
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

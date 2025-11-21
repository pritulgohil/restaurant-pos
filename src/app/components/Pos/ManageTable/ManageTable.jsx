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
  SquarePlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AddTableDialog from "./AddTableDialog"; // Adjust path if needed
import { useRestaurantContext } from "@/context/RestaurantContext";
import TableRenderer from "./TableRenderer"; // Adjust path if needed
import AssignTable from "./AssignTable";

const ManageTable = () => {
  const { restaurant } = useRestaurantContext();
  const [tables, setTables] = useState([]);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);

  // ✅ Dialog state for both triggers
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const fetchTables = async () => {
    if (!restaurant) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/pos/fetch-tables/${restaurant}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (!res.ok) {
        console.error(data.error || "Failed to fetch tables");
      } else {
        setTables(data.tables);
      }
    } catch (err) {
      console.error("Network error:", err);
    }
  };

  useEffect(() => {
    fetchTables();
  }, [restaurant]);

  return (
    <div className={styles.mainContainer}>
      {/* LEFT SIDE */}
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
          {tables.length > 0 ? (
            <div className={styles.customerCardContainer}>
              {tables.map((table) => (
                <div
                  key={table._id}
                  className={styles.customerCard}
                  onClick={() => {
                    setSelectedTable(table);
                    setAssignDialogOpen(true);
                  }}
                >
                  <div className={styles.firstContainer}>
                    <div
                      className={
                        table.isOccupied ? styles.timeCard : styles.freeTimeCard
                      }
                    >
                      {table.isOccupied
                        ? (() => {
                            const timeString = new Date(
                              table.updatedAt?.$date || table.updatedAt
                            ).toLocaleTimeString([], {
                              hour: "numeric",
                              minute: "2-digit",
                              hour12: true,
                            });
                            const [time, ampm] = timeString.split(" ");
                            return (
                              <div style={{ textAlign: "center" }}>
                                {time}
                                <br />
                                {ampm.replace(/\./g, "").toUpperCase()}
                              </div>
                            );
                          })()
                        : "Free"}
                    </div>

                    <div className={styles.customerDetails}>
                      {table.customerName && (
                        <div className={styles.customerName}>
                          {table.customerName}
                        </div>
                      )}
                      <div className={styles.tableDetails}>
                        <div className={styles.table}>
                          <Armchair size={16} color="gray" />
                          Table {table.tableNumber.toString().padStart(2, "0")}
                        </div>
                        <div className={styles.people}>
                          <CircleUser size={14} color="gray" />
                          {table.peopleCount || 0}
                        </div>
                      </div>

                      <div className={styles.phoneNumber}>
                        <ListOrdered size={16} color="gray" />
                        {table.currentOrder || "No order assigned"}
                      </div>
                    </div>
                  </div>

                  <div className={styles.secondContainer}>
                    <div className={styles.paymentStatus}>
                      <div
                        className={`${
                          table.isOccupied
                            ? styles.UncheckIconContainer
                            : styles.checkIconContainer
                        }`}
                      >
                        <Check size={10} color="white" strokeWidth={3} />
                      </div>
                      {/* {table.isPaid ? "Paid" : "Unpaid"} */}
                      {table.isOccupied === false ? "Available" : "Unpaid"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.noTablesMessage}>No tables available</div>
          )}
        </div>

        {/* LEFT PANEL ADD TABLE BUTTON */}
        <div className={styles.addTableButtonContainer}>
          <Button
            className="bg-black text-white border-0 w-full hover:bg-primary/90"
            size="sm"
            onClick={() => setAddDialogOpen(true)}
          >
            <SquarePlus /> Add Table
          </Button>
        </div>
      </div>

      {/* RIGHT SIDE */}
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
          {tables.length > 0 ? (
            <div className={styles.tableRow}>
              {tables.map((table) => (
                <TableRenderer
                  key={table.tableNumber}
                  table={table}
                  assignDialogOpen={assignDialogOpen}
                  setAssignDialogOpen={setAssignDialogOpen}
                  selectedTable={selectedTable}
                  setSelectedTable={setSelectedTable}
                />
              ))}
            </div>
          ) : (
            <div className={styles.noTablesMessage}>
              <SquarePlus
                size={30}
                strokeWidth={1}
                className="cursor-pointer"
                onClick={() => setAddDialogOpen(true)}
              />
              Add a table to get started
            </div>
          )}
        </div>
      </div>

      {/* CONTROLLED DIALOG (shared by both triggers) */}
      <AddTableDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onTableAdded={fetchTables}
      />
      <AssignTable
        open={assignDialogOpen}
        onOpenChange={setAssignDialogOpen}
        table={selectedTable}
        onTableUpdated={fetchTables}
      />
    </div>
  );
};

export default ManageTable;

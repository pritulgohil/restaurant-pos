"use client";

import React, { useState, useEffect } from "react";
import styles from "./ManageTable.module.css";
import { Input } from "@/components/ui/input";
import {
  Armchair,
  CircleUser,
  ListOrdered,
  Check,
  SquarePlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AddTableDialog from "./AddTableDialog";
import { useRestaurantContext } from "@/context/RestaurantContext";
import TableRenderer from "./TableRenderer";
import AssignTable from "./AssignTable";
import { Skeleton } from "@/components/ui/skeleton";
import { useNotification } from "@/context/NotificationContext";
import useOccupancyNotification from "@/hooks/useOccupancyNotification";

const ManageTable = () => {
  const { restaurant, occupancyPercentage, setOccupancyPercentage } =
    useRestaurantContext();
  const [tables, setTables] = useState([]);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [tableLoader, setTableLoader] = useState(false);
  const { sendNotification, fetchNotifications } = useNotification();
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const calculateOccupancyPercentage = (tables) => {
    if (!tables || tables.length === 0) return 0;

    const totalSeats = tables.reduce((sum, table) => sum + table.occupancy, 0);
    const totalPeople = tables.reduce(
      (sum, table) => sum + table.peopleCount,
      0
    );

    return Math.round((totalPeople / totalSeats) * 100);
  };

  const fetchTables = async () => {
    if (!restaurant) return;
    try {
      setTableLoader(true);
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
    } finally {
      setTableLoader(false);
    }
  };

  useEffect(() => {
    if (tables.length === 0) return;

    const occupancy = calculateOccupancyPercentage(tables);

    setOccupancyPercentage((prev) => {
      if (prev === occupancy) return prev;
      return occupancy;
    });
  }, [tables]);

  useEffect(() => {
    fetchTables();
  }, []);

  useOccupancyNotification({
    restaurant,
    occupancyPercentage,
    sendNotification,
    fetchNotifications,
  });

  const filteredTables = tables.filter((table) => {
    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase();

    return (
      table.customerName?.toLowerCase().includes(query) ||
      table.tableNumber?.toString().includes(query) ||
      table.orderId?.slice(-6).toLowerCase().includes(query)
    );
  });

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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.customerContainer}>
          {tableLoader ? (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  className="p-4 border rounded-md flex justify-between animate-pulse bg-white"
                >
                  <div className="flex gap-4 items-center">
                    {/* Time Card */}
                    <Skeleton className="w-16 h-20 rounded-md" />

                    {/* Customer Details */}
                    <div className="flex flex-col space-y-2">
                      <Skeleton className="w-32 h-4 rounded" />
                      <Skeleton className="w-24 h-3 rounded" />
                      <Skeleton className="w-20 h-3 rounded" />
                    </div>
                  </div>

                  {/* Payment Status */}
                  <div className="flex items-center">
                    <Skeleton className="w-14 h-4" />
                  </div>
                </div>
              ))}
            </div>
          ) : tables.length > 0 ? (
            <div className={styles.customerCardContainer}>
              {filteredTables.map((table) => (
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
                        {table.orderId
                          ? `#${table.orderId.slice(-6)}`
                          : "No order assigned"}
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
          {tableLoader ? (
            // Render skeleton or loader while loading
            <div className="flex flex-wrap gap-24">
              {Array.from({ length: 8 }).map((_, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center gap-3 animate-pulse cursor-pointer"
                >
                  {/* TOP ROW */}
                  <div className="flex gap-2">
                    <Skeleton className="w-4 h-4 rounded-full" />
                    <Skeleton className="w-4 h-4 rounded-full" />
                    <Skeleton className="w-4 h-4 rounded-full" />
                    <Skeleton className="w-4 h-4 rounded-full" />
                  </div>

                  {/* MIDDLE ROW */}
                  <div className="flex items-center gap-2">
                    {/* LEFT CHAIRS */}
                    <div className="flex flex-col gap-2">
                      <Skeleton className="w-4 h-4 rounded-full" />
                      <Skeleton className="w-4 h-4 rounded-full" />
                    </div>

                    {/* TABLE CARD */}
                    <Skeleton className="w-36 h-20 rounded-md" />

                    {/* RIGHT CHAIRS */}
                    <div className="flex flex-col gap-2">
                      <Skeleton className="w-4 h-4 rounded-full" />
                      <Skeleton className="w-4 h-4 rounded-full" />
                    </div>
                  </div>

                  {/* BOTTOM ROW */}
                  <div className="flex gap-2">
                    <Skeleton className="w-4 h-4 rounded-full" />
                    <Skeleton className="w-4 h-4 rounded-full" />
                    <Skeleton className="w-4 h-4 rounded-full" />
                    <Skeleton className="w-4 h-4 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : tables.length > 0 ? (
            <div className={styles.tableRow}>
              {filteredTables.map((table) => (
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

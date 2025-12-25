"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  LoaderCircle,
  Table,
  Armchair,
  UtensilsCrossed,
  CircleUser,
  UsersRound,
  ListOrdered,
  SquareX,
  SquarePen,
  CreditCard,
  Clock,
  Check,
  ClockArrowDown,
  SquareCheck,
} from "lucide-react";
import styles from "./AssignTable.module.css";
import { Separator } from "@/components/ui/separator";

export default function AssignTable({
  open,
  onOpenChange,
  table,
  onTableUpdated,
}) {
  if (!table) return null;

  const [customerName, setCustomerName] = useState(table.customerName || "");
  const [peopleCount, setPeopleCount] = useState(table.peopleCount || 0);
  const [loading, setLoading] = useState(false);
  const [assignLoading, setAssignLoading] = useState(null);
  const [paymentAssignLoading, setPaymentAssignLoading] = useState(false);
  const [localPaymentStatus, setLocalPaymentStatus] = useState(
    table.paymentStatus
  );

  useEffect(() => {
    setLocalPaymentStatus(table.paymentStatus);
  }, [table._id, table.paymentStatus]);

  const handleDialogChange = (isOpen) => {
    if (!isOpen) {
      setCustomerName("");
      setPeopleCount(0);
    }
    onOpenChange(isOpen);
  };

  const handleAssign = async (e) => {
    e.preventDefault();

    if (peopleCount > table.occupancy) {
      alert(`People cannot exceed table occupancy (${table.occupancy})`);
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      // 👇 Only send assignedAt if table was previously free
      const payload = {
        customerName,
        peopleCount: Number(peopleCount),
      };

      const res = await fetch(`/api/pos/update-table/${table._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to assign table");
        setLoading(false);
        return;
      }

      onTableUpdated && onTableUpdated();

      setPeopleCount(0);
      setCustomerName("");

      setTimeout(() => {
        setLoading(false);
        onOpenChange(false);
      }, 2000);
    } catch (err) {
      console.error("Network error:", err);
      alert("Network error");
      setLoading(false);
    }
  };

  const handleUnassign = async (type) => {
    setAssignLoading(type);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`/api/pos/unassign-table/${table._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) return;

      onTableUpdated?.();

      setTimeout(() => {
        setAssignLoading(null);
        setLocalPaymentStatus(false);
        onOpenChange(false);
      }, 2000);
    } catch (err) {
      console.error(err);
      setAssignLoading(null);
    }
  };

  const handlePayment = async () => {
    setPaymentAssignLoading(true);
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`/api/pos/update-table/${table._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          paymentStatus: true,
        }),
      });

      const data = await res.json();
      if (!res.ok) return;

      onTableUpdated && onTableUpdated();

      setTimeout(() => {
        setPaymentAssignLoading(false);
        setLocalPaymentStatus(true);
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };

  function getElapsedTime(timestamp) {
    const now = new Date();
    const updated = new Date(timestamp);
    const diffMs = now - updated;

    const minutes = Math.floor(diffMs / 60000);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    return `${minutes}m`;
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogContent className="max-w-lg">
        {table.isOccupied ? (
          <>
            <DialogHeader className={styles.dialogHeader}>
              <DialogTitle>
                Table {table.tableNumber.toString().padStart(2, "0")}
              </DialogTitle>
            </DialogHeader>

            <div className={styles.dialogRow}>
              <div className={styles.rowField}>
                <Table size={16} />#{table._id.slice(-6)}
              </div>
              <div className={styles.rowField}>
                <Armchair size={16} />
                {table.occupancy} Seats
              </div>
              <div className={styles.rowField}>
                <UtensilsCrossed size={16} />
                Occupied
              </div>
            </div>

            <Separator className="my-4" />

            <div className={styles.dialogRow}>
              <div className={styles.rowField}>
                <CircleUser size={16} /> {table.customerName}
              </div>
              <div className={styles.rowField}>
                <UsersRound size={16} /> {table.peopleCount} People
              </div>
              <div className={styles.rowField}>
                {table.orderId ? (
                  <>
                    <Button
                      variant="link"
                      className="font-normal"
                      onClick={() => {
                        const url = `${window.location.origin}/pos/manage-orders?orderId=${table.orderId}`;
                        window.open(url, "_blank");
                      }}
                    >
                      <ListOrdered size={16} />#{table.orderId.slice(-6)}
                    </Button>
                  </>
                ) : (
                  <>
                    <ListOrdered size={16} />
                    No order assigned
                  </>
                )}
              </div>
            </div>

            <Separator className="my-4" />
            <div className={styles.customDialogRow}>
              <div className={styles.rowField}>
                <Clock size={16} />
                {table.isOccupied &&
                  (() => {
                    const timeString = new Date(
                      table.assignedAt?.$date || table.assignedAt
                    ).toLocaleTimeString([], {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    });

                    const [time, ampm] = timeString.split(" ");

                    return (
                      <div>
                        {time} {ampm.replace(/\./g, "").toUpperCase()}
                      </div>
                    );
                  })()}
              </div>
              <div className={styles.rowField}>
                <ClockArrowDown size={16} />
                <span>
                  {getElapsedTime(table.assignedAt?.$date || table.assignedAt)}{" "}
                  ago
                </span>
              </div>
              <div className={styles.rowField}>
                <div
                  className={`${styles.iconContainer} ${
                    localPaymentStatus ? styles.iconContainerCheck : ""
                  }`}
                >
                  <Check size={16} strokeWidth={3} className="text-white" />
                </div>
                {localPaymentStatus ? "Paid" : "Unpaid"}
              </div>
            </div>
            <Separator className="my-4" />
            <div className={styles.dialogRow}>
              {assignLoading === "unassign" ? (
                <Button variant="outline" disabled>
                  <LoaderCircle className="animate-spin" />
                  Unassign Table
                </Button>
              ) : (
                <Button
                  variant="outline"
                  disabled={table.orderId || assignLoading === "unassign"}
                  onClick={() => handleUnassign("unassign")}
                >
                  <>
                    <SquareX />
                    Unassign Table
                  </>
                </Button>
              )}
              {paymentAssignLoading ? (
                <Button disabled>
                  <LoaderCircle className="animate-spin" />
                  Proccessing...
                </Button>
              ) : (
                <Button
                  onClick={handlePayment}
                  disabled={!table.orderId || localPaymentStatus}
                >
                  <CreditCard />
                  Take Payment
                </Button>
              )}
              {!table.orderId ? (
                <Button
                  className="bg-green-600 text-white hover:bg-green-700"
                  onClick={() => {
                    const url = `${window.location.origin}/pos/order-line?customerName=${table.customerName}&peopleCount=${table.peopleCount}&tableId=${table._id}&tableNumber=${table.tableNumber}`;
                    window.open(url, "_blank");
                  }}
                >
                  <SquarePen />
                  Assign Order
                </Button>
              ) : (
                <Button
                  className="bg-green-600 text-white hover:bg-green-700"
                  disabled={!localPaymentStatus || assignLoading === "finish"}
                  onClick={() => handleUnassign("finish")}
                >
                  <>
                    {assignLoading === "finish" ? (
                      <LoaderCircle className="animate-spin" />
                    ) : (
                      <SquareCheck />
                    )}
                    {assignLoading === "finish"
                      ? "Finishing up..."
                      : "Finish Order"}
                  </>
                </Button>
              )}
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Assign Table</DialogTitle>
            </DialogHeader>

            <form className="space-y-8 mt-6" onSubmit={handleAssign}>
              {/* TABLE INFO */}
              <div className="grid gap-2">
                <Label>Table Number</Label>
                <Input value={table.tableNumber} readOnly disabled />
              </div>

              <div className="grid gap-2">
                <Label>Occupancy</Label>
                <Input value={table.occupancy} readOnly disabled />
              </div>

              {/* CUSTOMER NAME */}
              <div className="grid gap-2">
                <Label>Customer Name</Label>
                <Input
                  type="text"
                  placeholder="Enter customer name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </div>

              {/* PEOPLE COUNT — RESTRICTED */}
              <div className="grid gap-2">
                <Label>People Count (max {table.occupancy})</Label>
                <Input
                  type="number"
                  min={1}
                  max={table.occupancy}
                  value={peopleCount}
                  placeholder="Enter number of people"
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10);

                    // Prevent typing more than occupancy
                    if (!val || val <= table.occupancy) {
                      setPeopleCount(e.target.value);
                    }
                  }}
                />

                {/* ERROR MESSAGE */}
                {peopleCount > table.occupancy && (
                  <p className="text-sm text-red-500">
                    People exceed table capacity ({table.occupancy})
                  </p>
                )}
              </div>

              <DialogFooter>
                <Button
                  type="submit"
                  disabled={
                    loading ||
                    !customerName ||
                    !peopleCount ||
                    peopleCount > table.occupancy
                  }
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                      Assigning...
                    </div>
                  ) : (
                    "Assign Table"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

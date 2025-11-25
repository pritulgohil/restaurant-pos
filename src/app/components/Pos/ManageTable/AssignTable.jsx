"use client";

import { useState } from "react";
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

  const handleAssign = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`/api/pos/update-table/${table._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          customerName,
          peopleCount: Number(peopleCount),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Error assigning table:", data);
        alert(data.error || "Failed to assign table");
        setLoading(false);
        return;
      }

      // Refresh parent table list
      onTableUpdated && onTableUpdated();
      setTimeout(() => {
        setLoading(false);
        onOpenChange(false); // Close dialog
      }, 3000);
      setPeopleCount(0);
      setCustomerName("");
    } catch (err) {
      console.error("Network error:", err);
      alert("Network error");
    }

    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        {table.isOccupied ? (
          <>
            <DialogHeader className={styles.dialogHeader}>
              Table {table.tableNumber.toString().padStart(2, "0")}{" "}
            </DialogHeader>
            <div className={styles.dialogRow}>
              <div className={styles.rowField}>
                <Table size={16} />#{table._id.slice(-4)}
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
                <ListOrdered size={16} />{" "}
                {table.currentOrder || "No order assigned"}
              </div>
            </div>
            <Separator className="my-4" />
            <div className={styles.customDialogRow}>
              <div className={styles.rowField}>
                <Clock size={16} />
                {table.isOccupied &&
                  (() => {
                    const timeString = new Date(
                      table.updatedAt?.$date || table.updatedAt
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
                <div className={styles.iconContainer}>
                  <Check size={16} strokeWidth={3} className="text-white" />
                </div>
                Unpaid
              </div>
            </div>
            <Separator className="my-4" />
            <div className={styles.dialogRow}>
              <Button variant="outline">
                <SquareX />
                Unassign Table
              </Button>
              <Button>
                <CreditCard />
                Take Payment
              </Button>
              <Button className="bg-green-600 text-white hover:bg-green-700">
                <SquarePen />
                Assign Order
              </Button>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Assign Table</DialogTitle>
            </DialogHeader>

            <form className="space-y-8 mt-6" onSubmit={handleAssign}>
              {/* TABLE NUMBER */}
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
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </div>

              {/* PEOPLE COUNT */}
              <div className="grid gap-2">
                <Label>People Count</Label>
                <Input
                  type="number"
                  placeholder="Enter number of people"
                  onChange={(e) => setPeopleCount(e.target.value)}
                  min={1}
                  max={table.occupancy}
                />
              </div>

              <DialogFooter>
                <Button
                  type="submit"
                  disabled={loading || !customerName || !peopleCount}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                      <span>Assigning Table</span>
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

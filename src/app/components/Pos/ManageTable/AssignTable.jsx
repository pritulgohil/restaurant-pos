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

      onOpenChange(false); // Close dialog
    } catch (err) {
      console.error("Network error:", err);
      alert("Network error");
    }

    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
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
            <Button type="submit" disabled={loading}>
              {loading ? "Assigning..." : "Assign Table"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

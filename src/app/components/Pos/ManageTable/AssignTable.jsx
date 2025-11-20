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

export default function AssignTable({ open, onOpenChange, table }) {
  if (!table) return null; // Prevent render before table is selected

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Assign Table</DialogTitle>
        </DialogHeader>

        <form className="space-y-8 mt-6">
          {/* TABLE NUMBER */}
          <div className="grid gap-2">
            <Label htmlFor="tableNumber">Table Number</Label>
            <Input
              id="tableNumber"
              type="number"
              defaultValue={table.tableNumber}
              readOnly
              className="bg-gray-100"
              disabled
            />
          </div>

          {/* CUSTOMER NAME */}
          <div className="grid gap-2">
            <Label htmlFor="customerName">Customer Name</Label>
            <Input
              id="customerName"
              type="text"
              placeholder="Enter customer name"
              defaultValue={table.customerName || ""}
            />
          </div>

          {/* PEOPLE COUNT */}
          <div className="grid gap-2">
            <Label htmlFor="peopleCount">People Count</Label>
            <Input
              id="peopleCount"
              type="number"
              placeholder="Enter number of people"
              defaultValue={table.currentOccupancy || 0}
            />
          </div>

          <DialogFooter>
            <Button type="submit">Assign Table</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

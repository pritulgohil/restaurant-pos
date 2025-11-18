"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TriangleAlert, LoaderCircle } from "lucide-react";
import { useRestaurantContext } from "@/context/RestaurantContext";
import styles from "./AddTableDialog.module.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AddTableDialog({ open, onOpenChange, onTableAdded }) {
  const [tableNumber, setTableNumber] = useState("");
  const [occupancy, setOccupancy] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { restaurant } = useRestaurantContext();
  const [loading, setLoading] = useState(false);

  const handleCreateTable = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/pos/create-table", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          tableNumber: Number(tableNumber),
          occupancy: Number(occupancy),
          restaurantId: restaurant,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong");
      } else {
        setLoading(true);
        setTimeout(() => {
          setTableNumber("");
          setOccupancy("");
          onOpenChange(false); // CLOSE DIALOG
          onTableAdded?.();
        }, 1200);
      }
    } catch (error) {
      setErrorMsg("Network error. Please try again.");
    } finally {
      setTimeout(() => setLoading(false), 1200);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl p-6 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Add Table</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 pt-2">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Table Number</Label>
            <Input
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              className="col-span-3"
              placeholder="Assign a table number"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Occupancy</Label>
            <Select value={occupancy} onValueChange={setOccupancy}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select occupancy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="10">10</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {errorMsg && (
          <div className={styles.errorMsg}>
            <TriangleAlert size={18} /> {errorMsg}
          </div>
        )}

        <Button
          className="w-full bg-black text-white mt-2 hover:bg-primary/90"
          onClick={handleCreateTable}
        >
          {loading && <LoaderCircle className="animate-spin" />}
          Save Table
        </Button>
      </DialogContent>
    </Dialog>
  );
}

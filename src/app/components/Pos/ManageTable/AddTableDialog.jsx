"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SquarePlus, TriangleAlert, LoaderCircle } from "lucide-react";
import { useRestaurantContext } from "@/context/RestaurantContext";
import styles from "./AddTableDialog.module.css";
import { set } from "mongoose";

export default function AddTableDialog() {
  const [tableNumber, setTableNumber] = useState("");
  const [occupancy, setOccupancy] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { restaurant } = useRestaurantContext();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

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
        console.error("Error creating table:", errorMsg);
      } else {
        setLoading(true);
        setTimeout(() => {
          setTableNumber("");
          setOccupancy("");
          setOpen(false);
        }, 3000);

        setErrorMsg("");
      }
    } catch (error) {
      console.error("Network error:", error);
      setErrorMsg("Network error. Please try again.");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
      console.log("Create table request finished.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="bg-black text-white border-0 w-full hover:bg-gray-800"
          size="sm"
        >
          <SquarePlus /> Add Table
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-2xl p-6 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Add Table</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 pt-2">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tableNumber" className="text-right">
              Table Number
            </Label>
            <Input
              id="tableNumber"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              className="col-span-3"
              placeholder="Assign a table number"
              required
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="occupancy" className="text-right">
              Occupancy
            </Label>
            <Input
              id="occupancy"
              value={occupancy}
              onChange={(e) => setOccupancy(e.target.value)}
              className="col-span-3"
              placeholder="Enter maximum occupancy"
              required
            />
          </div>
        </div>
        {errorMsg && (
          <div className={styles.errorMsg}>
            <TriangleAlert size={18} /> {errorMsg}
          </div>
        )}
        <Button
          className="w-full bg-black text-white mt-2 hover:bg-gray-800"
          onClick={handleCreateTable}
        >
          {loading && <LoaderCircle className="animate-spin" />}
          Save Table
        </Button>
      </DialogContent>
    </Dialog>
  );
}

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
import { SquarePlus } from "lucide-react";
import { useRestaurantContext } from "@/context/RestaurantContext";

export default function AddTableDialog() {
  const [tableNumber, setTableNumber] = useState("");
  const [occupancy, setOccupancy] = useState("");
  const { restaurant } = useRestaurantContext();
  console.log("Restaurant ID in AddTableDialog:", restaurant);

  const handleCreateTable = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token"); // your login token

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
        setTableNumber("");
        setOccupancy("");
      }
    } catch (error) {
      // setErrorMsg("Network error");
    } finally {
      // setLoading(false);
    }
  };

  return (
    <Dialog>
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
        <div className="grid gap-4 py-4">
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
        <Button
          className="w-full bg-black text-white hover:bg-gray-800"
          onClick={handleCreateTable}
        >
          Save Table
        </Button>
      </DialogContent>
    </Dialog>
  );
}

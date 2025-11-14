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

export default function AddTableDialog() {
  const [tableNumber, setTableNumber] = useState("");
  const [occupancy, setOccupancy] = useState("");

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

      <DialogContent className="rounded-2xl p-6 max-w-sm w-full">
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
              placeholder="e.g. 12"
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
              placeholder="e.g. 4"
            />
          </div>
        </div>

        <Button className="w-full bg-black text-white hover:bg-gray-800">
          Save
        </Button>
      </DialogContent>
    </Dialog>
  );
}

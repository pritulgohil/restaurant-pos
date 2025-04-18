"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const AddDishDialog = ({ children }) => {
  return (
    <Dialog>
      {children}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a New Dish</DialogTitle>
          <DialogDescription>
            Fill out the fields below to create a new dish.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <label className="block text-sm font-medium">Dish Name</label>
            <Input placeholder="e.g., Belgian Waffle" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="block text-sm font-medium">Description</label>
            <Input placeholder="e.g., Dessert" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="block text-sm font-medium">Emoji</label>
            <Input placeholder="e.g., Emoji" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="block text-sm font-medium">Price</label>
            <Input placeholder="$8.00" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="block text-sm font-medium">Available</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">True</SelectItem>
                <SelectItem value="false">False</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save Dish</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddDishDialog;

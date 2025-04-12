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
          <div>
            <label className="block text-sm font-medium">Dish Name</label>
            <Input placeholder="e.g., Belgian Waffle" />
          </div>
          <div>
            <label className="block text-sm font-medium">Category</label>
            <Input placeholder="e.g., Dessert" />
          </div>
          <div>
            <label className="block text-sm font-medium">Price</label>
            <Input placeholder="$8.00" />
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

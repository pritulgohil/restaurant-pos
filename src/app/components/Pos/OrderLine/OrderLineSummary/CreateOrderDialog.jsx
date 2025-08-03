import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import styles from "./CreateOrderDialog.module.css";
import { useRestaurantContext } from "@/context/RestaurantContext";

const CreateOrderDialog = () => {
  const { orderLine, setOrderLine } = useRestaurantContext();

  const [table, setTable] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [peopleCount, setPeopleCount] = useState("");

  const handleSubmit = () => {
    setOrderLine({
      ...orderLine,
      table,
      customerName,
      peopleCount: parseInt(peopleCount, 10) || 0,
    });

    // Optional: clear form
    setTable("");
    setCustomerName("");
    setPeopleCount("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size="icon" className="size-6">
          <Plus className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create Order</DialogTitle>
        </DialogHeader>

        <div className={`space-y-4 py-4 ${styles.container}`}>
          <div className={styles.marginBottom}>
            <Label htmlFor="table">Table</Label>
            <Select value={table} onValueChange={setTable}>
              <SelectTrigger id="table">
                <SelectValue placeholder="Select table" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Table 1</SelectItem>
                <SelectItem value="2">Table 2</SelectItem>
                <SelectItem value="3">Table 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className={styles.marginBottom}>
            <Label htmlFor="customerName">Customer Name</Label>
            <Input
              id="customerName"
              placeholder="Enter name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>

          <div className={styles.marginBottom}>
            <Label htmlFor="peopleCount">Total People</Label>
            <Input
              id="peopleCount"
              type="number"
              placeholder="0"
              min={1}
              value={peopleCount}
              onChange={(e) => setPeopleCount(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button type="button" onClick={handleSubmit}>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateOrderDialog;

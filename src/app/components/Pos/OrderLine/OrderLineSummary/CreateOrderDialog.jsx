//
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
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
import { Plus, SquarePen, LoaderCircle } from "lucide-react";
import styles from "./CreateOrderDialog.module.css";
import { useRestaurantContext } from "@/context/RestaurantContext";

const CreateOrderDialog = () => {
  const { orderLine, setOrderLine, orderType, restaurant } =
    useRestaurantContext();

  const [table, setTable] = useState(null);
  const [customerName, setCustomerName] = useState("");
  const [peopleCount, setPeopleCount] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [tablesList, setTablesList] = useState([]);

  useEffect(() => {
    if (orderType === "Dine-in" && restaurant) {
      const fetchTables = async () => {
        setTablesList([]);
        try {
          const token = localStorage.getItem("token");
          const res = await fetch(`/api/pos/fetch-tables/${restaurant}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (!res.ok) return;

          const data = await res.json();
          setTablesList(Array.isArray(data.tables) ? data.tables : []);
        } catch (err) {
          console.error("Failed to fetch tables:", err);
          setTablesList([]);
        }
      };

      fetchTables();
    }
  }, [orderType, restaurant]);

  // Validate
  const isFormValid =
    orderType === "Dine-in"
      ? table &&
        customerName &&
        peopleCount &&
        parseInt(peopleCount, 10) > 0 &&
        parseInt(peopleCount, 10) <= (table?.occupancy || 0)
      : customerName;

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setOrderLine({
        ...orderLine,
        table: table ? table.tableNumber : "n/a",
        customerName,
        peopleCount:
          !peopleCount || parseInt(peopleCount, 10) === 0 ? "n/a" : peopleCount,
      });

      setIsDialogOpen(false);
      setLoading(false);

      setTable(null);
      setCustomerName("");
      setPeopleCount("");
    }, 1000);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="icon" className="size-6">
          {orderLine.customerName ||
          orderLine.peopleCount ||
          orderLine.price ? (
            <SquarePen className="w-4 h-4" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {orderType === "Dine-in"
              ? "Create a Dine-in Order"
              : "Create a Takeaway Order"}
          </DialogTitle>

          <DialogDescription>
            {orderType === "Dine-in"
              ? "Assign table, customer's name and people count."
              : "Assign customer's name to the order."}
          </DialogDescription>
        </DialogHeader>

        <div className={`space-y-4 py-4 ${styles.container}`}>
          {orderType === "Dine-in" && (
            <div className={styles.marginBottom}>
              <Label htmlFor="table">Table</Label>

              <Select
                value={table ? JSON.stringify(table) : ""}
                onValueChange={(val) => setTable(JSON.parse(val))}
              >
                <SelectTrigger id="table">
                  <SelectValue placeholder="Select table" />
                </SelectTrigger>

                <SelectContent>
                  {tablesList.map((t) => (
                    <SelectItem
                      disabled={t.isOccupied}
                      className={t.isOccupied && styles.occupiedTable}
                      key={t._id}
                      value={JSON.stringify(t)}
                    >
                      Table {t.tableNumber.toString().padStart(2, "0")} —{" "}
                      Capacity: {t.occupancy}
                      {t.isOccupied ? " (Occupied)" : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* CUSTOMER NAME */}
          <div className={styles.marginBottom}>
            <Label htmlFor="customerName">Customer Name</Label>
            <Input
              id="customerName"
              placeholder="Enter name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>

          {/* PEOPLE COUNT */}
          {orderType === "Dine-in" && (
            <div className={styles.marginBottom}>
              <Label htmlFor="peopleCount">
                Total People (Max {table?.occupancy || 0})
              </Label>
              <Input
                id="peopleCount"
                type="number"
                placeholder="0"
                min={1}
                max={table?.occupancy || 1}
                value={peopleCount}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  if (!val || val <= (table?.occupancy || 0)) {
                    setPeopleCount(e.target.value);
                  }
                }}
              />
              {/* Error Message */}
              {table &&
                peopleCount &&
                parseInt(peopleCount, 10) > table.occupancy && (
                  <p className="text-sm text-red-500">
                    Exceeds table capacity ({table.occupancy})
                  </p>
                )}
            </div>
          )}
        </div>

        <DialogFooter>
          {loading ? (
            <Button type="button" disabled>
              <LoaderCircle className="w-4 h-4 animate-spin" />
              Assigning...
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={!isFormValid}
            >
              Assign Order
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateOrderDialog;

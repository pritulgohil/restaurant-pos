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
import { Plus, SquarePen, LoaderCircle, Check } from "lucide-react";
import styles from "./CreateOrderDialog.module.css";
import { useRestaurantContext } from "@/context/RestaurantContext";

const CreateOrderDialog = () => {
  const { orderLine, setOrderLine, orderType, restaurant } =
    useRestaurantContext();
  const [table, setTable] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [peopleCount, setPeopleCount] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [tablesList, setTablesList] = useState([]);

  useEffect(() => {
    if (orderType === "Dine-in" && restaurant) {
      const fetchTables = async () => {
        setTablesList([]); // reset before fetch
        try {
          const token = localStorage.getItem("token"); // get JWT token

          const res = await fetch(`/api/pos/fetch-tables/${restaurant}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (!res.ok) {
            console.error("Failed to fetch tables:", res.statusText);
            return;
          }

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

  const isFormValid =
    orderType === "Dine-in"
      ? table && !!customerName && peopleCount && parseInt(peopleCount, 10) > 0
      : !!customerName;

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setOrderLine({
        ...orderLine,
        table: table || "n/a",
        customerName,
        peopleCount:
          !peopleCount || parseInt(peopleCount, 10) === 0 ? "n/a" : peopleCount,
      });
      setIsDialogOpen(false);
      setLoading(false);
      setTable("");
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
          {orderType === "Dine-in" ? (
            <DialogTitle>Create a Dine-in Order</DialogTitle>
          ) : (
            <DialogTitle>Create a Takeaway Order</DialogTitle>
          )}
          {orderType === "Dine-in" ? (
            <DialogDescription>
              Assign table, customer's name and people count.
            </DialogDescription>
          ) : (
            <DialogDescription>
              Assign customer's name to the order.
            </DialogDescription>
          )}
        </DialogHeader>

        <div className={`space-y-4 py-4 ${styles.container}`}>
          {orderType === "Dine-in" && (
            <div className={styles.marginBottom}>
              <Label htmlFor="table">Table</Label>
              <Select value={table} onValueChange={setTable}>
                <SelectTrigger id="table">
                  <SelectValue placeholder="Select table" />
                </SelectTrigger>
                <SelectContent>
                  {tablesList.map((t) => (
                    <SelectItem
                      disabled={t.isOccupied}
                      className={t.isOccupied && styles.occupiedTable}
                      key={t._id}
                      value={t.tableNumber.toString()}
                    >
                      Table {t.tableNumber.toString().padStart(2, "0")}
                      {t.isOccupied ? " - Occupied" : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className={styles.marginBottom}>
            <Label htmlFor="customerName">Customer Name</Label>
            <Input
              id="customerName"
              placeholder="Enter name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>

          {orderType === "Dine-in" && (
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

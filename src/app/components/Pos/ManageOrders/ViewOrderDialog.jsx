import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import styles from "./ViewOrderDialog.module.css";
import {
  User,
  Utensils,
  TableCellsMerge,
  Users,
  Calendar,
  Clock,
  ChevronDown,
  LoaderCircle,
  RotateCw,
  Trash2,
  Printer,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState, useEffect } from "react";

export function ViewOrderDialog({ children, order, onUpdate, fetchOrders }) {
  const [status, setStatus] = useState(order.status);
  const [open, setOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const orderDate = new Date(order.createdAt);

  const formattedDate = orderDate.toLocaleDateString([], {
    dateStyle: "medium",
  });

  const formattedTime = orderDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleUpdate = async () => {
    console.log("Update order clicked:", order._id, "New status:", status);
    setIsUpdating(true);

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `/api/pos/update-order-status/${order._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: status,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update order. Status: ${response.status}`);
      }

      const updatedOrder = await response.json();
      console.log("Order updated successfully:", updatedOrder);
      setTimeout(() => {
        setIsUpdating(false);
        setOpen(false);
      }, 1000);
      fetchOrders();

      if (onUpdate) {
        onUpdate(order._id, { status: updatedOrder.status });
      }
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  useEffect(() => {
    if (!open) {
      setStatus(order.status);
    }
  }, [open, order.status]);

  const hasStatusChanged = status !== order.status;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        {/* HEADER */}
        <DialogHeader>
          <div className="flex flex-col items-center w-full">
            <DialogTitle className="text-2xl font-bold">
              Order #{order._id ? order._id.slice(-6) : order.orderId}
            </DialogTitle>

            {/* Status with dropdown */}
            <div className="flex items-center space-x-2 mt-2 text-sm">
              <span className="relative flex items-center justify-center">
                {status === "In Progress" && (
                  <span className="absolute w-2 h-2 rounded-full bg-blue-500 opacity-75 animate-ping" />
                )}
                <span
                  className={`w-2 h-2 rounded-full ${
                    status === "Queued"
                      ? "bg-orange-500"
                      : status === "In Progress"
                      ? "bg-blue-500"
                      : "bg-green-500"
                  }`}
                />
              </span>

              {/* dropdown trigger */}
              <Select value={status} onValueChange={(val) => setStatus(val)}>
                <SelectTrigger className="flex items-center gap-2 border-none bg-transparent shadow-none p-0 h-auto focus:ring-0 focus:outline-none [&>svg]:hidden">
                  <div className="flex items-center">
                    <SelectValue className="text-sm font-medium" />
                    <ChevronDown className="w-4 h-4 ml-1 text-gray-500 shrink-0" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Queued">Queued</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </DialogHeader>

        {/* ORDER DETAILS */}
        <div className={styles.mainContainer}>
          <div className={styles.orderDetailsContainer}>
            {/* Row 1: Customer & Order Type */}
            <div className={styles.row}>
              <div className={styles.orderDetails}>
                <User className="w-4 h-4 text-gray-500" />
                {order.customerName}
              </div>
              <div className={`${styles.orderDetails} ${styles.capitalize}`}>
                <Utensils className="w-4 h-4 text-gray-500" />
                {order.orderType}
              </div>
            </div>

            {/* Row 2: Table & People Count */}
            {order.orderType === "Dine-in" && (
              <div className={styles.row}>
                <div className={styles.orderDetails}>
                  <TableCellsMerge className="w-4 h-4 text-gray-500" />
                  Table{" "}
                  {order.table ? order.table.toString().padStart(2, "0") : "-"}
                </div>
                <div className={`${styles.orderDetails} ${styles.capitalize}`}>
                  <Users className="w-4 h-4 text-gray-500" />
                  {order.peopleCount} people
                </div>
              </div>
            )}

            {/* Row 3: Date & Time */}
            <div className={styles.row}>
              <div className={styles.orderDetails}>
                <Calendar className="w-4 h-4 text-gray-500" />
                {formattedDate}
              </div>
              <div className={`${styles.orderDetails} ${styles.capitalize}`}>
                <Clock className="w-4 h-4 text-gray-500" />
                {formattedTime}
              </div>
            </div>
          </div>

          <div className={styles.divider}></div>

          {/* ORDER ITEMS */}
          <div className={styles.orderItemsContainer}>
            <div className={styles.sectionHeader}>Order Items</div>
            <div className={styles.itemsListContainer}>
              {Object.values(order.dishes).map((dish) => (
                <div key={dish._id} className={styles.item}>
                  <div className={styles.itemName}>{dish.name}</div>
                  <div className={styles.quantity}>{dish.quantity}x</div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.divider}></div>

          {/* PAYMENT SUMMARY */}
          <div className={styles.orderItemsContainer}>
            <div className={styles.sectionHeader}>Payment Summary</div>
            <div className={styles.itemsListContainer}>
              <div className={styles.item}>
                <div className={styles.itemName}>Subtotal</div>
                <div className={styles.quantity}>
                  ${order.subtotal.toFixed(2)}
                </div>
              </div>
              <div className={styles.item}>
                <div className={styles.itemName}>Tax</div>
                <div className={styles.quantity}>${order.tax.toFixed(2)}</div>
              </div>
            </div>
          </div>

          <div className={styles.payableDivider}></div>

          {/* TOTAL PAYABLE */}
          <div className={styles.payableContainer}>
            <div className={styles.sectionHeader}>Total Payable</div>
            <div className={styles.totalPayablePrice}>
              ${order.totalPayable.toFixed(2)}
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex w-full gap-3 mt-6">
            {isUpdating ? (
              <Button
                className="flex-1"
                variant="outline"
                onClick={handleUpdate}
                disabled={!hasStatusChanged}
              >
                <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />
                Updating
              </Button>
            ) : (
              <Button
                className="flex-1"
                variant="outline"
                onClick={handleUpdate}
                disabled={!hasStatusChanged}
              >
                <RotateCw />
                Update
              </Button>
            )}

            <Button className="flex-1" variant="destructive">
              <Trash2 />
              Delete
            </Button>

            <Button className="flex-1">
              <Printer />
              Print Receipt
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

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
} from "lucide-react";

import { Button } from "@/components/ui/button";

export function ViewOrderDialog({ children, order }) {
  const orderDate = new Date(order.createdAt);

  const formattedDate = orderDate.toLocaleDateString([], {
    dateStyle: "medium",
  });

  const formattedTime = orderDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handlePrint = () => {
    window.print();
  };

  const handleUpdate = () => {
    console.log("Update order clicked:", order._id);
    // 🔑 Here you can open an update form or trigger API call
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        {/* HEADER */}
        <DialogHeader>
          <div className="flex flex-col items-center w-full">
            <DialogTitle className="text-2xl font-bold">
              Order #{order._id ? order._id.slice(-6) : order.orderId}
            </DialogTitle>
            <div className="flex items-center space-x-2 mt-2 text-sm">
              <span className="relative flex items-center justify-center">
                {order.status === "In Progress" && (
                  <span className="absolute w-2 h-2 rounded-full bg-blue-500 opacity-75 animate-ping" />
                )}
                <span
                  className={`w-2 h-2 rounded-full ${
                    order.status === "Queued"
                      ? "bg-orange-500"
                      : order.status === "In Progress"
                      ? "bg-blue-500"
                      : "bg-green-500"
                  }`}
                />
              </span>
              <span>{order.status}</span>
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
          {/* ACTION BUTTONS */}
          <div className="flex w-full gap-3 mt-6">
            <Button className="w-1/2" variant="outline" onClick={handleUpdate}>
              Update
            </Button>
            <Button className="w-1/2" onClick={handlePrint}>
              Print Receipt
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

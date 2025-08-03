import React from "react";
import styles from "./OrderLineSummary.module.css";
import { Trash2, Receipt, IdCard, Printer, Mouse } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRestaurantContext } from "@/context/RestaurantContext";
import { Skeleton } from "@/components/ui/skeleton";
import CreateOrderDialog from "./CreateOrderDialog";

const OrderLineSummary = () => {
  const { orderLine, setOrderLine } = useRestaurantContext();

  // Calculate subtotal
  const subtotal = Object.values(orderLine?.dishes || {}).reduce(
    (acc, dish) => acc + dish.price * dish.quantity,
    0
  );

  // Calculate tax at 13%
  const tax = subtotal * 0.13;

  // Calculate total payable
  const totalPayable = subtotal + tax;

  // Calculate total number of ordered items
  const totalItems = Object.values(orderLine?.dishes || {}).reduce(
    (total, dish) => total + dish.quantity,
    0
  );

  const handleDeleteOrderLine = () => {
    // Your delete logic here
    setOrderLine({});
  };

  const handlePlaceOrder = async () => {
    try {
      const token = localStorage.getItem("token"); // Adjust to where you store the token

      const res = await fetch("/api/pos/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderLine),
      });

      if (!res.ok) {
        throw new Error("Failed to place order");
      }

      const data = await res.json();
      console.log("Order saved:", data);
      setOrderLine({});
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.summaryTopContainer}>
        <div className={styles.topCard}>
          <div className={styles.summaryContainer}>
            <div className={styles.tableContainer}>
              <div className={styles.topContainer}>
                <div className={styles.tableNumber}>
                  {/* Table number goes here */}
                  {orderLine.table ? (
                    `Table No #0${orderLine.table}`
                  ) : (
                    <Skeleton className="h-4 w-[120px]" />
                  )}
                </div>
                <div className={styles.iconContainer}>
                  <CreateOrderDialog />
                  <Button
                    variant="secondary"
                    size="icon"
                    className="size-6 text-red-500"
                    onClick={handleDeleteOrderLine}
                  >
                    <Trash2 />
                  </Button>
                </div>
              </div>
              <div className={styles.bottomContainer}>
                <div className={styles.orderId}>
                  {/* Name goes here */}
                  {orderLine.customerName ? (
                    orderLine.customerName
                  ) : (
                    <Skeleton className="h-4 w-[80px]" />
                  )}
                </div>
                <div className={styles.peopleContainer}>
                  {/* People goes here */}
                  {orderLine.peopleCount ? (
                    `${orderLine.peopleCount} People`
                  ) : (
                    <Skeleton className="h-4 w-[60px]" />
                  )}
                </div>
              </div>
            </div>
            <hr className="border-t border-dashed border-gray-300" />
            <div className={styles.orderedItemsContainer}>
              <div className={styles.topContainer}>
                <div className={styles.sectionHeader}>Ordered Items</div>
                <div className={styles.totalItems}>{totalItems}</div>
              </div>
              <div className={styles.orderBottomContainer}>
                {orderLine?.dishes && Object.values(orderLine.dishes).length > 0
                  ? Object.values(orderLine.dishes).map((dish, index) => (
                      <div key={index} className={styles.orderEntry}>
                        <div className={styles.orderItems}>
                          <div className={styles.orderQuantity}>
                            {dish.quantity}x
                          </div>
                          <div className={styles.orderName}>{dish.name}</div>
                        </div>
                        <div className={styles.orderPrice}>
                          ${(dish.price * dish.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))
                  : Array.from({ length: 3 }).map((_, index) => (
                      <div key={index} className={styles.orderEntry}>
                        <div className={styles.orderItems}>
                          <Skeleton className="h-4 w-[20px]" />
                          <Skeleton className="h-4 w-[150px] ml-2" />
                        </div>
                        <Skeleton className="h-4 w-[40px]" />
                      </div>
                    ))}
              </div>
            </div>
            <hr className="border-t border-dashed border-gray-300" />
            <div className={styles.paymentSummary}>
              <div className={styles.topContainer}>
                <div className={styles.sectionHeader}>Payment Summary</div>
              </div>
              <div className={styles.orderBottomContainer}>
                <div className={styles.orderEntry}>
                  <div className={styles.orderItems}>
                    <div className={styles.orderName}>Subtotal</div>
                  </div>
                  <div className={styles.orderPrice}>
                    ${subtotal.toFixed(2)}
                  </div>
                </div>
                <div className={styles.orderEntry}>
                  <div className={styles.orderItems}>
                    <div className={styles.orderName}>Tax</div>
                  </div>
                  <div className={styles.orderPrice}>${tax.toFixed(2)}</div>
                </div>
              </div>
            </div>
            <hr className="border-t border-dashed border-gray-300" />
            <div className={styles.totalPayable}>
              <div className={styles.topContainer}>
                <div className={styles.sectionHeader}>Total Payable</div>
                <div className={styles.totalPayment}>{`$${totalPayable.toFixed(
                  2
                )}`}</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.bottomCard}>
          <div className={styles.sectionHeader}>Payment Method</div>
          <div className={styles.paymentCardContainer}>
            <div className={styles.paymentCard}>
              <Button className="w-full" variant="outline">
                <Receipt />
                Cash
              </Button>
            </div>
            <div className={styles.paymentCard}>
              <Button className="w-full" variant="outline">
                <IdCard />
                Card
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.summaryBottomContainer}>
        <div className={styles.printButton}>
          <Button variant="outline" className="w-full">
            <Printer />
            Print
          </Button>
        </div>
        <div className={styles.placeOrderButton}>
          <Button className="w-full" onClick={handlePlaceOrder}>
            <Mouse />
            Place Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderLineSummary;

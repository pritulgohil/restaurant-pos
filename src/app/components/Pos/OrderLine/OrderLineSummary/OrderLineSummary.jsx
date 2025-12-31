import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./OrderLineSummary.module.css";
import {
  Trash2,
  Receipt,
  IdCard,
  Printer,
  Mouse,
  LoaderCircle,
  Utensils,
  ShoppingBag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRestaurantContext } from "@/context/RestaurantContext";
import { Skeleton } from "@/components/ui/skeleton";
import CreateOrderDialog from "./CreateOrderDialog";
import { useNotification } from "@/context/NotificationContext";
import notification from "@/models/notification";

const OrderLineSummary = () => {
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [loading, setLoading] = useState(false);
  const {
    orderType,
    setOrderType,
    fetchAllOrders,
    orderLine,
    setOrderLine,
    restaurant,
  } = useRestaurantContext();
  const { sendNotification, fetchNotifications } = useNotification();

  const searchParams = useSearchParams();
  useEffect(() => {
    const customerName = searchParams.get("customerName") ?? undefined;
    const peopleCount = searchParams.get("peopleCount");
    const tableId = searchParams.get("tableId") ?? undefined;
    const tableNumber = searchParams.get("tableNumber") ?? undefined;

    setOrderLine((prev) => ({
      ...prev,
      ...(customerName && { customerName }),
      ...(peopleCount && { peopleCount: Number(peopleCount) }),
      ...(tableId && { tableId }),
      ...(tableNumber && { table: tableNumber }),
    }));
  }, [searchParams]);

  const isOrderValid =
    orderLine &&
    orderLine.dishes &&
    Object.values(orderLine.dishes).length > 0 &&
    !!orderLine.customerName &&
    (orderType === "Dine-in"
      ? !!orderLine.table && !!orderLine.peopleCount
      : true);

  const subtotal = Object.values(orderLine?.dishes || {}).reduce(
    (acc, dish) => acc + dish.price * dish.quantity,
    0
  );

  const tax = subtotal * 0.13;

  const totalPayable = subtotal + tax;

  const totalItems = Object.values(orderLine?.dishes || {}).reduce(
    (total, dish) => total + dish.quantity,
    0
  );

  const handleDeleteOrderLine = () => {
    setOrderLine({});
  };

  console.log("Order Line:", orderLine);

  const handlePlaceOrder = async () => {
    try {
      setLoading(true);
      const enrichedOrder = {
        ...orderLine,
        restaurantId: restaurant,
        subtotal: Number(subtotal.toFixed(2)),
        tax: Number(tax.toFixed(2)),
        totalPayable: Number(totalPayable.toFixed(2)),
        totalItems: totalItems,
        status: "Queued",
        paymentMethod: paymentMethod,
        orderType: orderType,
      };

      const token = localStorage.getItem("token");
      const res = await fetch("/api/pos/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(enrichedOrder),
      });

      if (!res.ok) {
        throw new Error("Failed to place order");
      }

      const data = await res.json();

      setTimeout(() => {
        setLoading(false);
        setOrderLine({});
        fetchAllOrders();
        fetchNotifications({ restaurantId: restaurant, reset: true });
      }, 2000);

      console.log("Order saved:", enrichedOrder);
      console.log("Response from server:", data);

      if (orderLine.tableId) {
        const tablePayload = {
          orderId: data._id,
          customerName: orderLine.customerName,
          peopleCount: orderLine.peopleCount,
          isOccupied: true,
        };

        const tableRes = await fetch(
          `/api/pos/update-table/${orderLine.tableId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(tablePayload),
          }
        );

        if (!tableRes.ok) {
          throw new Error("Failed to update table");
        }
      }

      await sendNotification({
        notificationSender: "Order Line",
        orderId: data._id,
        restaurantId: restaurant,
        notificationDescription: `New order #${data._id.slice(
          -6
        )} has been placed.`,
      });
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.summaryTopContainer}>
        <div className={styles.bottomCard}>
          <div className={styles.sectionHeader}>Order Type</div>
          <div className={styles.paymentCardContainer}>
            <div className={styles.paymentCard}>
              <Button
                className="w-full"
                variant={orderType === "Dine-in" ? "default" : "outline"}
                onClick={() => setOrderType("Dine-in")}
              >
                <Utensils />
                Dine-In
              </Button>
            </div>
            <div className={styles.paymentCard}>
              <Button
                className="w-full"
                variant={orderType === "Takeaway" ? "default" : "outline"}
                onClick={() => setOrderType("Takeaway")}
                disabled={orderLine.table ? true : false}
              >
                <ShoppingBag />
                Takeaway
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.topCard}>
          <div className={styles.summaryContainer}>
            <div className={styles.tableContainer}>
              <div className={styles.topContainer}>
                {orderType === "Dine-in" ? (
                  <div className={styles.tableNumber}>
                    {orderLine.table ? (
                      `Table No #0${orderLine.table}`
                    ) : (
                      <Skeleton className="h-4 w-[120px]" />
                    )}
                  </div>
                ) : (
                  <div className={styles.tableNumber}>
                    {orderLine.customerName ? (
                      orderLine.customerName
                    ) : (
                      <Skeleton className="h-4 w-[120px]" />
                    )}
                  </div>
                )}
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
              {orderType === "Dine-in" && (
                <div className={styles.bottomContainer}>
                  <div className={styles.orderId}>
                    {orderLine.customerName ? (
                      orderLine.customerName
                    ) : (
                      <Skeleton className="h-4 w-[80px]" />
                    )}
                  </div>
                  <div className={styles.peopleContainer}>
                    {orderLine.peopleCount ? (
                      `${orderLine.peopleCount} People`
                    ) : (
                      <Skeleton className="h-4 w-[60px]" />
                    )}
                  </div>
                </div>
              )}
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
              <Button
                className="w-full"
                variant={paymentMethod === "cash" ? "default" : "outline"}
                onClick={() => setPaymentMethod("cash")}
              >
                <Receipt />
                Cash
              </Button>
            </div>
            <div className={styles.paymentCard}>
              <Button
                className="w-full"
                variant={paymentMethod === "card" ? "default" : "outline"}
                onClick={() => setPaymentMethod("card")}
              >
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
          {loading ? (
            <Button className="w-full" disabled>
              <LoaderCircle className="animate-spin" />
              Placing Order...
            </Button>
          ) : (
            <Button
              className="w-full"
              onClick={handlePlaceOrder}
              disabled={!isOrderValid}
            >
              <Mouse />
              Place Order
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderLineSummary;

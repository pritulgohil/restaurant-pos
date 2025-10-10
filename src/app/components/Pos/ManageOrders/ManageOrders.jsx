"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRestaurantContext } from "@/context/RestaurantContext";
import styles from "./ManageOrders.module.css";
import { ViewOrderDialog } from "@/app/components/Pos/ManageOrders/ViewOrderDialog";
import {
  Utensils,
  Hash,
  Users,
  List,
  Clock,
  DollarSign,
  ClipboardCheck,
} from "lucide-react";

const ManageOrders = () => {
  const { orders, setOrders, restaurant } = useRestaurantContext();
  const searchParams = useSearchParams();
  const orderIdToView = searchParams.get("orderId");
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    if (orderIdToView) {
      setSelectedOrderId(orderIdToView);
    }
  }, [orderIdToView]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/pos/fetch-all-orders/${restaurant}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch orders: ${response.status}`);
      }

      const data = await response.json();
      setOrders && setOrders(data.orders || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <Table className="border-separate border-spacing-y-4">
      <TableCaption>Track and review all your orders</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px]">
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4" />
              Order ID
            </div>
          </TableHead>
          <TableHead>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Customer
            </div>
          </TableHead>
          <TableHead>
            <div className="flex items-center gap-2">
              <List className="w-4 h-4" />
              Items
            </div>
          </TableHead>
          <TableHead>
            <div className="flex items-center gap-2">
              <ClipboardCheck className="w-4 h-4" />
              Status
            </div>
          </TableHead>
          <TableHead>
            <div className="flex items-center gap-2">
              <Utensils className="w-4 h-4" />
              Type
            </div>
          </TableHead>
          <TableHead>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Created
            </div>
          </TableHead>
          <TableHead className="text-right">
            <div className="flex items-center gap-2 justify-end">
              <DollarSign className="w-4 h-4" />
              Total
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {orders && orders.length > 0 ? (
          orders.map((order) => (
            <ViewOrderDialog
              key={order._id || order.orderId}
              order={order}
              fetchOrders={fetchOrders}
              open={selectedOrderId === order._id}
            >
              <TableRow
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => setSelectedOrderId(order._id)}
              >
                <TableCell className="font-medium">
                  #{order._id ? order._id.slice(-6) : order.orderId}
                </TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{order.totalItems}X</TableCell>
                <TableCell className="flex items-center gap-2">
                  <div className="relative flex items-center justify-center w-4 h-4">
                    {order.status === "In Progress" && (
                      <div
                        className={`${styles.statusIndicatorOuter} absolute bg-blue-500 animate-ping`}
                      />
                    )}
                    <div
                      className={`${styles.statusIndicator} ${
                        order.status === "Completed"
                          ? "bg-green-500"
                          : order.status === "In Progress"
                          ? "bg-blue-500"
                          : "bg-orange-500"
                      }`}
                    />
                  </div>
                  {order.status}
                </TableCell>
                <TableCell>{order.orderType}</TableCell>
                <TableCell>
                  {new Date(order.createdAt).toLocaleDateString([], {
                    dateStyle: "medium",
                  })}
                </TableCell>
                <TableCell className="text-right">
                  ${order.totalPayable.toFixed(2)}
                </TableCell>
              </TableRow>
            </ViewOrderDialog>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={7} className="text-center">
              No orders found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default ManageOrders;

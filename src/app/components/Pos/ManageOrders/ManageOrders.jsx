"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRestaurantContext } from "@/context/RestaurantContext";
import styles from "./ManageOrders.module.css";

const ManageOrders = () => {
  const { orders } = useRestaurantContext();
  // const orders = [
  //   {
  //     orderId: "ORD001",
  //     table: "1",
  //     customerName: "Pritul Gohil",
  //     peopleCount: 2,
  //     totalItems: 3,
  //     totalPayable: 29.1,
  //     status: "Completed",
  //     orderType: "Dine-in",
  //     createdAt: "2025-09-05T02:26:30.414Z",
  //   },
  //   {
  //     orderId: "ORD002",
  //     table: "3",
  //     customerName: "Jane Doe",
  //     peopleCount: 4,
  //     totalItems: 5,
  //     totalPayable: 76.5,
  //     status: "In Progress",
  //     orderType: "Dine-in",
  //     createdAt: "2025-09-05T04:10:12.111Z",
  //   },
  //   {
  //     orderId: "ORD003",
  //     table: "Takeaway",
  //     customerName: "John Smith",
  //     peopleCount: 1,
  //     totalItems: 2,
  //     totalPayable: 18.0,
  //     status: "Pending",
  //     orderType: "Takeaway",
  //     createdAt: "2025-09-05T06:45:50.000Z",
  //   },
  // ];

  return (
    <Table>
      <TableCaption>Track and review all your orders</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Order ID</TableHead>
          <TableHead>Table</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>People</TableHead>
          <TableHead>Items</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Created</TableHead>
          <TableHead className="text-right">Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders?.length > 0 ? (
          orders.map((order) => (
            <TableRow
              key={order._id || order.orderId}
              className="cursor-pointer hover:bg-muted/50"
            >
              <TableCell className="font-medium">
                #{order._id ? order._id.slice(-6) : order.orderId}
              </TableCell>
              <TableCell>
                {order.table && order.table.toLowerCase() !== "n/a"
                  ? order.table
                  : "-"}
              </TableCell>
              <TableCell>{order.customerName}</TableCell>
              <TableCell>
                {order.peopleCount &&
                order.peopleCount.toString().toLowerCase() !== "n/a"
                  ? order.peopleCount
                  : "-"}
              </TableCell>
              <TableCell>{order.totalItems}X</TableCell>
              <TableCell className="flex items-center gap-2">
                <div className="relative flex items-center justify-center w-4 h-4">
                  {order.status === "In Progress" && (
                    <div
                      className={`${
                        styles.statusIndicatorOuter
                      } absolute bg-blue-500 ${
                        order.status === "In Progress" ? "animate-ping" : ""
                      }`}
                    ></div>
                  )}
                  <div
                    className={`${styles.statusIndicator} ${
                      order.status === "Completed" ? "bg-green-500" : ""
                    } ${order.status === "In Progress" ? "bg-blue-500" : ""} ${
                      order.status === "Queued" ? "bg-orange-500" : ""
                    }`}
                  ></div>
                </div>
                {order.status}
              </TableCell>

              <TableCell>{order.orderType}</TableCell>
              <TableCell>
                {new Date(order.createdAt).toLocaleString([], {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </TableCell>
              <TableCell className="text-right">
                ${order.totalPayable.toFixed(2)}
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={9} className="text-center">
              No orders found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>

      {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={9}>
            Last Updated:{" "}
            {new Date().toLocaleString([], {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </TableCell>
        </TableRow>
      </TableFooter> */}
    </Table>
  );
};

export default ManageOrders;

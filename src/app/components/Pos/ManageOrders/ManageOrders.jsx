"use client";

import React from "react";
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
  UserRound,
  Hash,
  Users,
  List,
  Clock,
  DollarSign,
  Tag,
} from "lucide-react";

const ManageOrders = () => {
  const { orders } = useRestaurantContext();

  return (
    <>
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
                <Tag className="w-4 h-4" />
                Status
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-2">
                <UserRound className="w-4 h-4" />
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
          {orders?.length > 0 ? (
            orders.map((order) => (
              <ViewOrderDialog key={order._id || order.orderId} order={order}>
                <TableRow
                  className={`cursor-pointer hover:bg-muted/50 ${styles.tableRow}`}
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
                          order.status === "Completed" ? "bg-green-500" : ""
                        } ${
                          order.status === "In Progress" ? "bg-blue-500" : ""
                        } ${order.status === "Queued" ? "bg-orange-500" : ""}`}
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
    </>
  );
};

export default ManageOrders;

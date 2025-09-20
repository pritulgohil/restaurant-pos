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

const ManageOrders = () => {
  const orders = [
    {
      orderId: "ORD001",
      table: "1",
      customerName: "Pritul Gohil",
      peopleCount: 2,
      totalItems: 3,
      totalPayable: 29.1,
      status: "Completed",
      orderType: "Dine-in",
      createdAt: "2025-09-05T02:26:30.414Z",
    },
    {
      orderId: "ORD002",
      table: "3",
      customerName: "Jane Doe",
      peopleCount: 4,
      totalItems: 5,
      totalPayable: 76.5,
      status: "In Progress",
      orderType: "Dine-in",
      createdAt: "2025-09-05T04:10:12.111Z",
    },
    {
      orderId: "ORD003",
      table: "Takeaway",
      customerName: "John Smith",
      peopleCount: 1,
      totalItems: 2,
      totalPayable: 18.0,
      status: "Pending",
      orderType: "Takeaway",
      createdAt: "2025-09-05T06:45:50.000Z",
    },
  ];

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
        {orders.map((order) => (
          <TableRow
            className="cursor-pointer hover:bg-muted/50"
            key={order.orderId}
          >
            <TableCell className="font-medium">{order.orderId}</TableCell>
            <TableCell>{order.table}</TableCell>
            <TableCell>{order.customerName}</TableCell>
            <TableCell>{order.peopleCount}</TableCell>
            <TableCell>{order.totalItems}X</TableCell>
            <TableCell>{order.status}</TableCell>
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
        ))}
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

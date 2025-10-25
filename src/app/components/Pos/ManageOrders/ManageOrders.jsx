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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Search, Filter, CalendarDays } from "lucide-react";

const ManageOrders = () => {
  const { orders, setOrders, restaurant } = useRestaurantContext();
  const searchParams = useSearchParams();
  const orderIdToView = searchParams.get("orderId");

  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState(null);

  const ordersPerPage = 10;

  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = localStorage.getItem("manageOrdersPage");
    return savedPage ? parseInt(savedPage, 10) : 1;
  });

  useEffect(() => {
    localStorage.setItem("manageOrdersPage", currentPage);
  }, [currentPage]);

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
      setFilteredOrders(data.orders || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    let filtered = orders;

    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.customerName
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          order._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.orderId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.status?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter && statusFilter !== "all") {
      filtered = filtered.filter(
        (order) => order.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    if (dateFilter) {
      filtered = filtered.filter((order) => {
        const orderDate = new Date(order.createdAt);
        return orderDate.toDateString() === dateFilter.toDateString();
      });
    }

    setFilteredOrders(filtered);

    if (currentPage > Math.ceil(filtered.length / ordersPerPage)) {
      setCurrentPage(1);
    }
  }, [searchTerm, statusFilter, dateFilter, orders]);

  // Auto-navigate to page containing orderIdToView
  useEffect(() => {
    if (!orderIdToView || !orders || orders.length === 0) return;

    const index = orders.findIndex(
      (order) => order._id === orderIdToView || order.orderId === orderIdToView
    );

    if (index !== -1) {
      const pageOfOrder = Math.floor(index / ordersPerPage) + 1;

      if (pageOfOrder !== currentPage) {
        setCurrentPage(pageOfOrder);
      }

      setTimeout(() => {
        setSelectedOrderId(orderIdToView);
      }, 50);
    }
  }, [orderIdToView, orders]);

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative w-80">
          <Input
            className="pl-10"
            placeholder="Search orders by name or #id..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={16}
          />
        </div>

        <Select
          value={statusFilter || "all"}
          onValueChange={(value) =>
            setStatusFilter(value === "all" ? "" : value)
          }
        >
          <SelectTrigger className="w-34 flex items-center gap-2">
            <Filter size={16} className="text-gray-400" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Queued">Queued</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger>
            <div className="relative w-40">
              <Input
                readOnly
                placeholder="Filter by date"
                value={dateFilter ? format(dateFilter, "MMM dd, yyyy") : ""}
                className="w-full cursor-pointer pl-10"
              />
              <CalendarDays
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
            </div>
          </PopoverTrigger>

          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={dateFilter}
              onSelect={setDateFilter}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Orders Table */}
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
          {currentOrders && currentOrders.length > 0 ? (
            currentOrders.map((order) => (
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          <button
            className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`px-3 py-1 border rounded ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
            onClick={() =>
              setCurrentPage(Math.min(currentPage + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ManageOrders;

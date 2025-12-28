"use client";

import { createContext, useContext, useState } from "react";

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const [notificationSender, setNotificationSender] = useState(null);
  const [orderId, setOrderId] = useState(null);

  const [notifications, setNotifications] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    hasMore: true,
    page: 1,
  });
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [notificationLength, setNotificationLength] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendNotification = async ({
    notificationSender,
    orderId,
    restaurantId,
  }) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("User is not authenticated");

    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/notification/create-notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ notificationSender, orderId, restaurantId }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send notification");

      setNotificationSender(notificationSender);
      setOrderId(orderId);

      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchNotifications = async ({ restaurantId, reset = false }) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("User is not authenticated");

    try {
      setLoading(true);
      setError(null);

      if (reset) {
        setNotifications([]); // 👈 CRITICAL LINE
        setPage(1);
      }

      const currentPage = reset ? 1 : page;

      const res = await fetch(
        `/api/notification/fetch-notification/${restaurantId}?page=${currentPage}&limit=6`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      if (!res.ok)
        throw new Error(data.error || "Failed to fetch notifications");

      setNotifications((prev) =>
        reset ? data.notifications : [...prev, ...data.notifications]
      );

      setPagination({
        total: data.pagination.total,
        hasMore: data.pagination.hasMore,
        page: currentPage + 1,
      });

      setHasMore(data.pagination.hasMore);
      setPage(currentPage + 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetNotifications = () => {
    setNotifications([]);
    setPage(1);
    setHasMore(true);
  };

  const value = {
    notifications,
    notificationSender,
    orderId,
    loading,
    error,
    hasMore,
    setNotificationSender,
    setOrderId,
    sendNotification,
    fetchNotifications,
    resetNotifications,
    pagination,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
}

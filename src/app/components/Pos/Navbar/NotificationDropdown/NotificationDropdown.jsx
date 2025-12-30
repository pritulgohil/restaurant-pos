"use client";

import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Bell,
  ArrowLeftRight,
  CheckCheck,
  ClipboardList,
  LayoutDashboard,
  LoaderCircle,
  X,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNotification } from "@/context/NotificationContext";
import { useRestaurantContext } from "@/context/RestaurantContext";
import { Skeleton } from "@/components/ui/skeleton";

import styles from "./NotificationDropDown.module.css";

export default function NotificationDropdown() {
  const { restaurant } = useRestaurantContext();
  const { notifications, fetchNotifications, loading, hasMore, pagination } =
    useNotification();

  const [open, setOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [readingId, setReadingId] = useState(null);
  const [markAllLoading, setMarkAllLoading] = useState(false);
  const totalNotifications = pagination.total;
  const isInitialLoading = loading && notifications.length === 0;
  const isPaginating = loading && notifications.length > 0;
  const allNotificationsRead =
    notifications.length > 0 && notifications.every((n) => n.notificationRead);

  useEffect(() => {
    if (open && restaurant) {
      fetchNotifications({ restaurantId: restaurant, reset: true });
    }
  }, [open, restaurant]);

  const handleDeleteNotification = async (e, notificationId) => {
    e.stopPropagation();
    setDeletingId(notificationId);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Not authenticated");

      await fetch(`/api/notification/delete-notification/${notificationId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTimeout(() => {
        fetchNotifications({ restaurantId: restaurant, reset: true });
        setDeletingId(null);
      }, 500);
    } catch (error) {
      console.error("Delete notification error:", error);
      setDeletingId(null);
    }
  };

  const handleMarkAsRead = async (e, notificationId) => {
    e.stopPropagation();
    setReadingId(notificationId);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Not authenticated");

      await fetch(`/api/notification/read-notification`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ notificationId }),
      });
      setTimeout(() => {
        fetchNotifications({ restaurantId: restaurant, reset: true });
        setReadingId(null);
      }, 1000);
    } catch (error) {
      console.error("Mark as read error:", error);
    }
  };

  // ✅ MARK ALL AS READ
  const handleMarkAllAsRead = async () => {
    setMarkAllLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Not authenticated");

      await fetch(`/api/notification/read-notification`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ restaurantId: restaurant }),
      });
      setTimeout(() => {
        fetchNotifications({ restaurantId: restaurant, reset: true });
        setMarkAllLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Mark all as read error:", error);
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <div className={styles.bellIconContainer}>
          <Bell className={styles.bellIcon} />
          {notifications.some((n) => !n.notificationRead) && (
            <div className={styles.notificationIndicator}></div>
          )}
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className={styles.dropdownContent}>
        <div className={styles.dropdownHeader}>
          <DropdownMenuLabel className="font-medium">
            Notifications ({totalNotifications})
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
        </div>

        <div
          className={styles.notificationsContainer}
          onScroll={(e) => {
            const el = e.currentTarget;
            if (
              el.scrollTop + el.clientHeight >= el.scrollHeight - 10 &&
              hasMore &&
              !loading
            ) {
              fetchNotifications({ restaurantId: restaurant });
            }
          }}
        >
          {isInitialLoading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <DropdownMenuItem key={index} className={styles.notificationItem}>
                <div className={styles.skeletonNotificationIcon}>
                  <Skeleton className="h-10 w-[40px] rounded-md" />
                </div>
                <div className={styles.notificationDetails}>
                  <Skeleton className="h-4 w-[60%] mb-2" />
                  <Skeleton className="h-3 w-[80%] mb-1" />
                  <Skeleton className="h-3 w-[40%]" />
                </div>
              </DropdownMenuItem>
            ))
          ) : notifications.length === 0 ? (
            <DropdownMenuItem className="flex justify-center items-center text-gray-400">
              No notifications
            </DropdownMenuItem>
          ) : (
            notifications.map((n) => {
              const isUnread = !n.notificationRead;

              return (
                <DropdownMenuItem
                  key={n._id}
                  className={styles.notificationItem}
                  disabled={deletingId === n._id}
                >
                  <div className={styles.notificationIcon}>
                    {n.notificationSender === "Order Line" && (
                      <ArrowLeftRight className="text-gray-500" />
                    )}
                    {n.notificationSender === "Order Board" && (
                      <ClipboardList className="text-gray-500" />
                    )}
                    {n.notificationSender === "Dashboard" && (
                      <LayoutDashboard className="text-gray-500" />
                    )}
                    {isUnread && (
                      <div className={styles.notificationIndicator}></div>
                    )}
                  </div>

                  <div className={styles.notificationDetails}>
                    <div className={styles.titleContainer}>
                      <div
                        className={`${styles.notificationTitle} ${
                          isUnread ? "font-bold" : ""
                        }`}
                      >
                        {n.notificationSender}
                      </div>
                      <div className={styles.buttonContainer}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-2 h-4 w-4 hover:bg-gray-200"
                          onClick={(e) => handleDeleteNotification(e, n._id)}
                          disabled={deletingId === n._id}
                        >
                          {deletingId === n._id ? (
                            <LoaderCircle className="animate-spin h-4 w-4" />
                          ) : (
                            <X strokeWidth={1} />
                          )}
                        </Button>
                        {isUnread && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-2 h-4 w-4 hover:bg-gray-200"
                            onClick={(e) => handleMarkAsRead(e, n._id)}
                            disabled={readingId === n._id}
                          >
                            {readingId === n._id ? (
                              <LoaderCircle className="animate-spin h-4 w-4" />
                            ) : (
                              <Eye strokeWidth={1} />
                            )}
                          </Button>
                        )}
                      </div>
                    </div>

                    <div
                      className={`${styles.notificationDescription} ${
                        isUnread ? "font-bold" : ""
                      }`}
                    >
                      {n.notificationDescription}
                    </div>

                    <div
                      className={`${styles.notificationTime} ${
                        isUnread ? "font-bold" : ""
                      }`}
                    >
                      {new Date(n.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </DropdownMenuItem>
              );
            })
          )}

          {isPaginating && (
            <DropdownMenuItem disabled>
              <LoaderCircle className="text-gray-500 animate-spin mx-auto" />
            </DropdownMenuItem>
          )}
        </div>

        {notifications.length > 0 && (
          <div className={styles.dropdownFooter}>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-sm flex items-center justify-center text-muted-foreground"
              onSelect={(e) => e.preventDefault()} // 👈 THIS LINE
            >
              <Button
                variant="ghost"
                size="sm"
                className="p-2 h-4 w-4"
                onClick={handleMarkAllAsRead}
                disabled={markAllLoading || allNotificationsRead}
              >
                {markAllLoading ? (
                  <LoaderCircle className="animate-spin mr-1" />
                ) : (
                  <CheckCheck className="mr-1" />
                )}
                Mark all as read
              </Button>
            </DropdownMenuItem>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

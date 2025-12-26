"use client";

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
} from "lucide-react";
import { Button } from "@/components/ui/button";

import styles from "./NotificationDropDown.module.css";

export default function NotificationDropdown() {
  const notifications = [
    {
      id: 1,
      title: "Order Line",
      description: "Order #9ab5cf has been added to queue",
      time: "5 mins ago",
      icon: <ArrowLeftRight className="text-gray-500" />,
      hasIndicator: true,
    },
    {
      id: 2,
      title: "Order Board",
      description: "Order #acf45d is in progress",
      time: "7 mins ago",
      icon: <ClipboardList className="text-gray-500" />,
      hasIndicator: true,
    },
    {
      id: 3,
      title: "Dashboard",
      description: "Restaurant has hit 85% capacity",
      time: "11 mins ago",
      icon: <LayoutDashboard className="text-gray-500" />,
      hasIndicator: false,
    },
    {
      id: 4,
      title: "Dashboard",
      description: "Kitchener workload is getting busy",
      time: "14 mins ago",
      icon: <LayoutDashboard className="text-gray-500" />,
      hasIndicator: false,
    },
    {
      id: 5,
      title: "Dashboard",
      description: "Kitchener workload is getting busy",
      time: "14 mins ago",
      icon: <LayoutDashboard className="text-gray-500" />,
      hasIndicator: false,
    },
    {
      id: 6,
      title: "Dashboard",
      description: "Kitchener workload is getting busy",
      time: "14 mins ago",
      icon: <LayoutDashboard className="text-gray-500" />,
      hasIndicator: false,
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className={styles.bellIconContainer}>
          <Bell className={styles.bellIcon} />
          <div className={styles.notificationIndicator}></div>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className={styles.dropdownContent}>
        {/* Sticky Header */}
        <div className={styles.dropdownHeader}>
          <DropdownMenuLabel className="font-medium">
            Notifications ({notifications.length})
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
        </div>

        {/* Scrollable Notifications */}
        <div className={styles.notificationsContainer}>
          {notifications.map((n) => (
            <DropdownMenuItem key={n.id} className={styles.notificationItem}>
              <div className={styles.notificationIcon}>
                {n.icon}
                {n.hasIndicator && (
                  <div className={styles.notificationIndicator}></div>
                )}
              </div>
              <div className={styles.notificationDetails}>
                <div className={styles.titleContainer}>
                  <div
                    className={`${styles.notificationTitle} ${
                      n.hasIndicator ? "font-bold" : ""
                    }`}
                  >
                    {n.title}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-2 h-4 w-4 hover:bg-gray-200"
                  >
                    <X strokeWidth={1} />
                  </Button>
                </div>
                <div
                  className={`${styles.notificationDescription} ${
                    n.hasIndicator ? "font-bold" : ""
                  }`}
                >
                  {n.description}
                </div>
                <div
                  className={`${styles.notificationTime} ${
                    n.hasIndicator ? "font-bold" : ""
                  }`}
                >
                  {n.time}
                </div>
              </div>
            </DropdownMenuItem>
          ))}
          <DropdownMenuItem disabled>
            <LoaderCircle className="text-gray-500 animate-spin mx-auto" />
          </DropdownMenuItem>
        </div>

        {/* Sticky Footer */}
        <div className={styles.dropdownFooter}>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-sm flex items-center justify-center text-muted-foreground">
            <Button variant="ghost" size="sm" className="p-2 h-4 w-4">
              <CheckCheck className="mr-1" /> Mark all as read
            </Button>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

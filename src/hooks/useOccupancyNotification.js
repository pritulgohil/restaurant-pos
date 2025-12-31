import { useEffect } from "react";

export default function useOccupancyNotification({
  restaurant,
  occupancyPercentage,
  sendNotification,
  fetchNotifications,
}) {
  useEffect(() => {
    if (!restaurant) return;

    const notifyIfNeeded = async () => {
      try {
        const prevKey = `prev_occupancy_${restaurant}`;
        const notified66Key = `notified_66_${restaurant}`;

        const prevOccupancy = Number(localStorage.getItem(prevKey)) || 0;
        const hasNotified66 = localStorage.getItem(notified66Key) === "true";

        if (occupancyPercentage === 100 && prevOccupancy < 100) {
          await sendNotification({
            notificationSender: "Dashboard",
            restaurantId: restaurant,
            notificationDescription:
              "Attention: Restaurant has reached maximum capacity!",
          });

          await fetchNotifications({ restaurantId: restaurant, reset: true });
        }

        if (
          occupancyPercentage > 66 &&
          occupancyPercentage < 100 &&
          !hasNotified66
        ) {
          await sendNotification({
            notificationSender: "Dashboard",
            restaurantId: restaurant,
            notificationDescription:
              "Heads up! Restaurant is approaching its maximum capacity.",
          });

          await fetchNotifications({ restaurantId: restaurant, reset: true });
          localStorage.setItem(notified66Key, "true");
        }

        if (occupancyPercentage <= 66) {
          localStorage.setItem(notified66Key, "false");
        }

        localStorage.setItem(prevKey, occupancyPercentage.toString());
      } catch (error) {
        console.error("Notification failed:", error);
      }
    };

    notifyIfNeeded();
  }, [occupancyPercentage]);
}

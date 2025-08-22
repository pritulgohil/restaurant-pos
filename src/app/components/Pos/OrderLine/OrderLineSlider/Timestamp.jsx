import { useEffect, useState } from "react";

const TimeStamp = ({ createdAt }) => {
  const [timeAgo, setTimeAgo] = useState("");

  const getTimeAgo = () => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffMs = now.getTime() - created.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return "Just now";
    if (diffMins === 1) return "1 min ago";
    if (diffMins < 60) return `${diffMins} mins ago`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours === 1) return "1 hour ago";
    if (diffHours < 24) return `${diffHours} hours ago`;

    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return "1 day ago";
    return `${diffDays} days ago`;
  };

  useEffect(() => {
    setTimeAgo(getTimeAgo());
    const interval = setInterval(() => {
      setTimeAgo(getTimeAgo());
    }, 60000); // update every minute

    return () => clearInterval(interval);
  }, [createdAt]);

  return <span>{timeAgo}</span>;
};

export default TimeStamp;

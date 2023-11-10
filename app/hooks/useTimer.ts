import { useState, useEffect } from "react";
function formatDuration(milliseconds: number) {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const formattedMonths = months > 0 ? `${months}m ` : "";
  const formattedDays = days % 30 > 0 ? `${days % 30}d ` : "";
  const formattedHours = hours % 24 > 0 ? `${hours % 24}h ` : "";
  const formattedMinutes = minutes % 60 > 0 ? `${minutes % 60}m ` : "";
  const formattedSeconds = seconds % 60 > 0 ? `${seconds % 60}s` : "";
  return `${formattedMonths}${formattedDays}${formattedHours}${formattedMinutes}${formattedSeconds}`.trim();
}
export default (props: { time: number; message?: string }) => {
  const [time, setTime] = useState(props.time - Date.now());
  const [message, setMessage] = useState("Loading...");

  //When tab is active after being inactive, reset the timer
  const resetTimerOnTabFocus = () => {
    if (document.visibilityState === "visible") {
      setTime(props.time - Date.now());
    }
  };
  useEffect(() => {
    const intervalId = setTimeout(() => {
      if (time - 1000 <= 0) {
        clearTimeout(intervalId);
        setMessage(props.message || "Timer Finished!");
        setTime(0);
      } else {
        setTime((prev) => prev - 1000);
      }
    }, 1000);
    setMessage(formatDuration(time));
    return () => clearTimeout(intervalId);
  }, [time]);
  useEffect(() => {
    document.addEventListener("visibilitychange", resetTimerOnTabFocus);
    return () => {
      document.removeEventListener("visibilitychange", resetTimerOnTabFocus);
    };
  }, []);
  return message;
};

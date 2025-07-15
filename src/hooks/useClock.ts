// src/hooks/useClock.ts
import { useEffect, useState } from "react";
import moment from "moment";

export const useClock = () => {
  const [currentTime, setCurrentTime] = useState(
    moment().format("hh:mm:ss A") // You can use "HH:mm:ss" for 24h format
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment().format("hh:mm:ss A"));
    }, 1000); // update every second

    return () => clearInterval(interval);
  }, []);

  return { currentTime };
};

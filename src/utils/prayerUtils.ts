import moment from "moment";
import { prayerIcons, PrayerName } from "../components/constant/prayerIcons";

export type NextPrayer = {
  name: PrayerName;
  time: string; // formatted 12-hour time
  icon: any;
  timeRemaining: string; // formatted text like: "In 1 Hour, 20 Minutes"
};

export const getNextPrayer = (timings: any): NextPrayer | null => {
  if (!timings) return null;

  const prayerOrder: PrayerName[] = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
  const now = moment();

  for (let prayer of prayerOrder) {
    const timeStr = timings[prayer]; // "15:26"
    if (!timeStr) continue;

    // Parse prayer time for today
    let prayerTime = moment(timeStr, "HH:mm");

    // If already passed, consider it for next day
    if (prayerTime.isBefore(now)) {
      prayerTime.add(1, "day");
    }

    if (prayerTime.isAfter(now)) {
      const diff = moment.duration(prayerTime.diff(now));
      const hours = diff.hours();
      const minutes = diff.minutes();

      // Format time as "04:49 PM"
      const formattedTime = prayerTime.format("hh:mm A");

      // Format remaining as "In 2 Hours, 47 Minutes"
      const timeRemaining = `In ${
        hours ? `${hours} Hour${hours > 1 ? "s" : ""}, ` : ""
      }${minutes} Minute${minutes > 1 ? "s" : ""}`;

      return {
        name: prayer,
        time: formattedTime,
        icon: prayerIcons[prayer],
        timeRemaining,
      };
    }
  }

  return null;
};

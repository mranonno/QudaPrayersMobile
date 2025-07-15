import moment from "moment";
import { prayerIcons, PrayerName } from "../components/constant/prayerIcons";

export type NextPrayer = {
  name: PrayerName;
  time: string; // formatted 12-hour time
  icon: any;
  timeRemaining: string; // formatted text like: "In 1 Hour, 20 Minutes"
};

/**
 *
 * @param timings - today's prayer timings object
 * @param fetchTomorrowTimings - async function to fetch tomorrow's prayer timings
 * @returns NextPrayer object or null
 */
export const getNextPrayer = async (
  timings: Record<string, string> | null,
  fetchTomorrowTimings: () => Promise<Record<string, string> | null>
): Promise<NextPrayer | null> => {
  if (!timings) return null;

  const prayerOrder: PrayerName[] = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
  const now = moment();

  for (let prayer of prayerOrder) {
    const timeStr = timings[prayer];
    if (!timeStr) continue;

    const prayerTime = moment(timeStr, "HH:mm").set({
      year: now.year(),
      month: now.month(),
      date: now.date(),
    });

    if (prayerTime.isAfter(now)) {
      const diff = moment.duration(prayerTime.diff(now));
      const hours = diff.hours();
      const minutes = diff.minutes();

      return {
        name: prayer,
        time: prayerTime.format("hh:mm A"),
        icon: prayerIcons[prayer],
        timeRemaining: `In ${
          hours ? `${hours} Hour${hours > 1 ? "s" : ""}, ` : ""
        }${minutes} Minute${minutes > 1 ? "s" : ""}`,
      };
    }
  }

  // All today's prayers passed, fetch tomorrow's Fajr
  const nextDayTimings = await fetchTomorrowTimings();

  if (nextDayTimings?.Fajr) {
    const fajrTime = moment(nextDayTimings.Fajr, "HH:mm").add(1, "day");

    const diff = moment.duration(fajrTime.diff(now));
    const hours = diff.hours();
    const minutes = diff.minutes();

    return {
      name: "Fajr",
      time: fajrTime.format("hh:mm A"),
      icon: prayerIcons.Fajr,
      timeRemaining: `In ${
        hours ? `${hours} Hour${hours > 1 ? "s" : ""}, ` : ""
      }${minutes} Minute${minutes > 1 ? "s" : ""}`,
    };
  }

  return null;
};

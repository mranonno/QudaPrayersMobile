export type PrayerName = "Fajr" | "Dhuhr" | "Asr" | "Maghrib" | "Isha";

export const prayerIcons: Record<PrayerName, any> = {
  Fajr: require("../../../assets/icons/fajr.png"),
  Dhuhr: require("../../../assets/icons/dhuhr.png"),
  Asr: require("../../../assets/icons/asr.png"),
  Maghrib: require("../../../assets/icons/maghrib.png"),
  Isha: require("../../../assets/icons/isha.png"),
};

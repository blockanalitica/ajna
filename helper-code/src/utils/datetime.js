import { DateTime } from "luxon";

export const parseUTCDateTimestamp = (timestamp) => {
  if (!timestamp) {
    return null;
  }
  return DateTime.fromSeconds(timestamp, { zone: "utc" });
};

export const parseUTCDateTime = (date) => {
  if (!date) {
    return null;
  }
  return DateTime.fromISO(date, { zone: "utc" });
};

"use client";

import Tooltip from "@/components/tooltip/Tooltip";

function DateTimeAgo({
  dateTime,
  showTime = true,
  showDate = true,
  format,
  inDays = false,
  ...rest
}) {
  if (!dateTime) {
    return null;
  }

  if (!format) {
    format = "LLL dd, yyyy HH:mm:ss";
    if (!showTime) {
      format = "LLL dd, yyyy";
    }
    if (!showDate) {
      format = "HH:mm:ss";
    }
  }
  const options = {
    locale: "en",
  };
  if (inDays) {
    options["unit"] = ["days", "hours", "minutes", "seconds"];
  }

  const value = dateTime.toRelative(options);

  return (
    <span {...rest}>
      <Tooltip message={dateTime.toFormat(format)} className="w-28">
        {value}
      </Tooltip>
    </span>
  );
}

export default DateTimeAgo;

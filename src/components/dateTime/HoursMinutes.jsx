"use client";

function HoursMinutes({ dateTime, ...rest }) {
  if (!dateTime) {
    return null;
  }

  const value = dateTime.diffNow().shiftTo("hours", "minutes").toObject();
  return (
    <span {...rest}>
      {parseInt(value.hours)} hrs {parseInt(value.minutes)} mins
    </span>
  );
}

export default HoursMinutes;

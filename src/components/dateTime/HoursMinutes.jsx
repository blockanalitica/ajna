import Tooltip from "@/components/tooltip/Tooltip";

function HoursMinutes({ dateTime, ...rest }) {
  if (!dateTime) {
    return null;
  }

  const value = dateTime.diffNow().shiftTo("hours", "minutes").toObject();
  return (
    <span {...rest}>
      <Tooltip message={dateTime.toFormat("LLL dd, yyyy HH:mm:ss")}>
        {parseInt(value.hours)} hrs {parseInt(value.minutes)} mins
      </Tooltip>
    </span>
  );
}

export default HoursMinutes;

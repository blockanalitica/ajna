import classnames from "classnames";
import { compact as compactNumber, formatToDecimals } from "@/utils/number";
import Tooltip from "@/components/tooltip/Tooltip";

function Value({
  value,
  prefix,
  suffix,
  decimals,
  compact = true,
  compact100k = false,
  hideIfZero,
  dashIfZero,
  className,
  small = false,
  tooltip = null,
  ...rest
}) {
  if (typeof value !== "number") {
    value = Number(value);
  }

  if (
    value === undefined ||
    value === null ||
    (hideIfZero && value === 0) ||
    (dashIfZero && value === 0)
  ) {
    if (dashIfZero) {
      return "-";
    }
    return "";
  }
  const rawValue = value;

  let numDecimals = decimals !== undefined ? decimals : value < 1.01 ? 5 : 2;

  const showCompactNum = compact100k === true && value >= 100000;
  if (compact === true || showCompactNum) {
    value = compactNumber(value, numDecimals, true);
  } else {
    value = formatToDecimals(value, numDecimals);
  }

  const tooltipMessage = tooltip ? tooltip : rawValue;

  return (
    <span
      className={classnames("inline-flex items-center static", className, {
        "text-sm": small,
        "lh-sm": small,
      })}
      {...rest}
    >
      {prefix ? prefix : null}
      <Tooltip message={tooltipMessage}>{value}</Tooltip>
      {suffix ? suffix : null}
    </span>
  );
}

export default Value;

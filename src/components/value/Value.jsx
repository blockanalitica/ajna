import classnames from "classnames";
import {
  compact as compactNumber,
  formatToDecimals,
  resolveSmallNumbers,
} from "@/utils/number";
import CryptoIcon from "@/components/icon/CryptoIcon";
import Tooltip from "@/components/tooltip/Tooltip";

function Value({
  value,
  prefix,
  suffix,
  decimals = 2,
  compact = true,
  compact100k = false,
  hideIfZero,
  dashIfZero,
  icon = true,
  className,
  id,
  small = false,
  big = false,
  iconSize = "16",
  ...rest
}) {
  value = Number(value)
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

  const showCompactNum = compact100k === true && value >= 100000;
  if (compact === true || showCompactNum) {
    value = compactNumber(value, decimals, true);
  } else {
    value = formatToDecimals(value, decimals);
  }

  const { prefix: prefixPrefix, value: newValue } = resolveSmallNumbers(
    rawValue,
    decimals
  );
  if (newValue !== null) {
    value = newValue;
  }
  const tooltipPrefix = `${prefix !== "$" ? " " : ""} ${prefix ? prefix : ""}`;
  const tooltipSuffix = `${suffix !== "%" ? " " : ""}${suffix ? suffix : ""}`;
  const tooltipMessage = `${tooltipPrefix}${rawValue}${tooltipSuffix}`;

  return (
    <>
      <span
        id={id}
        className={classnames("inline-flex items-center", className, {
          "text-sm": small,
          "lh-sm": small,
        })}
        {...rest}
      >
        {prefixPrefix}
        {prefix ? (
          <>
            {icon && prefix !== "$" ? (
              <>
                <CryptoIcon
                  name={prefix}
                  className="me-1"
                  size={small ? "14" : big ? "24" : iconSize}
                />
              </>
            ) : (
              prefix
            )}
          </>
        ) : null}
        <Tooltip message={tooltipMessage}>{value}</Tooltip>
        {suffix ? (
          <>
            {icon && suffix !== "%" ? (
              <CryptoIcon
                name={suffix}
                className="ms-1"
                size={small ? "14" : big ? "24" : iconSize}
              />
            ) : (
              suffix
            )}
          </>
        ) : null}
      </span>
    </>
  );
}

export default Value;

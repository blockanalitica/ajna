import classnames from "classnames";
import {
  compact as compactNumber,
  formatToDecimals,
  resolveSmallNumbers,
} from "../../utils/number.js";
import CryptoIcon from "../icon/CryptoIcon";

function Value({
  value,
  prefix,
  suffix,
  decimals = 2,
  compact = false,
  compact100k = false,
  hideIfZero,
  dashIfZero,
  icon = true,
  className,
  id,
  small = false,
  big = false,
  iconSize = "15",
  ...rest
}) {
  if (
    value === undefined ||
    value === null ||
    (hideIfZero && value === 0) ||
    (dashIfZero && value === 0)
  ) {
    if (dashIfZero && value === 0) {
      return "-";
    }
    return "";
  }
  let tooltip = null;
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

  return (
    <>
      <span
        id={id}
        className={classnames("flex items-center", className, {
          "text-sm": small,
          "lh-sm": small,
          "text-big": big,
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
                  size={small ? "15" : big ? "24" : iconSize}
                />
              </>
            ) : (
              prefix
            )}
          </>
        ) : null}
        {value}
        {suffix ? (
          <>
            {icon && suffix !== "%" ? (
              <CryptoIcon
                name={suffix}
                className="ms-1"
                size={small ? "15" : big ? "24" : iconSize}
              />
            ) : (
              suffix
            )}
          </>
        ) : null}
      </span>
      {tooltip}
    </>
  );
}

export default Value;

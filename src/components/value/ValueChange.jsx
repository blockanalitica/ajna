import CryptoIcon from "@/components/icon/CryptoIcon";
import Tooltip from "@/components/tooltip/Tooltip";
import { compact as compactNumber, formatToDecimals } from "@/utils/number";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from "classnames";

function ValueChange({
  value,
  prefix,
  suffix,
  decimals,
  className,
  hideIfZero = true,
  dashIfZero = false,
  reverse = false,
  compact = true,
  compact100k = false,
  icon = true,
  small = false,
  big = false,
  iconSize = "14",
  ...rest
}) {
  value = Number(value);
  if (value === undefined || value === null || isNaN(value)) {
    if (hideIfZero && value === 0) {
      return "";
    }
    if (dashIfZero && value === 0) {
      return "-";
    }
  }

  let numDecimals = decimals !== undefined ? decimals : Math.abs(value) < 1.01 ? 5 : 2;

  let spanClass = "";
  let iconPlace = "";
  if (value > 0) {
    if (reverse) {
      spanClass = "text-red-8";
    } else {
      spanClass = "text-green-8";
    }
    iconPlace = (
      <FontAwesomeIcon style={{ fontSize: ".8em" }} icon={faCaretUp} className="me-1" />
    );
  } else if (value < 0) {
    if (reverse) {
      spanClass = "text-green-8";
    } else {
      spanClass = "text-red-8";
    }

    iconPlace = (
      <FontAwesomeIcon
        style={{ fontSize: ".8em" }}
        icon={faCaretDown}
        className="me-1"
      />
    );
  }

  const classNames = classnames(spanClass, className, "flex", "items-center", {
    "text-sm": small,
  });

  value = Math.abs(value);
  const theValue = value;
  const showCompactNum = compact100k === true && value >= 100000;

  const normalValue = formatToDecimals(value, numDecimals);
  if (hideIfZero && normalValue === "0") {
    return "";
  }
  if (dashIfZero && normalValue === "0") {
    return "-";
  }

  if (compact === true || showCompactNum) {
    value = compactNumber(value, numDecimals, true);
  } else {
    value = normalValue;
  }

  const tooltipPrefix = `${prefix !== "$" ? " " : ""} ${prefix ? prefix : ""}`;
  const tooltipSuffix = `${suffix !== "%" ? " " : ""}${suffix ? suffix : ""}`;
  const tooltipMessage = `${tooltipPrefix}${theValue}${tooltipSuffix}`;

  return (
    <>
      <span className={classNames} {...rest}>
        {iconPlace}
        {prefix ? (
          <>
            {prefix !== "$" && icon ? (
              <>
                <CryptoIcon
                  name={prefix}
                  className="me-1"
                  size={small ? "14" : big ? "25" : iconSize}
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
                size={small ? "14" : big ? "25" : iconSize}
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

export default ValueChange;

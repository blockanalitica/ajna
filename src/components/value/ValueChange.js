import CryptoIcon from "@/components/icon/CryptoIcon";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from "classnames";
import {
  compact as compactNumber,
  formatToDecimals,
  resolveSmallNumbers,
} from "../../utils/number.js";

function ValueChange({
  value,
  prefix,
  suffix,
  decimals = 2,
  className,
  hideIfZero = false,
  dashIfZero = false,
  reverse = false,
  compact = false,
  compact100k = false,
  icon = true,
  small = false,
  big = false,
  iconSize = "15",
  ...rest
}) {
  if (value === undefined || value === null || isNaN(value)) {
    if (hideIfZero && value === 0) {
      return "";
    }
    if (dashIfZero && value === 0) {
      return "-";
    }
  }

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

    iconPlace = <FontAwesomeIcon style={{ fontSize: ".8em" }} icon={faCaretDown} />;
  }

  const classNames = classnames(spanClass, className, "flex", "items-center", {
    "text-xs": small,
  });

  value = Math.abs(value);
  const theValue = value;
  const showCompactNum = compact100k === true && value >= 100000;

  const normalValue = formatToDecimals(value, decimals);
  if (hideIfZero && normalValue === "0") {
    return "";
  }
  if (dashIfZero && normalValue === "0") {
    return "-";
  }

  if (compact === true || showCompactNum) {
    value = compactNumber(value, decimals, true);
  } else {
    value = normalValue;
  }

  const { prefix: prefixPrefix, value: newValue } = resolveSmallNumbers(
    theValue,
    decimals
  );
  if (newValue !== null) {
    value = newValue;
  }

  return (
    <>
      <span className={classNames} {...rest}>
        {iconPlace} {prefixPrefix}
        {prefix ? (
          <>
            {prefix !== "$" && icon ? (
              <>
                <CryptoIcon
                  name={prefix}
                  className="me-1"
                  size={small ? "15" : big ? "25" : iconSize}
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
            {icon ? (
              <CryptoIcon
                name={suffix}
                className="ms-1"
                size={small ? "15" : big ? "25" : iconSize}
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

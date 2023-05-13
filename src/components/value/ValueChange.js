import CryptoIcon from "@/components/icon/CryptoIcon";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from "classnames";
import PropTypes from "prop-types";
import {
  compact as compactNumber,
  formatToDecimals,
  resolveSmallNumbers,
} from "../../utils/number.js";

function ValueChange(props) {
  let {
    value,
    prefix,
    suffix,
    decimals,
    className,
    hideIfZero,
    dashIfZero,
    reverse,
    compact,
    compact100k,
    icon,
    small,
    big,
    iconSize,
    ...rest
  } = props;

  if (value === undefined || value === null || isNaN(value)) {
    if (hideIfZero && value === 0) {
      return "";
    }
    if (dashIfZero && value === 0) {
      return "-";
    }
  }

  const rawValue = value;

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
    "text-small": small,
    "lh-sm": small,
    "text-big": big,
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
            {icon ? (
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

ValueChange.propTypes = {
  value: PropTypes.number,
  prefix: PropTypes.string,
  suffix: PropTypes.string,
  decimals: PropTypes.number.isRequired,
  className: PropTypes.string,
  hideIfZero: PropTypes.bool.isRequired,
  dashIfZero: PropTypes.bool.isRequired,
  reverse: PropTypes.bool,
  compact: PropTypes.bool.isRequired,
  compact100k: PropTypes.bool.isRequired,
  icon: PropTypes.bool.isRequired,
  iconSize: PropTypes.string.isRequired,
  small: PropTypes.bool.isRequired,
  big: PropTypes.bool.isRequired,
};

ValueChange.defaultProps = {
  decimals: 2,
  hideIfZero: false,
  dashIfZero: false,
  reverse: false,
  compact: false,
  compact100k: false,
  icon: true,
  iconSize: "15",
  small: false,
  big: false,
};

export default ValueChange;

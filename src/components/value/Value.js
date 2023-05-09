import classnames from "classnames";
import PropTypes from "prop-types";
import {
  compact as compactNumber,
  formatToDecimals,
  resolveSmallNumbers,
} from "../../utils/number.js";
import CryptoIcon from "../icon/CryptoIcon";

function Value(props) {
  let {
    value,
    prefix,
    suffix,
    decimals,
    compact,
    compact100k,
    hideIfZero,
    dashIfZero,
    icon,
    className,
    id,
    small,
    big,
    iconSize,
    ...rest
  } = props;

  if (value === undefined || value === null || (hideIfZero && value === 0) || (dashIfZero && value === 0)) {
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
        className={classnames("flex", className, {
          "text-sm": small,
          "lh-sm": small,
          "text-big": big,
        })}
        {...rest}
      >
        {prefixPrefix}
        {prefix ? (
          <>
            {icon ? (
              <>
                <CryptoIcon
                  name={prefix}
                  className="me-1"
                  size={small ? 15 : big ? 25 : iconSize}
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
                size={small ? 15 : big ? 25 : iconSize}
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

Value.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  prefix: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  suffix: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  decimals: PropTypes.number.isRequired,
  compact: PropTypes.bool.isRequired,
  compact100k: PropTypes.bool.isRequired,
  icon: PropTypes.bool.isRequired,
  iconSize: PropTypes.string.isRequired,
  small: PropTypes.bool.isRequired,
  big: PropTypes.bool.isRequired,
};

Value.defaultProps = {
  decimals: 2,
  compact: false,
  compact100k: false,
  icon: true,
  iconSize: 15,
  small: false,
  big: false,
};
export default Value;

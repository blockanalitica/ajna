import React from "react";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from "classnames";
import { uniqueId } from "lodash";
import PropTypes from "prop-types";
import { UncontrolledTooltip } from "reactstrap";
import CryptoIcon from "../CryptoIcon/CryptoIcon.js";
import {
  compact as compactNumber,
  formatToDecimals,
  resolveSmallNumbers,
} from "../../utils/number.js";
import Value from "../Value/Value.js";

function ValueChange(props) {
  let {
    value,
    prefix,
    suffix,
    decimals,
    className,
    hideIfZero,
    reverse,
    compact,
    compact100k,
    icon,
    tooltipValue,
    small,
    big,
    iconSize,
    ...rest
  } = props;

  if (
    value === undefined ||
    value === null ||
    isNaN(value) ||
    (hideIfZero && value === 0)
  ) {
    return "";
  }

  const rawValue = value;

  const id = uniqueId("valuechange_tooltip_");

  let spanClass = "";
  let iconPlace = "";
  if (value > 0) {
    if (reverse) {
      spanClass = "text-danger";
    } else {
      spanClass = "text-success";
    }
    iconPlace = (
      <FontAwesomeIcon style={{ fontSize: ".8em" }} icon={faCaretUp} className="me-1" />
    );
  } else if (value < 0) {
    if (reverse) {
      spanClass = "text-success";
    } else {
      spanClass = "text-danger";
    }

    iconPlace = (
      <FontAwesomeIcon
        style={{ fontSize: ".8em" }}
        icon={faCaretDown}
        className="me-1"
      />
    );
  }

  const classNames = classnames(
    spanClass,
    className,
    "d-inline-flex",
    "align-items-center",
    {
      "text-small": small,
      "lh-sm": small,
      "text-big": big,
    }
  );

  value = Math.abs(value);
  const theValue = value;
  const showCompactNum = compact100k === true && value >= 100000;
  let tooltipBox = null;

  const normalValue = formatToDecimals(value, decimals);
  if (hideIfZero && normalValue === "0") {
    return "";
  }

  if (compact === true || showCompactNum) {
    value = compactNumber(value, decimals, true);
    tooltipBox = (
      <UncontrolledTooltip placement="bottom" target={id}>
        {prefix}
        {rawValue}
        {suffix}
      </UncontrolledTooltip>
    );
  } else {
    value = normalValue;
  }

  // Override existing tooltipBox (if it's set) if tooltipValue is set
  if (tooltipValue) {
    tooltipBox = (
      <UncontrolledTooltip placement="bottom" target={id}>
        <Value value={tooltipValue} prefix={prefix} suffix={suffix} />
      </UncontrolledTooltip>
    );
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
      <span className={classNames} id={id} {...rest}>
        {iconPlace} {prefixPrefix}
        {prefix ? (
          <>
            {icon ? (
              <>
                <CryptoIcon
                  name={prefix}
                  className="me-1"
                  size={small ? "0.8rem" : big ? "1.5rem" : iconSize}
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
                size={small ? "0.8rem" : big ? "1.5rem" : iconSize}
              />
            ) : (
              suffix
            )}
          </>
        ) : null}
      </span>
      {tooltipBox}
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
  reverse: PropTypes.bool,
  compact: PropTypes.bool.isRequired,
  compact100k: PropTypes.bool.isRequired,
  icon: PropTypes.bool.isRequired,
  iconSize: PropTypes.string.isRequired,
  tooltipValue: PropTypes.number,
  small: PropTypes.bool.isRequired,
  big: PropTypes.bool.isRequired,
};

ValueChange.defaultProps = {
  decimals: 2,
  hideIfZero: false,
  reverse: false,
  compact: false,
  compact100k: false,
  icon: true,
  iconSize: "1rem",
  small: false,
  big: false,
};

export default ValueChange;

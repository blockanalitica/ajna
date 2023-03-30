import PropTypes from "prop-types";
import React, { useState } from "react";
import classnames from "classnames";
import styles from "./TimeSwitch.module.scss";

function TimeSwitch(props) {
  let { label, className, onChange, activeOption, options, basic, ...rest } = props;

  if (!options) {
    options = [
      { key: 1, value: "1 D" },
      { key: 7, value: "7 D" },
      { key: 30, value: "30 D" },
    ];
  }

  const [active, setActive] = useState(activeOption || options[0].key);

  const onOptionClick = (option) => {
    setActive(option);
    if (onChange) {
      onChange(option);
    }
  };

  return (
    <div className={classnames(styles.timeSwitch, className)}>
      {label ? <label className={styles.timeSwitchLabel}>{label}</label> : null}
      <ul className={styles.timeSwitchContainer} {...rest}>
        {options.map((option) => (
          <li
            key={option.key}
            className={classnames(styles.timeSwitchItem, {
              [styles.timeSwitchItemActive]: option.key === (activeOption || active),
            })}
            onClick={() => onOptionClick(option.key)}
          >
            {option.value}
          </li>
        ))}
      </ul>
    </div>
  );
}

TimeSwitch.propTypes = {
  label: PropTypes.any,
  onChange: PropTypes.func,
  activeOption: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  options: PropTypes.array,
};

export default TimeSwitch;

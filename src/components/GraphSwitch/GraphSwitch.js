import PropTypes from "prop-types";
import React, { useState } from "react";
import classnames from "classnames";
import styles from "./GraphSwitch.module.scss";

function GraphSwitch(props) {
  let { label, className, onChange, activeOption, options, ...rest } = props;

  if (!options) {
    options = [
      { key: "USD", value: "USD" },
      { key: "token", value: "token" },
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
    <div className={classnames(styles.graphSwitch, className)}>
      {label ? <label className={styles.graphSwitchLabel}>{label}</label> : null}
      <ul className={styles.graphSwitchContent} {...rest}>
        {options.map((option) => (
          <li
            key={option.key}
            className={classnames(styles.graphSwitchItem, {
              [styles.graphSwitchItemActive]: option.key === active,
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

GraphSwitch.propTypes = {
  label: PropTypes.any,
  onChange: PropTypes.func,
  activeOption: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  options: PropTypes.array,
};

export default GraphSwitch;

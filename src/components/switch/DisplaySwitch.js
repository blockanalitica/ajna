"use client";

import { useState } from "react";
import classnames from "classnames";

const DisplaySwitch = ({
  className,
  onChange,
  activeOption,
  options,
  small = false,
}) => {
  if (!options) {
    options = [
      { key: 1, value: "24H" },
      { key: 7, value: "7D" },
      { key: 30, value: "30D" },
      { key: 365, value: "1Y" },
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
    <div className="flex items-center">
      <ul
        className={classnames("flex rounded-lg", {
          "bg-gray-dark/30 border-gray-20 border": small === false,
          "bg-gray-18": small === true,
        })}
      >
        {options.map((option) => (
          <li
            key={option.key}
            className={classnames("cursor-pointer text-center rounded-lg", className, {
              "bg-primary-8": option.key === active,
              "px-5 py-2": small === false,
              "text-xs px-3 py-1": small === true,
            })}
            onClick={() => onOptionClick(option.key)}
          >
            {option.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisplaySwitch;

"use client";

import { useState } from "react";
import classnames from "classnames";

const DisplaySwitch = ({ className, onChange, activeOption, options }) => {
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
      <ul className="flex rounded-lg bg-gray-dark/30 border-gray-20 border">
        {options.map((option) => (
          <li
            key={option.key}
            className={classnames(
              "cursor-pointer px-5 py-2 text-center rounded-lg",
              className,
              {
                "bg-primary-8": option.key === active,
              }
            )}
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

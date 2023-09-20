"use client";

import classnames from "classnames";

const InlineSelect = ({ options, ...rest }) => {
  return (
    <select
      className={classnames(
        "inline-block bg-transparent focus:border-0 focus:ring-0 outline-0 text-center",
        "cursor-pointer hover:text-ajna-lavender"
      )}
      {...rest}
    >
      {options.map((option) => (
        <option key={option.key} value={option.key}>
          {option.value}
        </option>
      ))}
    </select>
  );
};

export default InlineSelect;

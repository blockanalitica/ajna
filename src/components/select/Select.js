"use client";

import classnames from "classnames";

const Select = ({ options, className, ...rest }) => {
  return (
    <div className={classnames("relative inline-flex", className)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 412 232"
        className="w-2.5 h-2.5 absolute top-2.5 right-4 pointer-events-none text-purple-6"
      >
        <path
          d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
          fill="currentColor"
          fillRule="nonzero"
        />
      </svg>
      <select
        className={classnames(
          "inline-block bg-transparent border border-purple-6 rounded-2xl cursor-pointer",
          "text-left pl-4 pr-8 py-1 outline-0",
          "appearance-none focus:outline-none"
        )}
        {...rest}
      >
        {options.map((option) => (
          <option key={option.key} value={option.key}>
            {option.value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;

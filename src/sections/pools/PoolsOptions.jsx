import { joinClassNames } from "@/utils/helperFunc";
import { useState } from "react";

const PoolsOptions = () => {
  const displayOptions = [
    { key: "all", value: "All" },
    { key: "new", value: "New" },
    { key: "trending", value: "Trending" },
  ];

  const [curentlyDisplayed, setCurrentDisplay] = useState(displayOptions[0].key);

  return (
    <div>
      {/* <SwitchDisplays displayOptions={displayOptions} active={curentlyDisplayed} setActive={setCurrentDisplay} 
            className="px-6 py-2"
            /> */}
      <div className="flex items-center">
        <ul className="flex bg-gray-24 rounded-xl border border-gray-20">
          {displayOptions.map((option) => (
            <li
              key={option.key}
              className={joinClassNames(
                option.key === curentlyDisplayed
                  ? "cursor-pointer bg-purple-7 rounded-xl text-center"
                  : "cursor-pointer text-center",
                "cursor-pointer",
                "px-6 py-2"
              )}
              onClick={() => setCurrentDisplay(option.key)}
            >
              {option.value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PoolsOptions;

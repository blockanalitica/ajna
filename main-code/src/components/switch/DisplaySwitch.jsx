import React, { useState } from "react";

function SwitchDisplays({ displayOptions, active, setActive }) {
    /*
    const [active, setActive] = useState(displayOptions[0].key);

    const onOptionClick = (option) => {
        setActive(option);
        if (onChange) {
        onChange(option);
        }
    };
    */  

  return (
    <div className="flex items-center">
      <ul className="flex  bg-gray-18 rounded-xl " >
        {displayOptions.map((option) => (
          <li
            key={option.key}
            className= {option.key === active ? 
                "cursor-pointer bg-primary-8 rounded-xl px-3 py-1 text-center" : 
                "cursor-pointer px-3 py-1 mr-2 text-center"}
            onClick={() => setActive(option.key)}
          >
            {option.value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SwitchDisplays;

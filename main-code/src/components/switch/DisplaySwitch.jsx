import { joinClassNames } from "@/utils/helperFunc";

function SwitchDisplays({ displayOptions, active, setActive, className="px-3 py-1" }) {
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
      <ul className="flex bg-gray-24 rounded-xl border border-gray-20" >
        {displayOptions.map((option) => (
          <li
            key={option.key}
            className= {joinClassNames(option.key === active ? 
                "cursor-pointer bg-primary-8 rounded-xl text-center" : 
                "cursor-pointer text-center", "cursor-pointer", className)}
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

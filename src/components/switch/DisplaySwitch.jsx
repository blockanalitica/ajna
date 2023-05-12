import classnames from "classnames";

function SwitchDisplays({
  displayOptions,
  active,
  setActive,
  className = "px-3 py-1",
}) {
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
      <ul className="flex bg-gray-24 rounded-xl border border-gray-20">
        {displayOptions.map((option) => (
          <li
            key={option.key}
            className={classnames(className, "cursor-pointer", {
              "cursor-pointer bg-primary-8 rounded-xl text-center":
                option.key === active,
              "cursor-pointer text-center": option.key !== active,
            })}
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

import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SearchInput = ({ className, ...rest }) => {
  return (
    <div className={classnames("relative", className)}>
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        className="absolute left-5 top-3.5 text-gray-7"
      />
      <input
        type="text"
        placeholder="Search"
        className={classnames(
          "bg-gray-24 ps-12 pe-5 rounded-full border border-gray-20 text-gray-3",
          "focus:border-purple-to outline-none w-full p-2"
        )}
        {...rest}
      />
    </div>
  );
};

export default SearchInput;

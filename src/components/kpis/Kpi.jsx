import classnames from "classnames";

const Kpi = ({ title, value, smallValue, className, ...rest }) => {
  return (
    <div className={classnames("bg-gray-22 rounded-lg py-4 px-5", className)} {...rest}>
      <h3 className="text-xs text-gray-7 font-syncopate uppercase font-semibold mb-2">
        {title}
      </h3>
      <span className="text-xl flex flex-row items-center mb-1">
        {value}
      </span>
      {smallValue ? (
        <span className="text-sm flex items-center text-gray-10">
          {smallValue}
        </span>
      ) : null}
    </div>
  );
};

export default Kpi;

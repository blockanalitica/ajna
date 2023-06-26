import classnames from "classnames";
import _ from "lodash";

const StatsPlaceholder = ({ numStats, className, ...rest }) => {
  let colClassName = null;
  if (numStats == 5) {
    colClassName = "md:grid-cols-4 lg:grid-cols-5";
  } else if (numStats == 4) {
    colClassName = "md:grid-cols-4 lg:grid-cols-4";
  } else if (numStats == 3) {
    colClassName = "md:grid-cols-3 lg:grid-cols-3";
  }

  return (
    <section
      className={classnames(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 animate-pulse",
        colClassName,
        className
      )}
      {...rest}
    >
      {_.range(numStats).map((value) => (
        <div
          key={value}
          className={classnames(
            "bg-gray-dark/30 border-gray-20 border rounded-3xl",
            "px-6 py-4 h-[122px]"
          )}
        >
          <div className="h-5 bg-gray-21 opacity-70 rounded-lg"></div>
        </div>
      ))}
    </section>
  );
};

export default StatsPlaceholder;

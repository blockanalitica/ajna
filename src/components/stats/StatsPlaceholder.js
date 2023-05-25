import classnames from "classnames";
import _ from "lodash";

// TODO: automatic calculation of columns based on number of sections passed in data
const StatsPlaceholder = ({ numStats, className, size = "md", ...rest }) => {
  return (
    <section
      className={classnames(
        "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 animate-pulse",
        className
      )}
      {...rest}
    >
      {_.range(numStats).map((value) => (
        <div
          key={value}
          className={classnames("bg-gray-dark/30 border-gray-20 border rounded-3xl", {
            "h-28": size === "lg",
            "h-24": size === "md",
          })}
        ></div>
      ))}
    </section>
  );
};

export default StatsPlaceholder;

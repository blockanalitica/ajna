import classnames from "classnames";
import StatsPlaceholder from "@/components/stats/StatsPlaceholder";

function GenericPlaceholder({
  className,

  ...rest
}) {
  return (
    <div className={classnames("animate-pulse", className)} {...rest}>
      <div className="h-10 w-1/3 bg-gray-21 opacity-70 rounded-3xl mb-10"></div>
      <div className="h-8 w-40 bg-gray-21 opacity-70 rounded-3xl mb-5"></div>
      <StatsPlaceholder numStats={4} animate={false} />
    </div>
  );
}

export default GenericPlaceholder;

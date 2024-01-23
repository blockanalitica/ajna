import classnames from "classnames";
import Kpi from "./Kpi";

const Stats = ({ data, className, ...rest }) => {
  const cols = data.length;

  let colClassName = null;
  if (cols === 5) {
    colClassName = "md:grid-cols-4 lg:grid-cols-5";
  } else if (cols === 4) {
    colClassName = "md:grid-cols-4 lg:grid-cols-4";
  } else if (cols === 3) {
    colClassName = "md:grid-cols-3 lg:grid-cols-3";
  }

  return (
    <section
      className={classnames(
        "grid grid-cols-1 gap-4 sm:grid-cols-2",
        colClassName,
        className,
      )}
      {...rest}
    >
      {data.map(({ title, value, smallValue }) => (
        <Kpi key={title} title={title} value={value} smallValue={smallValue} />
      ))}
    </section>
  );
};

export default Stats;

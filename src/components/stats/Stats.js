import classnames from "classnames";
import Value from "../value/Value";
import ValueChange from "../value/ValueChange";

const Stats = ({ data, className, ...rest }) => {
  return (
    <section
      className={classnames(
        "grid grid-cols-1 sm:grid-cols-1 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 gap-7",
        className
      )}
      {...rest}
    >
      {data.map(({ title, value, smallValue }) => (
        <div
          key={title}
          className="px-6 py-4 flex flex-col items-center justify-center bg-gray-dark/30 border-gray-20 border rounded-2xl"
        >
          <span className="text-gray-5 pb-2 text-sm font-syncopate uppercase text-center">
            {title}
          </span>
          <span className="mb-2 text-2xl font-bold">{value}</span>
          {smallValue ? <span className="text-sm font-bold">{smallValue}</span> : null}
        </div>
      ))}
    </section>
  );
};

export default Stats;

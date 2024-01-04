import classnames from "classnames";

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
        <div
          key={title}
          className="px-6 py-4 flex flex-col items-center justify-center bg-gray-dark/30 border-gray-20 border rounded-3xl"
        >
          <span className="text-gray-5 pb-2 text-sm font-syncopate uppercase text-center">
            {title}
          </span>
          <span className="mb-2 text-2xl font-bold flex flex-row items-center">
            {value}
          </span>
          {smallValue ? (
            <span className="text-sm flex text-gray-10">{smallValue}</span>
          ) : null}
        </div>
      ))}
    </section>
  );
};

export default Stats;

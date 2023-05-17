import classnames from "classnames";

const CardOpaque = ({ className, title, children, ...rest }) => {
  return (
    <div className={classnames("bg-gray-22 rounded-lg py-4 px-5", className)} {...rest}>
      {title ? (
        <h3 className="text-xs text-gray-7 font-syncopate uppercase font-semibold mb-3">
          {title}
        </h3>
      ) : null}
      {children}
    </div>
  );
};

export default CardOpaque;

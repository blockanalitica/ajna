import classnames from "classnames";

const CardBackground = ({ children, className, ...rest }) => {
  return (
    <div
      className={classnames(
        "bg-gray-dark/30 border-gray-20 border rounded-3xl shadow-md p-5",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

export default CardBackground;

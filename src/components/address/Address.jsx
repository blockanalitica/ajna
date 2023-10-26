import classnames from "classnames";

const Address = ({ address, className }) => {
  const firstPart = address.slice(0, 6);
  const secondPart = address.slice(-4);

  return (
    <span className={classnames("normal-case", className)}>
      <span className="font-mono font-bold">{firstPart}</span>
      <span className="font-rubik">...</span>
      <span className="font-mono font-bold">{secondPart}</span>
    </span>
  );
};

export default Address;

import classnames from "classnames";
import { shorten } from "@/utils/address";

const Address = ({ address, className }) => {
  return (
    <span className={classnames("font-mono font-bold normal-case", className)}>
      {shorten(address)}
    </span>
  );
};

export default Address;

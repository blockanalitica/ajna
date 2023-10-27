import classnames from "classnames";
import CryptoIcon from "@/components/icon/CryptoIcon";

function PoolName({ collateralSymbol, quoteSymbol, className, size = "md" }) {
  let iconSize = "24";
  let rightIconClasses = "";
  let textClasses = "";
  switch (size) {
    case "md":
      iconSize = "22";
      rightIconClasses = "left-[-11px]";
      break;
    case "xl":
      iconSize = "32";
      rightIconClasses = "left-[-16px]";
      textClasses = "text-2xl";
      break;
    default:
    // pass
  }

  return (
    <div className={classnames("flex items-center", className)}>
      <span className="flex">
        <CryptoIcon name={collateralSymbol} size={iconSize} className="z-10" />
        <CryptoIcon
          name={quoteSymbol}
          size={iconSize}
          className={classnames("relative z-0", rightIconClasses)}
        />
      </span>
      <span className={textClasses}>
        {collateralSymbol} / {quoteSymbol}
      </span>
    </div>
  );
}

export default PoolName;

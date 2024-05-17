import CryptoIcon from "@/components/icon/CryptoIcon";
import Value from "./Value";
import ValueChange from "./ValueChange";

const CurrencyValue = ({
  value,
  currencySymbol,
  currencyAddress,
  small = false,
  big = false,
  iconSize = "16",
  trend = false,
  ...rest
}) => {
  const suffix = (
    <CryptoIcon
      alt={currencySymbol}
      address={currencyAddress}
      className="ms-1"
      size={small ? "14" : big ? "25" : iconSize}
    />
  );
  if (trend) {
    return (
      <ValueChange
        {...rest}
        value={value}
        suffix={suffix}
        icon={false}
        small={small}
        big={big}
        iconSize={iconSize ? iconSize : "14"}
      />
    );
  }

  return (
    <Value
      {...rest}
      value={value}
      suffix={suffix}
      icon={false}
      small={small}
      big={big}
    />
  );
};

export default CurrencyValue;

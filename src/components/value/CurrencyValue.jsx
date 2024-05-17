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
  network = null,
  ...rest
}) => {
  const suffix = (
    <CryptoIcon
      alt={currencySymbol}
      address={currencyAddress}
      className="ms-1"
      size={small ? "14" : big ? "25" : iconSize}
      network={network}
    />
  );
  if (trend) {
    return <ValueChange {...rest} value={value} suffix={suffix} small={small} />;
  }

  return <Value {...rest} value={value} suffix={suffix} small={small} />;
};

export default CurrencyValue;

import CryptoIcon from "@/components/icon/CryptoIcon";
import classnames from "classnames";

const TokenIcons = ({ tokenAddresses, className }) => {
  const num = 4;
  let tokensToShow = tokenAddresses?.slice(0, num);

  return (
    <div className="flex flex-col items-center">
      <div className={classnames("flex items-center gap-1", className)}>
        {tokensToShow.map((token) => (
          <CryptoIcon key={token} address={token} />
        ))}
      </div>

      {tokenAddresses.length > num ? (
        <span className="text-xs text-gray-6 pt-1">
          +{tokenAddresses.length - 3} more
        </span>
      ) : null}
    </div>
  );
};

export default TokenIcons;

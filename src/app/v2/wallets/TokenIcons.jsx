import CryptoIcon from "@/components/icon/CryptoIcon";
import classnames from "classnames";

const TokenIcons = ({ tokens, className }) => {
  const num = 4;
  let tokensToShow = tokens?.slice(0, num);

  return (
    <div className="flex flex-col items-center">
      <div className={classnames("flex items-center gap-1", className)}>
        {tokensToShow.map((token) => (
          <CryptoIcon name={token} />
        ))}
      </div>

      {tokens.length > num ? (
        <span className="text-xs text-gray-6 pt-1"> +{tokens.length - 3} more</span>
      ) : null}
    </div>
  );
};

export default TokenIcons;

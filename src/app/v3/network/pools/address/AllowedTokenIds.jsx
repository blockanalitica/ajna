import { useState } from "react";
import classnames from "classnames";
import CryptoIcon from "@/components/icon/CryptoIcon";
import Tag from "@/components/tags/Tag";

const AllowedTokenIds = ({ tokenIds, collateralTokenSymbol, className }) => {
  const [showAll, setShowAll] = useState(false);

  let tokens = tokenIds;
  if (showAll === false) {
    tokens = tokens.slice(0, 3);
  }

  return (
    <Tag className={classnames("flex items-center gap-2 w-fit", className)}>
      <CryptoIcon name={collateralTokenSymbol} />
      <div>Allowed IDs</div>

      <div className="flex flex-wrap gap-1">
        {tokens.map((tokenId) => (
          <div
            key={tokenId}
            className="rounded-xl bg-gray-2 text-black text-sm px-2 truncate max-w-[5rem]"
          >
            #{tokenId}
          </div>
        ))}
      </div>
      {tokenIds.length > 3 ? (
        <button
          className="text-purple-6 hover:underline"
          onClick={() => setShowAll(!showAll)}
        >
          {tokenIds.length > tokens.length ? `+${tokenIds.length - 3} more` : "hide"}
        </button>
      ) : null}
    </Tag>
  );
};

export default AllowedTokenIds;

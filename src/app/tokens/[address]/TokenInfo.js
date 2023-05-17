"use client";

import Value from "@/components/value/Value";
import ValueChange from "@/components/value/ValueChange";
import { useFetch } from "@/hooks.js";
import Stats from "@/components/stats/Stats";

const TokenInfo = ({ address }) => {
  const { data, error, isLoading } = useFetch(`/tokens/${address}/overview/`);
  if (error) {
    return <p>Failed to load Data</p>;
  }
  if (isLoading) {
    return <p>Loading....</p>;
  }

  const { results } = data;

  const stats = [
    {
      title: "Lended",
      value: (
        <Value
          value={results.lended_amount}
          decimals={2}
          compact
          suffix={results.symbol}
          big
        />
      ),
      smallValue: (
        <Value
          value={results.lended_amount * results.underlying_price}
          decimals={2}
          compact
          prefix="$"
        />
      ),
    },
    {
      title: "Borowed",
      value: (
        <Value
          value={results.borrowed_amount}
          decimals={2}
          compact
          suffix={results.symbol}
          big
        />
      ),
      smallValue: (
        <Value
          value={results.borrowed_amount * results.underlying_price}
          decimals={2}
          compact
          prefix="$"
        />
      ),
    },
    {
      title: "Collateral",
      value: (
        <Value
          value={results.collateral_amount}
          decimals={2}
          compact
          suffix={results.symbol}
          big
        />
      ),
      smallValue: (
        <Value
          value={results.collateral_amount * results.underlying_price}
          decimals={2}
          compact
          prefix="$"
        />
      ),
    },
    {
      title: "TVL",
      value: <Value value={results.tvl} decimals={2} compact prefix="$" />,
    },
    {
      title: "# of pools",
      value: <Value value={results.pool_count} decimals={2} compact />,
    },
  ];

  return <Stats data={stats} className="mt-5" />;
};

export default TokenInfo;

"use client";

import Stats from "@/components/stats/Stats";
import StatsPlaceholder from "@/components/stats/StatsPlaceholder";
import Value from "@/components/value/Value";
import ValueChange from "@/components/value/ValueChange";
import { useFetch } from "@/hooks";

const TokenInfo = ({ address, daysAgo, className, ...rest }) => {
  const { data, error, isLoading } = useFetch(`/tokens/${address}/overview/`, {
    days_ago: daysAgo,
  });
  if (error) {
    return <p>Failed to load data</p>;
  }

  if (isLoading) {
    return <StatsPlaceholder className={className} numStats={5} size="lg" />;
  }

  const { results } = data;

  const stats = [
    {
      title: "Lended",
      value: (
        <>
          <Value value={results.lended_amount} suffix={results.symbol} big />
          <ValueChange
            value={
              results.prev_lended_amount
                ? results.lended_amount - results.prev_lended_amount
                : 0
            }
            suffix={results.symbol}
            className="text-lg"
          />
        </>
      ),
      smallValue: (
        <>
          <Value value={results.lended_amount_usd} prefix="$" />
          <ValueChange
            value={
              results.prev_lended_amount_usd
                ? results.lended_amount_usd - results.prev_lended_amount_usd
                : 0
            }
            prefix="$"
            className="ms-2"
          />
        </>
      ),
    },
    {
      title: "Borowed",
      value: (
        <>
          <Value value={results.borrowed_amount} suffix={results.symbol} big />
          <ValueChange
            value={
              results.prev_borrowed_amount
                ? results.borrowed_amount - results.prev_borrowed_amount
                : 0
            }
            suffix={results.symbol}
            className="text-lg"
          />
        </>
      ),
      smallValue: (
        <>
          <Value value={results.borrowed_amount_usd} prefix="$" />
          <ValueChange
            value={
              results.prev_borrowed_amount_usd
                ? results.borrowed_amount_usd - results.prev_borrowed_amount_usd
                : 0
            }
            prefix="$"
            className="ms-2"
          />
        </>
      ),
    },
    {
      title: "Collateral",
      value: (
        <>
          <Value value={results.collateral_amount} suffix={results.symbol} big />
          <ValueChange
            value={
              results.prev_collateral_amount
                ? results.collateral_amount - results.prev_collateral_amount
                : 0
            }
            suffix={results.symbol}
            className="text-lg"
          />
        </>
      ),
      smallValue: (
        <>
          <Value value={results.collateral_amount_usd} prefix="$" />
          <ValueChange
            value={
              results.prev_collateral_amount_usd
                ? results.collateral_amount_usd - results.prev_collateral_amount_usd
                : 0
            }
            prefix="$"
            className="ms-2"
          />
        </>
      ),
    },
    {
      title: "TVL",
      value: (
        <>
          <Value value={results.tvl} prefix="$" />
          <ValueChange
            value={results.prev_tvl ? results.tvl - results.prev_tvl : 0}
            prefix="$"
            className="text-lg"
          />
        </>
      ),
    },
    {
      title: "# of pools",
      value: (
        <>
          <Value value={results.pool_count} />
          <ValueChange
            value={
              results.prev_pool_count ? results.pool_count - results.prev_pool_count : 0
            }
            className="text-lg"
          />
        </>
      ),
    },
  ];

  return <Stats data={stats} className={className} {...rest} />;
};

export default TokenInfo;

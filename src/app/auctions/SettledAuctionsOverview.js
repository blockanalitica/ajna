"use client";

import classnames from "classnames";
import { useFetch } from "@/hooks";
import Value from "@/components/value/Value";
import ValueChange from "@/components/value/ValueChange";
import CardOpaque from "@/components/card/CardOpaque";
import CardBackground from "@/components/card/CardBackground";
import SettledAuctionsGraph from "./SettledAuctionsGraph";

const SettledAuctionsOverview = ({ daysAgo, className }) => {
  const { data, error, isLoading } = useFetch("/auctions/settled/overview/", {
    days_ago: daysAgo,
  });

  if (error) {
    return <p>Failed to load data</p>;
  }
  if (isLoading) {
    return (
      <div
        className={classnames(
          "flex flex-col md:flex-row md:gap-4 animate-pulse",
          className
        )}
      >
        <CardBackground className="md:w-1/3 grid grid-cols-1 place-content-between mb-10 h-60">
          <div className="h-5 bg-gray-21 opacity-70 rounded-lg"></div>
        </CardBackground>
        <CardBackground className="md:w-2/3 col-span-2 mb-10 grid grid-cols-1 place-content-between h-60" />
      </div>
    );
  }

  const { debt_usd: debtUsd, collateral_usd: collateralUsd, count, change = {} } = data;

  return (
    <div className={classnames("flex flex-col md:flex-row md:gap-4", className)}>
      <CardBackground className="md:w-1/3 grid grid-cols-1 place-content-between mb-10">
        <div>
          <h3 className="text-sm font-bold text-gray-1 font-syncopate uppercase mb-5">
            Settled Auctions
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          <CardOpaque title="Auctions">
            <Value value={count} className="text-xl" />
            <ValueChange value={change.count} />
          </CardOpaque>
          <div className="md:hidden lg:block"></div>
          <CardOpaque title="Collateral">
            <Value value={collateralUsd || 0} className="text-xl" prefix="$" />
            <ValueChange value={change.collateral_usd} prefix="$" />
          </CardOpaque>
          <CardOpaque title="Debt">
            <Value value={debtUsd || 0} prefix="$" className="text-xl" />
            <ValueChange value={change.debt_usd} prefix="$" />
          </CardOpaque>
        </div>
      </CardBackground>

      <CardBackground className="md:w-2/3 col-span-2 mb-10 grid grid-cols-1 place-content-between">
        <SettledAuctionsGraph
          daysAgo={daysAgo}
          totalCollateralUsd={collateralUsd}
          totalDebtUsd={debtUsd}
        />
      </CardBackground>
    </div>
  );
};

export default SettledAuctionsOverview;

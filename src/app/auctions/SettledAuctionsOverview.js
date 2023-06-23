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
    return <p>Loading....</p>;
  }

  const { debt_usd: debtUsd, collateral_usd: collateralUsd, count, change = {} } = data;

  return (
    <div className={classnames("grid grid-cols-3 gap-4", className)}>
      <CardBackground className="grid grid-cols-1 place-content-between">
        <div>
          <h3 className="text-sm font-bold text-gray-1 font-syncopate uppercase mb-5">
            Settled Auctions
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <CardOpaque title="Auctions">
            <Value value={count} className="text-xl" />
            <ValueChange value={change.count} />
          </CardOpaque>
          <div></div>
          <CardOpaque title="Collateral">
            <Value value={collateralUsd} className="text-xl" prefix="$" />
            <ValueChange value={change.collateral_usd} prefix="$" />
          </CardOpaque>
          <CardOpaque title="Debt">
            <Value value={debtUsd} prefix="$" className="text-xl" />
            <ValueChange value={change.debt_usd} prefix="$" />
          </CardOpaque>
        </div>
      </CardBackground>

      <div className="col-span-2">
        <SettledAuctionsGraph
          daysAgo={daysAgo}
          totalCollateralUsd={collateralUsd}
          totalDebtUsd={debtUsd}
        />
      </div>
    </div>
  );
};

export default SettledAuctionsOverview;

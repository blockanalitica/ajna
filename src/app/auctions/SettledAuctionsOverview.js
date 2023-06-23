"use client";

import { useFetch } from "@/hooks";
import Value from "@/components/value/Value";
import ValueChange from "@/components/value/ValueChange";
import CardOpaque from "@/components/card/CardOpaque";

const SettledAuctionsOverview = ({ daysAgo }) => {
  const { data = {}, error } = useFetch("/auctions/settled/overview/", {
    days_ago: daysAgo,
  });

  if (error) {
    return <p>Failed to load data</p>;
  }

  const { debt_usd: debtUsd, collateral_usd: collateralUsd, count, change = {} } = data;

  return (
    <>
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
    </>
  );
};

export default SettledAuctionsOverview;

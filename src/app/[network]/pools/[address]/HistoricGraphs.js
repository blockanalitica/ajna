"use client";

import DisplaySwitch from "@/components/switch/DisplaySwitch";
import { useFetch } from "@/hooks";
import { useState } from "react";
import APRHistoricGraph from "./APRHistoricGraph";
import MauTuHistoricGraph from "./MauTuHistoricGraph";
import OtherHistoricGraphs from "./OtherHistoricGraphs";
import GenericEmptyPlaceholder from "@/components/GenericEmptyPlaceholder";
import { faChartBar } from "@fortawesome/free-solid-svg-icons";

const HistoricGraphs = ({ address, daysAgo, collateralSymbol, quoteSymbol }) => {
  const [displayOption, setDisplayOption] = useState("tvl");

  const actualDaysAgo = daysAgo > 7 ? daysAgo : 30;
  const { data, error, isLoading } = useFetch(
    `/pools/${address}/historic/${displayOption}/`,
    {
      days_ago: actualDaysAgo,
    }
  );
  if (error) {
    return <p>Failed to load data</p>;
  }
  if (isLoading) {
    return (
      <div className="flex items-center flex-col animate-pulse">
        <div className="w-20 h-20 mt-20 mb-4 bg-gray-22 rounded-full p-4 flex items-center justify-center"></div>
      </div>
    );
  }

  if (!data || (data && data.length === 0)) {
    return (
      <GenericEmptyPlaceholder
        title="No data"
        content="There is no data"
        icon={faChartBar}
      />
    );
  }

  const displayOptions = [
    { key: "tvl", value: "TVL" },
    { key: "pool_size", value: "Deposited" },
    { key: "debt", value: "Borrowed" },
    { key: "pledged_collateral", value: "Collateral" },
    { key: "volume", value: "Volume" },
    { key: "apr", value: "APR" },
    { key: "mau_tu", value: "MAU/TU" },
  ];

  const headerRight = (
    <DisplaySwitch
      options={displayOptions}
      onChange={setDisplayOption}
      activeOption={displayOption}
      small
    />
  );

  if (displayOption === "apr") {
    return (
      <APRHistoricGraph data={data} headerRight={headerRight} daysAgo={actualDaysAgo} />
    );
  } else if (displayOption === "mau_tu") {
    return (
      <MauTuHistoricGraph
        data={data}
        headerRight={headerRight}
        daysAgo={actualDaysAgo}
      />
    );
  } else {
    return (
      <OtherHistoricGraphs
        data={data}
        headerRight={headerRight}
        displayOption={displayOption}
        collateralSymbol={collateralSymbol}
        quoteSymbol={quoteSymbol}
        daysAgo={actualDaysAgo}
      />
    );
  }
};

export default HistoricGraphs;

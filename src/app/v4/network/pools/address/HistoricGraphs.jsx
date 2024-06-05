import DisplaySwitch from "@/components/switch/DisplaySwitch";
import { useFetch } from "@/hooks";
import { useState } from "react";
import OtherHistoricGraphs from "./OtherHistoricGraphs";
import GenericEmptyPlaceholder from "@/components/GenericEmptyPlaceholder";
import { faChartBar } from "@fortawesome/free-solid-svg-icons";
import BurnGraphs from "@/components/BurnGraphs";

const HistoricGraphs = ({
  address,
  daysAgo,
  collateralSymbol,
  collateralAddress,
  quoteSymbol,
  quoteAddress,
}) => {
  const [displayOption, setDisplayOption] = useState("tvl");

  const actualDaysAgo = daysAgo > 7 ? daysAgo : 30;
  const { data, error, isLoading } = useFetch(
    `/pools/${address}/historic/${displayOption}/`,
    {
      days_ago: actualDaysAgo,
    },
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
    // { key: "collateral", value: "Collateral" },
    { key: "volume", value: "Volume" },
    { key: "burn", value: "Burn" },
  ];

  const headerRight = (
    <DisplaySwitch
      options={displayOptions}
      onChange={setDisplayOption}
      activeOption={displayOption}
      small
    />
  );

  return (
    <>
      {displayOption === "burn" ? (
        <BurnGraphs data={data} headerRight={headerRight} />
      ) : (
        <OtherHistoricGraphs
          data={data}
          headerRight={headerRight}
          displayOption={displayOption}
          collateralSymbol={collateralSymbol}
          collateralAddress={collateralAddress}
          quoteSymbol={quoteSymbol}
          quoteAddress={quoteAddress}
          daysAgo={actualDaysAgo}
        />
      )}
    </>
  );
};

export default HistoricGraphs;

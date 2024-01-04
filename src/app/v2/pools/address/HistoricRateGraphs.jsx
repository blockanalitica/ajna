import DisplaySwitch from "@/components/switch/DisplaySwitch";
import { useFetch } from "@/hooks";
import { useState } from "react";
import APRHistoricGraph from "./APRHistoricGraph";
import MauTuHistoricGraph from "./MauTuHistoricGraph";
import GenericEmptyPlaceholder from "@/components/GenericEmptyPlaceholder";
import { faChartBar } from "@fortawesome/free-solid-svg-icons";

const HistoricRateGraphs = ({ address, daysAgo, collateralSymbol, quoteSymbol }) => {
  const [displayOption, setDisplayOption] = useState("apr");

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
  }
};

export default HistoricRateGraphs;

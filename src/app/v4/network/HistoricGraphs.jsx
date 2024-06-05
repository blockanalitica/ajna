import { useState } from "react";
import { useFetch } from "@/hooks";
import DisplaySwitch from "@/components/switch/DisplaySwitch";
import BurnGraphs from "@/components/BurnGraphs";
import HistoryVolumeGraph from "./HistoryVolumeGraph";

const HistoricGraphs = ({ daysAgo }) => {
  const [displayOption, setDisplayOption] = useState("volume");
  const actualDaysAgo = daysAgo > 7 ? daysAgo : 30;
  const {
    data = [],
    error,
    isLoading,
  } = useFetch("/stats/history/", { type: displayOption, days_ago: actualDaysAgo });

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

  const displayOptions = [
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
      {displayOption === "volume" ? (
        <HistoryVolumeGraph data={data} headerRight={headerRight} />
      ) : (
        <BurnGraphs data={data} headerRight={headerRight} />
      )}
    </>
  );
};

export default HistoricGraphs;

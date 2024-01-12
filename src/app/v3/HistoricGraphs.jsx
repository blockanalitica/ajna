import DisplaySwitch from "@/components/switch/DisplaySwitch";
import { useFetch } from "@/hooks";
import { useState } from "react";
import CardBackground from "@/components/card/CardBackground";
import Graph from "@/components/graph/Graph";
import { prefillSerieDates } from "@/utils/graph";
import { compact } from "@/utils/number";
import { tooltipLabelNumber, tooltipTitleDateTime } from "@/utils/graph";
import _ from "lodash";
import { NETWORKS_NAME_MAP } from "@/networks";

const HistoricGraphs = ({ daysAgo }) => {
  const [displayOption, setDisplayOption] = useState("tvl");
  const actualDaysAgo = daysAgo > 7 ? daysAgo : 30;
  const { data, error, isLoading } = useFetch(
    "/overall/historic/",
    {
      days_ago: actualDaysAgo,
    },
    null,
    true,
  );

  if (error) {
    return <p>Failed to load data</p>;
  }
  let content = null;
  if (isLoading) {
    content = (
      <div className="flex items-center flex-col animate-pulse">
        <div className="w-20 h-20 mt-20 mb-4 bg-gray-22 rounded-full p-4 flex items-center justify-center"></div>
      </div>
    );
  } else {
    const displayOptions = [
      { key: "tvl", value: "TVL" },
      { key: "supply_usd", value: "Deposited" },
      { key: "debt_usd", value: "Borrowed" },
      { key: "collateral_usd", value: "Collateral" },
    ];

    const grouped = _.groupBy(data, "network");

    const series = [];
    Object.entries(grouped).forEach(([key, rows]) => {
      const serie = rows.map((row) => ({
        x: row["date"],
        y: row[displayOption],
      }));
      series.push({
        label: NETWORKS_NAME_MAP[key],
        data: prefillSerieDates(serie),
      });
    });

    const options = {
      interaction: {
        axis: "x",
      },
      scales: {
        x: {
          type: "time",
          time: {
            unit: "day",
          },
        },
        y: {
          ticks: {
            callback: (value) => "$" + compact(value, 2, true),
          },
        },
      },
      plugins: {
        legend: {
          display: true,
        },
        tooltip: {
          callbacks: {
            title: (tooltipItems) => {
              return tooltipTitleDateTime(tooltipItems, false, false, "LLL dd, y");
            },
            label: (tooltipItem) => {
              return tooltipLabelNumber(tooltipItem, "$");
            },
          },
        },
      },
    };

    content = (
      <>
        <div className="mb-4 flex justify-center items-start">
          <DisplaySwitch
            options={displayOptions}
            onChange={setDisplayOption}
            activeOption={displayOption}
            small
          />
        </div>
        <Graph
          type="line"
          key={`graph-${displayOption}`}
          series={series}
          options={options}
        />
      </>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <CardBackground className="md:w-2/3 ">{content}</CardBackground>
    </div>
  );
};

export default HistoricGraphs;

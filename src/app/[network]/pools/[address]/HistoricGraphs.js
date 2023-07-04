"use client";

import FancyGraph from "@/components/graph/FancyGraph";
import DisplaySwitch from "@/components/switch/DisplaySwitch";
import Value from "@/components/value/Value";
import { useFetch } from "@/hooks";
import { compact } from "@/utils/number";
import { DateTime } from "luxon";
import { useState } from "react";

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
  const displayOptions = [
    { key: "tvl", value: "TVL" },
    { key: "pool_size", value: "Lended" },
    { key: "debt", value: "Borrowed" },
    { key: "pledged_collateral", value: "Collateral" },
    { key: "volume", value: "Volume" },
  ];

  const series = [
    {
      label: "earn",
      data: data.map((row) => ({ x: row.date, y: row.amount })),
    },
  ];

  const options = {
    interaction: {
      axis: "x",
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: actualDaysAgo > 7 ? "day" : "hour",
        },
      },
      y: {
        ticks: {
          callback: (value) => compact(value, 2, true),
        },
      },
    },
  };

  const valueFormatter = (data) => {
    const value = data.y;
    let prefix = "";
    let suffix = "";
    if (displayOption === "volume") {
      prefix = "$";
    } else {
      suffix = displayOption === "pledged_collateral" ? collateralSymbol : quoteSymbol;
    }

    return <Value value={value} suffix={suffix} prefix={prefix} big compact />;
  };

  const subvalueFormatter = (data) => {
    const value = data.x;
    let date;
    if (typeof value == "number") {
      date = DateTime.fromMillis(value);
    } else {
      date = DateTime.fromISO(value);
    }
    const format = actualDaysAgo > 7 ? "LLL dd, y" : "LLL dd, y HH:MM";
    const suffix = actualDaysAgo > 7 ? "" : " UTC";
    return `${date.toFormat(format)}${suffix}`;
  };

  const headerRight = (
    <DisplaySwitch
      options={displayOptions}
      onChange={setDisplayOption}
      activeOption={displayOption}
      small
    />
  );

  return (
    <FancyGraph
      type={displayOption === "volume" ? "bar" : "line"}
      key={`graph-${displayOption}`}
      series={series}
      options={options}
      valueFormatter={valueFormatter}
      subvalueFormatter={subvalueFormatter}
      headerRight={headerRight}
    />
  );
};

export default HistoricGraphs;

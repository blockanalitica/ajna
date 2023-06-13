"use client";

import { useState } from "react";
import { DateTime } from "luxon";
import { useFetch } from "@/hooks";
import CardBackground from "@/components/card/CardBackground";
import Value from "@/components/value/Value";
import FancyGraph from "@/components/graph/FancyGraph";
import DisplaySwitch from "@/components/switch/DisplaySwitch";

const HistoricGraphs = ({
  address,
  daysAgo,
  collateralSymbol,
  quoteSymbol,
  ...rest
}) => {
  const [displayOption, setDisplayOption] = useState("pool_size");
  const actualDaysAgo = daysAgo > 7 ? daysAgo : 30;
  const { data, error, isLoading } = useFetch(`/pools/${address}/historic/`, {
    days_ago: actualDaysAgo,
  });
  if (error) {
    return <p>Failed to load data</p>;
  }
  if (isLoading) {
    return <p>Loading....</p>;
  }
  const displayOptions = [
    { key: "pool_size", value: "Lended" },
    { key: "debt", value: "Borrowed" },
    { key: "pledged_collateral", value: "Collateral" },
  ];

  const series = [
    {
      label: "earn",
      data: data.map((row) => ({ x: row.date, y: row[displayOption] })),
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
    },
  };

  const valueFormatter = (value) => {
    return (
      <Value
        value={value}
        suffix={displayOption === "pledged_collateral" ? collateralSymbol : quoteSymbol}
        big
      />
    );
  };

  const subvalueFormatter = (value) => {
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
    <CardBackground {...rest}>
      <FancyGraph
        key={`graph-${displayOption}`}
        series={series}
        options={options}
        valueFormatter={valueFormatter}
        subvalueFormatter={subvalueFormatter}
        headerRight={headerRight}
      />
    </CardBackground>
  );
};

export default HistoricGraphs;

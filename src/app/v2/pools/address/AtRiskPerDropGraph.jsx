import DisplaySwitch from "@/components/switch/DisplaySwitch";
import { useState } from "react";
import FancyGraph from "@/components/graph/FancyGraph";
import Value from "@/components/value/Value";
import { compact } from "@/utils/number";
import { sortArray } from "@/utils/array";

const AtRiskPerDropGraph = ({ data, collateralSymbol }) => {
  const [displayOption, setDisplayOption] = useState("desc");
  const seriesData = [];

  const sortedData = sortArray(data, displayOption === "desc" ? "-change" : "change");
  sortedData.forEach((row) => {
    if (
      (displayOption === "desc" && row.change <= 0) ||
      (displayOption === "asc" && row.change >= 0)
    ) {
      seriesData.push({ x: row.change, y: row.amount });
    }
  });

  const series = [
    {
      label: "At Risk",
      data: seriesData,
    },
  ];

  const options = {
    interaction: {
      axis: "x",
    },
    scales: {
      x: {
        type: "linear",
        title: {
          display: true,
          text: "price change",
        },
        reverse: displayOption === "desc",
        beginAtZero: true,
        ticks: {
          callback: (value) => `${value}%`,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => compact(value, 2, true),
        },
        title: {
          display: true,
          text: `collateral amount at risk`,
        },
      },
    },
  };

  const valueFormatter = (data) => {
    const value = data.y;
    let prefix = "";
    let suffix = collateralSymbol;
    return <Value value={value} suffix={suffix} prefix={prefix} big compact />;
  };

  const subvalueFormatter = (data) => {
    return `${data.x}%`;
  };

  const displayOptions = [
    { key: "desc", value: "Price decrease" },
    { key: "asc", value: "Price increase" },
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
    <FancyGraph
      type="bar"
      key={`cumulative-at-risk-${displayOption}`}
      series={series}
      options={options}
      valueFormatter={valueFormatter}
      subvalueFormatter={subvalueFormatter}
      headerRight={headerRight}
    />
  );
};

export default AtRiskPerDropGraph;

import DisplaySwitch from "@/components/switch/DisplaySwitch";
import { useState } from "react";
import FancyGraph from "@/components/graph/FancyGraph";
import CurrencyValue from "@/components/value/CurrencyValue";
import { faChartBar } from "@fortawesome/free-solid-svg-icons";
import GenericEmptyPlaceholder from "@/components/GenericEmptyPlaceholder";
import { compact } from "@/utils/number";
import { sortArray } from "@/utils/array";

const AtRiskPerDropGraph = ({ data, collateralSymbol, collateralAddress }) => {
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
    return (
      <CurrencyValue
        value={value}
        currencySymbol={collateralSymbol}
        currencyAddress={collateralAddress}
        big
        compact
      />
    );
  };

  const subvalueFormatter = (data) => {
    return `${data.x}%`;
  };

  const displayOptions = [
    { key: "desc", value: "Price decrease" },
    { key: "asc", value: "Price increase" },
  ];

  let content;
  if (seriesData.length === 0) {
    content = (
      <GenericEmptyPlaceholder
        title="No Data"
        content="There is no data"
        icon={faChartBar}
      />
    );
  } else {
    content = (
      <FancyGraph
        type="bar"
        key={`at-risk-${displayOption}`}
        series={series}
        options={options}
        valueFormatter={valueFormatter}
        subvalueFormatter={subvalueFormatter}
      />
    );
  }

  return (
    <>
      <div className="flex flex-col-reverse justify-between xl:flex-row">
        <h2 className="font-syncopate uppercase mb-3">Per drop</h2>
        <div className="mb-4 flex justify-center items-start">
          <DisplaySwitch
            options={displayOptions}
            onChange={setDisplayOption}
            activeOption={displayOption}
            small
          />
        </div>
      </div>
      {content}
    </>
  );
};

export default AtRiskPerDropGraph;

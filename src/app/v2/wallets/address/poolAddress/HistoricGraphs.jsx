import { useParams } from "react-router-dom";
import DisplaySwitch from "@/components/switch/DisplaySwitch";
import { useFetch } from "@/hooks";
import { useState } from "react";
import GenericEmptyPlaceholder from "@/components/GenericEmptyPlaceholder";
import { faChartBar } from "@fortawesome/free-solid-svg-icons";
import FancyGraph from "@/components/graph/FancyGraph";
import Value from "@/components/value/Value";
import { prefillSerieDates } from "@/utils/graph";
import { compact } from "@/utils/number";
import { DateTime } from "luxon";

const HistoricGraphs = () => {
  const { address, poolAddress } = useParams();
  const [displayOption, setDisplayOption] = useState("supply");

  const daysAgo = 1; //TODO

  const actualDaysAgo = daysAgo > 7 ? daysAgo : 30;
  const { data, error, isLoading } = useFetch(
    `/wallets/${address}/pools/${poolAddress}/historic/`,
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

  const {results} = data;

  if (!results || (results && results.length === 0)) {
    return (
      <GenericEmptyPlaceholder
        title="No data"
        content="There is no data"
        icon={faChartBar}
      />
    );
  }

  const displayOptions = [
    { key: "supply", value: "Supply" },
    { key: "collateral", value: "Collateral" },
    { key: "debt", value: "Debt" },

  ];

  const headerRight = (
    <DisplaySwitch
      options={displayOptions}
      onChange={setDisplayOption}
      activeOption={displayOption}
      small
    />
  );

  const serie = results.map((row) => ({ x: row.datetime, y: row[displayOptions] }));
  const series = [
    {
      label: displayOptions,
      data: prefillSerieDates(serie),
    },
  ];

  console.log(serie)

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
          callback: (value) => compact(value, 2, true),
        },
      },
    },
  };

  const valueFormatter = (data) => {
    const value = data.y;
    let prefix = "";
    let suffix = "";
    // if (displayOption === "volume" || displayOption === "tvl") {
    //   prefix = "$";
    // } else {
    //   suffix = displayOption === "pledged_collateral" ? collateralSymbol : quoteSymbol;
    // }

    return <Value value={value} suffix={suffix} prefix={prefix} big compact />;
  };

  const subvalueFormatter = (data) => {
    let value;
    if (Array.isArray(data) && displayOption === "apr") {
      value = data[0].x;
    } else {
      value = data.x;
    }
    let date;
    if (typeof value == "number") {
      date = DateTime.fromMillis(value);
    } else {
      date = DateTime.fromISO(value);
    }
    const format = daysAgo > 7 ? "LLL dd, y" : "LLL dd, y HH:mm";
    const suffix = daysAgo > 7 ? "" : " UTC";
    return `${date.toFormat(format)}${suffix}`;
  };

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

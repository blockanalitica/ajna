import { useParams, useLocation } from "react-router-dom";
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

const HistoricGraphs = ({ daysAgo, quoteTokenSymbol, collateralTokenSymbol }) => {
  const { address, index } = useParams();
  const [displayOption, setDisplayOption] = useState("deposit");

  const actualDaysAgo = daysAgo > 7 ? daysAgo : 30;
  const { data, error, isLoading } = useFetch(
    `/pools/${address}/buckets/${index}/historic/`,
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

  const serie = data.map((row) => ({ x: row.block_datetime, y: row[displayOption] }));
  const series = [
    {
      label: displayOption,
      data: prefillSerieDates(serie),
      stepped: true,
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
    const suffix =
      displayOption === "deposit" ? quoteTokenSymbol : collateralTokenSymbol;
    return <Value value={value} suffix={suffix} big compact />;
  };

  const subvalueFormatter = (data) => {
    let value;
    if (Array.isArray(data)) {
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

  const displayOptions = [
    { key: "deposit", value: "Deposit" },
    { key: "collateral", value: "Collateral" },
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
      type="line"
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

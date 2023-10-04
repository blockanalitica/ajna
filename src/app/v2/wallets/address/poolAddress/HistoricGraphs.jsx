import DisplaySwitch from "@/components/switch/DisplaySwitch";
import { useFetch } from "@/hooks";
import { useState } from "react";
import GenericEmptyPlaceholder from "@/components/GenericEmptyPlaceholder";
import { faChartBar } from "@fortawesome/free-solid-svg-icons";
import FancyGraph from "@/components/graph/FancyGraph";
import Value from "@/components/value/Value";
import { compact } from "@/utils/number";
import { DateTime } from "luxon";
import { parseUTCDateTime } from "@/utils/datetime";

const HistoricGraphs = ({
  address,
  poolAddress,
  collateralTokenSymbol,
  quoteTokenSymbol,
}) => {
  const [displayOption, setDisplayOption] = useState("supply");

  const { data, error, isLoading } = useFetch(
    `/wallets/${address}/pools/${poolAddress}/historic/`
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

  if (data?.length === 0) {
    return (
      <GenericEmptyPlaceholder
        title="No data"
        content="There is no data"
        icon={faChartBar}
      />
    );
  }

  const displayOptions = [
    { key: "supply", value: "Deposit" },
    { key: "debt", value: "Debt" },
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

  const maxDate = DateTime.now().toISO();
  const minDateTime = DateTime.now().minus({ days: 30 });
  const minDate = minDateTime.toISO();

  let serie = data.map((row) => ({ x: row.date, y: row[displayOption] }));
  // Extend series with first value and last value
  if (serie.length > 0) {
    const first = parseUTCDateTime(serie.at(0).x);

    let startEl = [];
    if (minDateTime.startOf("day") < first.startOf("day")) {
      startEl.push({
        x: minDate,
        y: 0,
      });
    }

    serie = [
      ...startEl,
      ...serie,
      {
        ...serie.at(-1),
        x: maxDate,
      },
    ];
  }

  const series = [
    {
      label: displayOption,
      data: serie,
      stepped: "before",
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
        max: maxDate,
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
      displayOption === "collateral" ? collateralTokenSymbol : quoteTokenSymbol;
    return <Value value={value} suffix={suffix} big compact />;
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
    const format = "LLL dd, y";
    const suffix = " UTC";
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

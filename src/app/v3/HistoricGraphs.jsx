import DisplaySwitch from "@/components/switch/DisplaySwitch";
import { useFetch } from "@/hooks";
import { useState } from "react";
import CardBackground from "@/components/card/CardBackground";
import { prefillSerieDates } from "@/utils/graph";
import { compact } from "@/utils/number";
import FancyGraph from "@/components/graph/FancyGraph";
import Value from "@/components/value/Value";
import { DateTime } from "luxon";

const HistoricGraphs = ({ daysAgo, totals }) => {
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

    const serie = data.map((row) => ({ x: row.date, y: row[displayOption] }));
    serie.push({ x: DateTime.now().toISODate(), y: totals[displayOption] });

    const series = [
      {
        label: "earn",
        data: prefillSerieDates(serie),
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
      return <Value value={data.y} prefix="$" big compact />;
    };

    const subvalueFormatter = (data) => {
      const value = data.x;

      let date;
      if (typeof value == "number") {
        date = DateTime.fromMillis(value);
      } else {
        date = DateTime.fromISO(value);
      }
      const format = "LLL dd, y";
      return `${date.toFormat(format)}`;
    };
    const headerRight = (
      <DisplaySwitch
        options={displayOptions}
        onChange={setDisplayOption}
        activeOption={displayOption}
        small
      />
    );

    content = (
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
  }

  return (
    <div className="md:flex items-center justify-center">
      <CardBackground className="md:w-2/3 justify-self-center">
        {content}
      </CardBackground>
    </div>
  );
};

export default HistoricGraphs;

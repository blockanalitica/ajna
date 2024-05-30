import DisplaySwitch from "@/components/switch/DisplaySwitch";
import { useFetch } from "@/hooks";
import { useState, useCallback, useMemo } from "react";
import GenericEmptyPlaceholder from "@/components/GenericEmptyPlaceholder";
import { faChartBar } from "@fortawesome/free-solid-svg-icons";
import FancyGraph from "@/components/graph/FancyGraph";
import { prefillSerieDates } from "@/utils/graph";
import { compact } from "@/utils/number";
import { DateTime } from "luxon";

const HistoricGraphs = ({ daysAgo }) => {
  const [displayOption, setDisplayOption] = useState("active");
  const actualDaysAgo = daysAgo > 7 ? daysAgo : 30;

  const options = useMemo(
    () => ({
      interaction: {
        axis: "x",
      },
      scales: {
        x: {
          type: "time",
          time: {
            unit: actualDaysAgo > 30 ? "month" : "day",
          },
        },
        y: {
          ticks: {
            callback: (value) => compact(value, 2, true),
          },
        },
      },
    }),
    [actualDaysAgo],
  );

  const subvalueFormatter = useCallback(
    (data) => {
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
    },
    [daysAgo],
  );

  const { data, error, isLoading } = useFetch(`/activity/historic/`, {
    days_ago: actualDaysAgo,
  });
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

  const displayOptions = [
    { key: "active", value: "Active Wallets" },
    { key: "total", value: "Cumulative" },
    { key: "new", value: "New Wallets" },
  ];

  const serie = data.map((row) => ({ x: row.date, y: row[displayOption] }));

  const series = [
    {
      label: displayOption,
      data: actualDaysAgo > 30 ? serie : prefillSerieDates(serie),
    },
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
      type={displayOption === "total" ? "line" : "bar"}
      key={`graph-${displayOption}`}
      series={series}
      options={options}
      subvalueFormatter={subvalueFormatter}
      headerRight={headerRight}
    />
  );
};

export default HistoricGraphs;

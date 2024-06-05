import FancyGraph from "@/components/graph/FancyGraph";
import { useState, useCallback, useMemo } from "react";
import { compact } from "@/utils/number";
import CurrencyValue from "@/components/value/CurrencyValue";
import { AJNA_TOKEN_ADDRESS } from "@/utils/constants";
import DisplaySwitch from "@/components/switch/DisplaySwitch";
import Value from "@/components/value/Value";
import { DateTime } from "luxon";
import GenericEmptyPlaceholder from "@/components/GenericEmptyPlaceholder";
import { faChartBar } from "@fortawesome/free-solid-svg-icons";

const BurnGraphs = ({ data, headerRight }) => {
  const [displayOption, setDisplayOption] = useState("token");

  const series = useMemo(
    () => [
      {
        label: "earn",
        data: data.map((row) => ({
          x: row.date,
          y:
            displayOption === "token"
              ? row.cumulative_ajna_burned
              : row.cumulative_ajna_burned_usd,
        })),
        stepped: true,
      },
    ],
    [displayOption, data],
  );

  const displayOptions = [
    { key: "token", value: "Ajna" },
    { key: "usd", value: "USD" },
  ];

  const options = useMemo(
    () => ({
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
    }),
    [],
  );

  const valueFormatter = useCallback(
    (data) => {
      const value = data.y;
      if (displayOption === "token") {
        return (
          <CurrencyValue
            value={value}
            currencySymbol="AJNA"
            currencyAddress={AJNA_TOKEN_ADDRESS}
            network="ethereum"
            big
            compact
          />
        );
      } else {
        return <Value value={value} prefix="$" />;
      }
    },
    [displayOption],
  );

  const subvalueFormatter = useCallback((data) => {
    const value = data.x;
    if (value === undefined) {
      return "";
    }

    let date;
    if (typeof value == "number") {
      date = DateTime.fromMillis(value);
    } else {
      date = DateTime.fromISO(value);
    }
    return `${date.toFormat("LLL dd, y HH:mm")} UTC`;
  }, []);

  if (!data || (data && data.length === 0)) {
    return (
      <GenericEmptyPlaceholder
        title="No data"
        content="There is no data"
        icon={faChartBar}
      />
    );
  }

  return (
    <div className="min-h-[20rem]">
      <FancyGraph
        key={`burn-${displayOption}`}
        series={series}
        options={options}
        valueFormatter={valueFormatter}
        subvalueFormatter={subvalueFormatter}
        headerRight={
          <div className="flex flex-col items-end gap-4">
            {headerRight}
            <DisplaySwitch
              options={displayOptions}
              onChange={setDisplayOption}
              activeOption={displayOption}
              small
            />
          </div>
        }
      />
      <div className="text-xs text-gray-13 text-end pt-5">
        * USD price is calculated at the time of burn.
        <br />
        ** this graph is unaffected by the date range selector and is showing data from
        the first burn until now
      </div>
    </div>
  );
};

export default BurnGraphs;

import { useState } from "react";
import { faGavel } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFetch } from "@/hooks";
import { DateTime } from "luxon";
import _ from "lodash";
import Value from "@/components/value/Value";
import FancyGraph from "@/components/graph/FancyGraph";
import { tooltipLabelNumber, tooltipTitleDateTime } from "@/utils/graph";
import DisplaySwitch from "@/components/switch/DisplaySwitch";
import { compact } from "@/utils/number";

const SettledAuctionsGraph = ({ daysAgo, totalCollateralUsd, totalDebtUsd }) => {
  const [displayOption, setDisplayOption] = useState("collateral");

  const { data, error, isLoading } = useFetch(
    `/auctions/settled/graphs/${displayOption}/`,
    { days_ago: daysAgo }
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

  if (data && data.length === 0) {
    let daysText = null;
    if (daysAgo === 1) {
      daysText = `24 hours`;
    } else {
      daysText = `${daysAgo} days`;
    }

    return (
      <>
        <div className="flex items-center flex-col">
          <div className="w-20 h-20 mt-20 mb-4 bg-gray-22 rounded-full p-4 flex items-center justify-center">
            <FontAwesomeIcon icon={faGavel} size="xl" className="opacity-60" />
          </div>
          <div className="text-red-3 text-sm mb-2">No Auctions</div>
          <div className="text-gray-13 text-sm mb-20">
            No auctions in the last {daysText}.
          </div>
        </div>
        <div className="text-gray-6 text-center"></div>
      </>
    );
  }

  const grouped = _.groupBy(data, "symbol");

  const series = [];
  Object.entries(grouped).forEach(([key, rows]) => {
    series.push({
      label: key,
      symbol: key,
      data: rows.map((row) => ({
        x: row["date"],
        y: row["amount_usd"],
        amount: row["amount"],
      })),
    });
  });

  const displayOptions = [
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

  let xUnit = "day";
  let timeFormat = "LLL dd, y";
  if (daysAgo > 30) {
    xUnit = "month";
    timeFormat = "LLL y";
  }

  const options = {
    interaction: {
      axis: "x",
    },
    scales: {
      x: {
        stacked: true,
        type: "time",
        time: {
          unit: xUnit,
        },
        // Add 1 day to daysAgo as backend will return whole day from daysAgo day
        min: DateTime.now()
          .minus({ days: daysAgo + 1 })
          .toJSDate(),
        max: DateTime.now().toJSDate(),
      },
      y: {
        stacked: true,
        ticks: {
          callback: (value) => "$" + compact(value, 2, true),
        },
      },
    },
    plugins: {
      tooltip: {
        enabled: true,
        callbacks: {
          title: (tooltipItems) => {
            return tooltipTitleDateTime(tooltipItems, false, false, timeFormat);
          },
          label: (tooltipItem) => {
            return tooltipLabelNumber(tooltipItem, "$");
          },
        },
      },
      legend: {
        display: true,
      },
    },
  };

  const defaultTooltipData = {
    x: `Total ${displayOption}`,
    y: displayOption === "collateral" ? totalCollateralUsd : totalDebtUsd,
  };

  const valueFormatter = (data) => {
    let value = null;
    if (Array.isArray(data)) {
      value = data.reduce((total, row) => total + row.y, 0);
    } else {
      value = data.y;
    }
    return <Value value={value} prefix="$" />;
  };

  const subvalueFormatter = (data) => {
    let dateVal = null;
    if (Array.isArray(data)) {
      dateVal = data[0].x;
    } else if (_.isString(data.x)) {
      return data.x;
    } else {
      dateVal = data.x;
    }
    const date = DateTime.fromISO(dateVal);
    return `${date.toFormat(timeFormat)} UTC`;
  };

  return (
    <FancyGraph
      key={`graph-${displayOption}`}
      series={series}
      options={options}
      type="bar"
      valueFormatter={valueFormatter}
      subvalueFormatter={subvalueFormatter}
      headerRight={headerRight}
      defaultTooltipData={defaultTooltipData}
    />
  );
};

export default SettledAuctionsGraph;

import FancyGraph from "@/components/graph/FancyGraph";
import Value from "@/components/value/Value";
import { prefillSerieDates } from "@/utils/graph";
import { compact } from "@/utils/number";
import { DateTime } from "luxon";

const OtherHistoricGraphs = ({
  data,
  headerRight,
  displayOption,
  collateralSymbol,
  quoteSymbol,
  daysAgo,
}) => {
  const serie = data.map((row) => ({ x: row.date, y: row.amount }));
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
    const value = data.y;
    let prefix = "";
    let suffix = "";
    if (displayOption === "volume" || displayOption === "tvl") {
      prefix = "$";
    } else {
      suffix = ["pledged_collateral", "collateral"].includes(displayOption)
        ? collateralSymbol
        : quoteSymbol;
    }

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

export default OtherHistoricGraphs;

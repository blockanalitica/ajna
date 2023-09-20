import FancyGraph from "@/components/graph/FancyGraph";
import Value from "@/components/value/Value";
import { compact } from "@/utils/number";
import { DateTime } from "luxon";
import { prefillSerieDates, prefillSerieHours } from "@/utils/graph";

const APRHistoricGraph = ({ data, headerRight, daysAgo }) => {
  const lendApr = [];
  const borrowApr = [];
  data.forEach((row) => {
    lendApr.push({ x: row.date, y: row.lend_rate, label: "Lend APR" });
    borrowApr.push({ x: row.date, y: row.borrow_rate, label: "Borrow APR" });
  });

  let lendSeries;
  let borrowSeries;
  if (daysAgo === 30) {
    lendSeries = prefillSerieHours(lendApr, 30 * 24, { label: "Lend APR" });
    borrowSeries = prefillSerieHours(borrowApr, 30 * 24, { label: "Borrow APR" });
  } else {
    lendSeries = prefillSerieDates(lendApr, 30, { label: "Lend APR" });
    borrowSeries = prefillSerieDates(borrowApr, 30, { label: "Borrow APR" });
  }

  const series = [
    {
      label: "Lend APR",
      data: lendSeries,
      backgroundColor: "#8AC7DB",
      borderColor: "#8AC7DB",
    },
    {
      label: "Borrow APR",
      data: borrowSeries,
      backgroundColor: "#B5179E",
      borderColor: "#B5179E",
    },
  ];
  const defaultTooltipData = [lendApr.at(-1), borrowApr.at(-1)];

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
          callback: (value) => compact(value * 100, 2, true) + "%",
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
    animation: false,
  };

  const valueFormatter = (data) => {
    if (Array.isArray(data)) {
      return (
        <div className="text-xl">
          {data.map((row) => (
            <div className="flex items-baseline" key={row.label}>
              <span className="text-base text-gray-5">{row.label}:</span>
              <Value value={row.y * 100} suffix="%" className="ms-2" />
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div className="text-xl">
          <div className="flex items-baseline">
            <span className="text-base text-gray-5">{data.label}:</span>
            <Value value={data.y * 100} suffix="%" className="ms-2" />
          </div>
          <div className="h-7"></div>
        </div>
      );
    }
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
    const format = daysAgo > 30 ? "LLL dd, y" : "LLL dd, y HH:mm";
    const suffix = daysAgo > 30 ? "" : " UTC";
    return `${date.toFormat(format)}${suffix}`;
  };

  return (
    <FancyGraph
      type="line"
      key="graph-apr"
      series={series}
      options={options}
      valueFormatter={valueFormatter}
      subvalueFormatter={subvalueFormatter}
      headerRight={headerRight}
      defaultTooltipData={defaultTooltipData}
    />
  );
};

export default APRHistoricGraph;

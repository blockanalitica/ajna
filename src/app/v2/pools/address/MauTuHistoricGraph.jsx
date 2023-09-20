import FancyGraph from "@/components/graph/FancyGraph";
import Value from "@/components/value/Value";
import { prefillSerieDates, prefillSerieHours } from "@/utils/graph";
import { compact } from "@/utils/number";
import { DateTime } from "luxon";

const MauTuHistoricGraph = ({ data, headerRight, daysAgo }) => {
  const mau = [];
  const tu = [];
  const mauUpperBound = [];
  const mauLowerBound = [];
  data.forEach((row) => {
    mau.push({ x: row.date, y: row.actual_utilization, label: "MAU" });
    tu.push({ x: row.date, y: row.target_utilization, label: "TU" });
    mauUpperBound.push({
      x: row.date,
      y: row.actual_utilization_upper_bound,
      label: "MAU Upper Bound",
    });
    mauLowerBound.push({
      x: row.date,
      y: row.actual_utilization_lower_bound,
      label: "MAU Lower Bound",
    });
  });

  let mauSeries;
  let tuSeries;
  let mauUpperBoundSeries;
  let mauLowerBoundSeries;
  if (daysAgo === 30) {
    mauSeries = prefillSerieHours(mau, 30 * 24, { label: "MAU" });
    tuSeries = prefillSerieHours(tu, 30 * 24, { label: "TU" });
    mauUpperBoundSeries = prefillSerieHours(mauUpperBound, 30 * 24, {
      label: "MAU Upper Bound",
    });
    mauLowerBoundSeries = prefillSerieHours(mauLowerBound, 30 * 24, {
      label: "MAU Lower Bound",
    });
  } else {
    mauSeries = prefillSerieDates(mau, 30, { label: "MAU" });
    tuSeries = prefillSerieDates(tu, 30, { label: "TU" });
    mauUpperBoundSeries = prefillSerieDates(mau, 30, { label: "MAU Upper Bound" });
    mauLowerBoundSeries = prefillSerieDates(tu, 30, { label: "MAU Lower Bound" });
  }

  const series = [
    {
      label: "Meaningful Actual Utilization (MAU)",
      data: mauSeries,
      backgroundColor: "#8AC7DB",
      borderColor: "#8AC7DB",
    },
    {
      label: "Target Utilization (TU)",
      data: tuSeries,
      backgroundColor: "#B5179E",
      borderColor: "#B5179E",
    },
    {
      label: "MAU Upper Bound",
      data: mauUpperBoundSeries,
      backgroundColor: "#FF3344",
      borderColor: "#FF3344",
      borderDash: [5, 5],
    },
    {
      label: "MAU Lower Bound",
      data: mauLowerBoundSeries,
      backgroundColor: "#2A9340",
      borderColor: "#2A9340",
      borderDash: [5, 5],
    },
  ];
  const defaultTooltipData = [
    mauSeries.at(-1),
    tuSeries.at(-1),
    mauUpperBoundSeries.at(-1),
    mauLowerBoundSeries.at(-1),
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

export default MauTuHistoricGraph;

import FancyGraph from "@/components/graph/FancyGraph";
import { useFetch } from "@/hooks";
import Value from "@/components/value/Value";
import { DateTime } from "luxon";
import { compact } from "@/utils/number";

const HistoryVolumeGraph = ({ daysAgo, className, ...rest }) => {
  const {
    data = [],
    error,
    isLoading,
  } = useFetch("/stats/history/", { type: "volume" });

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

  const series = [
    {
      label: "Volume",
      data: data.map((row) => ({ x: row.dt, y: row.amount })),
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
    let date = DateTime.fromISO(value);
    return `${date.toFormat("LLL dd, y")}`;
  };

  return (
    <FancyGraph
      type="bar"
      key={`graph-volume`}
      series={series}
      options={options}
      valueFormatter={valueFormatter}
      subvalueFormatter={subvalueFormatter}
    />
  );
};

export default HistoryVolumeGraph;

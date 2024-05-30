import FancyGraph from "@/components/graph/FancyGraph";
import { useFetch } from "@/hooks";
import Value from "@/components/value/Value";
import { DateTime } from "luxon";
import { compact } from "@/utils/number";
import { prefillSerieDates } from "@/utils/graph";

const HistoryVolumeGraph = ({ daysAgo }) => {
  const actualDaysAgo = daysAgo > 7 ? daysAgo : 30;
  const {
    data = [],
    error,
    isLoading,
  } = useFetch("/stats/history/", { type: "volume", days_ago: actualDaysAgo });

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

  const serie = data.map((row) => ({ x: row.dt, y: row.amount }));
  const series = [
    {
      label: "Volume",
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
    if (!data) {
      return null;
    }
    return <Value value={data.y} prefix="$" compact />;
  };

  const subvalueFormatter = (data) => {
    if (!data) {
      return null;
    }
    const value = data.x;
    let date = DateTime.fromISO(value);
    return `${date.toFormat("LLL dd, y")}`;
  };

  const headerRight = (
    <span className="bg-primary-8 text-sm px-4 text-center md:text-xs md:py-1 rounded-lg">
      Volume
    </span>
  );

  return (
    <FancyGraph
      type="bar"
      key={`graph-volume`}
      series={series}
      options={options}
      valueFormatter={valueFormatter}
      subvalueFormatter={subvalueFormatter}
      headerRight={headerRight}
    />
  );
};

export default HistoryVolumeGraph;

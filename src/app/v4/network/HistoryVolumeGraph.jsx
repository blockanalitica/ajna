import { useCallback, useMemo } from "react";
import FancyGraph from "@/components/graph/FancyGraph";
import Value from "@/components/value/Value";
import { DateTime } from "luxon";
import { compact } from "@/utils/number";
import { prefillSerieDates } from "@/utils/graph";

const HistoryVolumeGraph = ({ data, headerRight }) => {
  const series = useMemo(
    () => [
      {
        label: "Volume",
        data: prefillSerieDates(data.map((row) => ({ x: row.dt, y: row.amount }))),
      },
    ],
    [data],
  );

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

  const valueFormatter = useCallback((data) => {
    if (!data) {
      return null;
    }
    return <Value value={data.y} prefix="$" compact />;
  }, []);

  const subvalueFormatter = useCallback((data) => {
    if (!data) {
      return null;
    }
    const value = data.x;
    let date = DateTime.fromISO(value);
    return `${date.toFormat("LLL dd, y")}`;
  }, []);

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

import { useMemo } from "react";
import classnames from "classnames";
import { DateTime } from "luxon";

const Heatmap = ({ data, monthsAgo = 12 }) => {
  const daysInWeek = 7;

  const monthsAgoDate = useMemo(() => {
    const today = DateTime.now().startOf("day");
    return today.minus({ months: monthsAgo }).startOf("week");
  }, [monthsAgo]);

  const heatmapData = useMemo(() => {
    const today = DateTime.now().startOf("day");
    const result = Array.from({ length: daysInWeek }, () => []);

    let d = monthsAgoDate;
    const columns = [];
    let prevDate = d;
    while (d <= today) {
      const rowIndex = parseInt(d.toFormat("c")) - 1;
      result[rowIndex].push(0);

      if (d.month !== prevDate.month) {
        const weeks = Math.ceil(d.diff(monthsAgoDate).as("weeks"));
        const colSpanSum = columns.reduce((a, b) => a + b.colSpan, 0);
        const colSpan = weeks - colSpanSum;
        // Only add new column label if there's more than one full week in the month
        if (colSpan > 1) {
          columns.push({ label: prevDate.toFormat("LLL"), colSpan });
        }
        prevDate = d;
      }
      d = d.plus({ days: 1 });
    }

    // Add last col span
    const colSpanSum = columns.reduce((a, b) => a + b.colSpan, 0);
    const colSpan = result[0].length - colSpanSum;
    // Only add new column label if there's more than one full week in the month
    if (colSpan > 1) {
      columns.push({
        label: prevDate.toFormat("LLL"),
        colSpan: result[0].length - colSpanSum,
      });
    }

    data.forEach((item) => {
      const date = DateTime.fromISO(item.date).startOf("day");
      const columnIndex = Math.floor(date.diff(monthsAgoDate).as("weeks"));
      const rowIndex = parseInt(date.toFormat("c")) - 1;
      if (result[rowIndex][columnIndex] > 0) {
        result[rowIndex][columnIndex] += item.value;
      } else {
        result[rowIndex][columnIndex] = item.value;
      }
    });

    return { data: result, columns };
  }, [data, monthsAgoDate]);

  const rowLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const maxVal = useMemo(() => Math.max(...heatmapData.data.flat()), [heatmapData]);
  const heatColor = { r: 0, g: 255, b: 0 };

  return (
    <div
      className={classnames(
        "bg-gray-dark/30 border-gray-20 border rounded-3xl shadow-md p-5",
      )}
    >
      <table className="border-separate border-spacing-1.5">
        <thead>
          <tr>
            <td></td>
            {heatmapData.columns &&
              heatmapData.columns.map((column, index) => {
                return (
                  <td
                    colSpan={column.colSpan}
                    key={index}
                    className="text-xs text-gray-6"
                  >
                    <span>{column.label}</span>
                  </td>
                );
              })}
          </tr>
        </thead>
        <tbody>
          {heatmapData.data.map((row, rowIndex) => (
            <tr className="h-4" key={rowIndex}>
              {rowLabels && (
                <td className="leading-4" style={{ position: "relative" }}>
                  <span className="text-xs text-gray-6">{rowLabels[rowIndex]}</span>
                </td>
              )}
              {row.map((cell, cellIndex) => {
                const cellDateIndex = cellIndex * daysInWeek + rowIndex;
                const cellDate = monthsAgoDate.plus({ days: cellDateIndex });
                let bgColor = "#1A1B23";
                if (cell > 0) {
                  bgColor = `rgba(${heatColor.r}, ${heatColor.g}, ${heatColor.b}, ${
                    cell / maxVal
                  })`;
                }

                return (
                  <td
                    key={cellIndex}
                    className="rounded w-4 h-4 border-content outline outline-1 group relative"
                    style={{
                      backgroundColor: bgColor,
                      borderColor: bgColor,
                      outlineColor: bgColor,
                    }}
                  >
                    <span className="absolute w-px h-px text-clip overflow-hidden">
                      {cell}
                    </span>

                    <div
                      className={classnames(
                        "opacity-0 bg-gray-20 text-white text-xs rounded-lg px-2 py-1 absolute z-10",
                        "group-hover:opacity-100 bottom-full pointer-events-none transition-all duration-300",
                        "text-center left-1/2 -translate-x-1/2 font-normal whitespace-nowrap",
                      )}
                    >
                      {cell > 0 ? cell : "No"} events on{" "}
                      {cellDate.toFormat("LLL dd, y")}
                      <svg
                        className="absolute text-gray-20 h-2 w-full left-0 top-full"
                        x="0px"
                        y="0px"
                        viewBox="0 0 255 255"
                      >
                        <polygon points="0,0 127.5,127.5 255,0" fill="currentColor" />
                      </svg>
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Heatmap;

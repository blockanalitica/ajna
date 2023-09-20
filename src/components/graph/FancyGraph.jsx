import _ from "lodash";
import { useState } from "react";
import Graph from "./Graph";

const FancyGraph = ({
  series,
  options,
  valueFormatter,
  subvalueFormatter,
  headerRight,
  defaultTooltipData,
  ...rest
}) => {
  let defaultData = null;
  if (defaultTooltipData) {
    defaultData = defaultTooltipData;
  } else {
    defaultData = series[0].data.at(-1);
  }

  const [tooltipData, setTooltipData] = useState(defaultData);

  const externalTooltipHandler = ({ tooltip }) => {
    if (tooltip.opacity === 0) {
      if (!_.isEqual(tooltipData, defaultData)) {
        setTooltipData(defaultData);
      }
      return;
    }
    // Only set tooltip data when it differes, to avoid unnecessary rerenders
    let rawData = tooltip.dataPoints.map((row) => row.raw);
    if (rawData.length === 1) {
      rawData = rawData[0];
    }

    if (!_.isEqual(tooltipData, rawData)) {
      setTooltipData(rawData);
    }
  };

  const defaultOptions = {
    scales: {
      y: {
        display: true,
      },
    },
    plugins: {
      tooltip: {
        enabled: false,
        position: "nearest",
        external: externalTooltipHandler,
        // disable animation to prevent weird behaviour when showing both external
        // and on-canvas tooltip
        animations: {
          opacity: {
            easing: "linear",
            duration: 0,
          },
        },
      },
      legend: {
        display: false,
      },
    },
    layout: {
      autoPadding: false,
      padding: 0,
    },
    elements: {
      point: {
        hoverBorderWidth: 5,
      },
    },
  };

  const mergedOptions = _.merge(defaultOptions, options);
  const plugins = [
    {
      afterDraw: (chart) => {
        if (chart.tooltip?._active?.length) {
          const x = chart.tooltip._active[0].element.x;
          const yAxis = chart.scales.y;
          const ctx = chart.ctx;
          ctx.save();
          ctx.beginPath();
          ctx.setLineDash([5, 5]);
          ctx.moveTo(x, yAxis.top);
          ctx.lineTo(x, yAxis.bottom);
          ctx.lineWidth = 1;
          ctx.strokeStyle = "rgb(185, 186, 202)";
          ctx.stroke();
          ctx.restore();
        }
      },
    },
  ];

  const lblValue = valueFormatter ? valueFormatter(tooltipData) : tooltipData.y;
  const lblSubValue = subvalueFormatter
    ? subvalueFormatter(tooltipData)
    : tooltipData.x;

  return (
    <div>
      <div className="flex flex-col-reverse justify-between xl:flex-row">
        <div>
          <div className="text-4xl mb-1">{lblValue}</div>
          <div className="text-sm text-gray-10 mb-6">{lblSubValue}</div>
        </div>
        {headerRight ? (
          <div className="mb-4 flex justify-center items-start">{headerRight}</div>
        ) : null}
      </div>
      <Graph series={series} options={mergedOptions} plugins={plugins} {...rest} />
    </div>
  );
};

export default FancyGraph;

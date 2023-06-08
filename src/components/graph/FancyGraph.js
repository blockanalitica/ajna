"use client";

import { useState } from "react";
import Graph from "./Graph";
import _ from "lodash";

const FancyGraph = ({
  series,
  options,
  valueFormatter,
  subvalueFormatter,
  headerRight,
  ...rest
}) => {
  const defaultValues = series[0].data.at(-1);
  const [labelValue, setLabelValue] = useState(defaultValues.y);
  const [labelSubvalue, setLabelSubvalue] = useState(defaultValues.x);

  const externalTooltipHandler = ({ tooltip }) => {
    if (tooltip.opacity === 0) {
      setLabelValue(defaultValues.y);
      setLabelSubvalue(defaultValues.x);
      return;
    }

    let value = tooltip.dataPoints[0].parsed.y;
    let subvalue = tooltip.dataPoints[0].parsed.x;

    setLabelValue(value);
    setLabelSubvalue(subvalue);
  };

  const defaultOptions = {
    scales: {
      y: {
        display: false,
      },
    },
    plugins: {
      tooltip: {
        enabled: false,
        position: "nearest",
        external: externalTooltipHandler,
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

  const lblValue = valueFormatter ? valueFormatter(labelValue) : labelValue;
  const lblSubValue = valueFormatter ? subvalueFormatter(labelSubvalue) : labelSubvalue;

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <div className="text-4xl mb-1">{lblValue}</div>
          <div className="text-sm text-gray-10 mb-6">{lblSubValue}</div>
        </div>
        <div>{headerRight}</div>
      </div>
      <Graph series={series} options={mergedOptions} plugins={plugins} {...rest} />
    </div>
  );
};

export default FancyGraph;

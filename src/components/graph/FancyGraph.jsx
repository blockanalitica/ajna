import { useState, useRef } from "react";
import Graph from "./Graph";
import _ from "lodash";
import { tooltipTitleDateTime, tooltipLabelNumber } from "../../utils/graph.js";

const _getDefaultValue = (series, valueFormatter, subvalueFormatter) => {
  const lblVal = series[0].data.at(-1);
  let value = lblVal.y;
  let subvalue = lblVal.x;

  if (valueFormatter) {
    value = valueFormatter(value);
  }
  if (subvalueFormatter) {
    subvalue = subvalueFormatter(subvalue);
  }
  return { value, subvalue };
};

const FancyGraph = ({
  series,
  options,
  valueFormatter,
  subvalueFormatter,
  ...rest
}) => {
  const { value: defaultValue, subvalue: defaultSubvalue } = _getDefaultValue(
    series,
    valueFormatter,
    subvalueFormatter
  );

  const [labelValue, setLabelValue] = useState(defaultValue);
  const [labelSubvalue, setLabelSubvalue] = useState(defaultSubvalue);

  const externalTooltipHandler = ({ chart, tooltip }) => {
    if (tooltip.opacity === 0) {
      setLabelValue(defaultValue);
      setLabelSubvalue(defaultSubvalue);
      return;
    }

    let value = tooltip.dataPoints[0].parsed.y;
    let subvalue = tooltip.dataPoints[0].parsed.x;
    if (valueFormatter) {
      value = valueFormatter(value);
    }
    if (subvalueFormatter) {
      subvalue = subvalueFormatter(subvalue);
    }
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

  return (
    <div>
      <div className="text-2xl font-bold mb-1">{labelValue}</div>
      <div className="text-sm text-gray-6 mb-6">{labelSubvalue}</div>
      <Graph series={series} options={mergedOptions} plugins={plugins} {...rest} />
    </div>
  );
};

export default FancyGraph;

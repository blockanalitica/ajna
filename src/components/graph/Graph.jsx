import { round } from "@/utils/number";
import { Chart as ChartJS, registerables } from "chart.js";
import "chartjs-adapter-luxon";
import annotationPlugin from "chartjs-plugin-annotation";
import _ from "lodash";
import { Chart } from "react-chartjs-2";
import { DEFAULT_PALETTE, SYMBOLS_PALETTE } from "@/utils/colors";

ChartJS.register(...registerables, annotationPlugin);
ChartJS.defaults.color = "rgb(185, 186, 202)";
ChartJS.defaults.font = {
  size: 12,
  family: "Rubik_Regular, Inter, sans-serif",
  weight: 300,
};

const Graph = ({ series, type = "line", options, labels, ...rest }) => {
  const defaultOptions = {
    orderSeries: false, // custom option. If true, orderes series by label
    aspectRatio: 1.5,
    responsive: true,
    onResize: (chart) => {
      const parentRect = chart.canvas.parentNode.getBoundingClientRect();
      if (
        parentRect.width < 400 &&
        chart.config.options.prevParentWidth !== parentRect.width
      ) {
        chart.config.options.prevParentWidth = parentRect.width;
        chart.config.options.aspectRatio = round(
          parentRect.width / parentRect.height,
          1
        );
      } else if (parentRect.width >= 400 && parentRect.width < 600) {
        chart.config.options.aspectRatio = 1.5;
      } else if (parentRect.width >= 600) {
        chart.config.options.aspectRatio = 2;
      }
    },
    fill: false,
    interaction: {
      intersect: false,
      mode: "nearest",
      axis: "xy",
    },
    events: ["mousemove", "mouseout", "click", "touchstart", "touchmove", "dblclick"],
    plugins: {
      tooltip: {
        usePointStyle: true,
        boxPadding: 5,
        footerColor: "#ccc",
        footerFont: { weight: "400" },
      },
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
        },
      },
    },
    animation: {
      duration: 400,
    },
  };

  const plugins = [];

  let graphType = type;
  switch (type) {
    case "bar":
      defaultOptions["interaction"]["intersect"] = false;
      defaultOptions["interaction"]["mode"] = "x";
      defaultOptions["scales"] = {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          grid: {
            display: false,
          },
          beginAtZero: true,
        },
      };
      break;
    case "line":
      defaultOptions["cubicInterpolationMode"] = "monotone";
      defaultOptions["radius"] = 0;
      defaultOptions["scales"] = {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          grid: {
            display: false,
          },
          beginAtZero: true,
        },
      };
      break;
    default: // pass
  }
  const mergedOptions = _.merge(defaultOptions, options);
  let updatedSeries = series.map((serie, index) => {
    let bgColor = DEFAULT_PALETTE[index];

    if (serie.color) {
      bgColor = serie.color;
    }
    if (serie.symbol) {
      bgColor = SYMBOLS_PALETTE[serie.symbol] || bgColor;
    }
    return {
      backgroundColor: bgColor,
      borderColor: bgColor,
      ...serie,
    };
  });

  if (mergedOptions.orderSeries === true) {
    updatedSeries = _.orderBy(updatedSeries, ["label"], ["asc"]);
  }

  return (
    <Chart
      type={graphType}
      data={{ datasets: updatedSeries, labels }}
      options={mergedOptions}
      plugins={plugins}
      {...rest}
    />
  );
};

export default Graph;

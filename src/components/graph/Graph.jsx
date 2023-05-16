import { Chart as ChartJS, registerables } from "chart.js";
import "chartjs-adapter-luxon";
import _ from "lodash";
import { Chart } from "react-chartjs-2";
import { round } from "../../utils/number.js";

ChartJS.register(...registerables);
ChartJS.defaults.color = "rgb(185, 186, 202)";
ChartJS.defaults.font = {
  size: 12,
  family: "Rubik_Regular, Inter, sans-serif",
  weight: 300,
};

const DEFAULT_PALETTE = [
  "#00d395",
  "#9669ed",
  "#03A9F4",
  "#FF4560",
  "#775DD0",
  "#3F51B5",
  "#4CAF50",
  "#F9CE1D",
  "#008FFB",
  "#00E396",
  "#FEB019",
  "#0276aa",
  "#e20020",
  "#492fa3",
  "#2c387e",
  "#357a38",
  "#bd9905",
  "#0064af",
  "#009e69",
  "#c28000",
  "#014361",
  "#810012",
  "#2a1b5d",
  "#192048",
  "#1e4620",
  "#6c5702",
  "#003964",
  "#005a3c",
  "#6f4900",
  "#22b8fc",
  "#ff6077",
  "#8b75d7",
  "#5767c4",
  "#65bc69",
  "#f9d53e",
];

const Graph = ({ series, type = "line", options, labels, ...rest }) => {
  const defaultOptions = {
    orderSeries: false, // custom option. If true, orderes series by label
    aspectRatio: 1.5,
    responsive: true,
    onResize: (chart, size) => {
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
        chart.config.options.aspectRatio = 1.7;
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
  let xScaleTicks = [];
  let yScaleTicks = [];

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

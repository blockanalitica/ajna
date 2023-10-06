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
    aspectRatio: 2,
    responsive: true,
    onResize: (chart, size) => {
      const ratio = chart.config.options.aspectRatio;
      if (window.innerWidth < 576 && ratio !== 1.5) {
        chart.config.options.oldAspectRatio = ratio;
        chart.config.options.aspectRatio = 1.5;
      } else if (
        window.innerWidth >= 576 &&
        chart.config.options.oldAspectRatio > 0 &&
        ratio !== chart.config.options.oldAspectRatio
      ) {
        chart.config.options.aspectRatio = chart.config.options.oldAspectRatio;
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

"use client";

import _ from "lodash";
import Graph from "@/components/graph/Graph";
import { useFetch } from "@/hooks";
import { compact, formatToDecimals } from "@/utils/number";
import GenericEmptyPlaceholder from "@/components/GenericEmptyPlaceholder";
import { faChartBar } from "@fortawesome/free-solid-svg-icons";

const BucketsGraph = ({ address, lup, htp }) => {
  const { data, error, isLoading } = useFetch(`/pools/${address}/buckets/graph/`);

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

  if (!data || (data && data.length === 0)) {
    return (
      <GenericEmptyPlaceholder
        title="No buckets"
        content="There are no buckets"
        icon={faChartBar}
      />
    );
  }

  const grouped = _.groupBy(data, "type");

  const series = [];
  Object.entries(grouped).forEach(([key, rows]) => {
    const color = key === "utilized" ? "#8AC7DB" : "#B5179E";
    series.push({
      label: key,
      backgroundColor: color,
      borderColor: color,
      data: rows.map((row) => ({
        x: row["amount"],
        y: row["bucket_price"],
        bucketIndex: row["bucket_index"],
      })),
    });
  });

  const graphAnnotations = {};

  if (lup) {
    graphAnnotations["lup"] = {
      type: "line",
      scaleID: "y",
      value: lup,
      borderColor: "#8AC7DB",
      borderWidth: 2,
      borderDash: [10, 8],
      label: {
        position: "end",
        backgroundColor: "#1A1B23",
        padding: 5,
        color: "#AEAFC2",
        content: "LUP",
        display: true,
        font: { weight: "normal" },
      },
    };
  }

  if (htp) {
    graphAnnotations["htp"] = {
      type: "line",
      scaleID: "y",
      value: htp,
      borderColor: "#B45CD6",
      borderWidth: 2,
      borderDash: [10, 8],
      label: {
        position: "end",
        backgroundColor: "#1A1B23",
        padding: 5,
        color: "#AEAFC2",
        content: "HTP",
        display: true,
        font: { weight: "normal" },
      },
    };
  }

  const options = {
    indexAxis: "y",
    interaction: {
      mode: "nearest",
      axis: "y",
    },
    barThickness: 10,
    scales: {
      x: {
        stacked: true,
        ticks: {
          callback: (value) => compact(value, 2, true),
        },
        title: {
          display: true,
          text: "quote",
        },
      },
      y: {
        type: "linear",
        stacked: true,
        title: {
          display: true,
          text: "bucket price",
        },
        beginAtZero: false,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: (tooltipItems) => {
            return `Bucket price: ${formatToDecimals(tooltipItems[0].raw.y, 2)}`;
          },
          label: (tooltipItem) => {
            const value = compact(tooltipItem.parsed.x, 2, true);
            const utilized =
              tooltipItem.dataset.label === "utilized" ? "utilized" : "not utilized";
            return `Bucket #${tooltipItem.raw.bucketIndex} ${utilized}: ${value}`;
          },
        },
      },
      annotation: {
        annotations: graphAnnotations,
      },
    },
  };
  return <Graph series={series} options={options} type="bar" />;
};

export default BucketsGraph;

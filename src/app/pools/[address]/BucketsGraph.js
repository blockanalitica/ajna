"use client";

import Graph from "@/components/graph/Graph";
import { useFetch } from "@/hooks";
import { compact, formatToDecimals } from "@/utils/number";
import _ from "lodash";

const BucketsGraph = ({ address, lup, htp }) => {
  const { data, error, isLoading } = useFetch(`/pools/${address}/buckets/graph/`);

  if (error) {
    return <p>Failed to load data</p>;
  }
  if (isLoading) {
    return <p>Loading....</p>;
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

  const graphAnnotations = {
    htp: {
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
    },
    lup: {
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
    },
  };

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
            return `Bucket price: ${formatToDecimals(tooltipItems[0].raw.x, 2)}`;
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

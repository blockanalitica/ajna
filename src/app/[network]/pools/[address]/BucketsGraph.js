"use client";

import _ from "lodash";
import Graph from "@/components/graph/Graph";
import { useFetch } from "@/hooks";
import { compact, formatToDecimals } from "@/utils/number";
import GenericEmptyPlaceholder from "@/components/GenericEmptyPlaceholder";
import { faChartBar } from "@fortawesome/free-solid-svg-icons";

const BucketsGraph = ({ address, lupIndex, htpIndex }) => {
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
  let labels = [];
  const series = [];
  Object.entries(grouped).forEach(([key, rows]) => {
    const color = key === "utilized" ? "#8AC7DB" : "#B5179E";
    labels = labels.concat(rows.map((row) => row.bucket_index));
    series.push({
      label: key,
      backgroundColor: color,
      borderColor: color,
      data: rows.map((row) => ({
        x: row["amount"],
        y: row["bucket_index"],
        bucketPrice: row["bucket_price"],
      })),
    });
  });
  labels.sort();
  labels = _.sortedUniq(labels);

  const graphAnnotations = {};

  if (lupIndex) {
    let lupIndexValue = labels.findIndex((el) => el >= lupIndex);
    if (lupIndexValue === -1) {
      lupIndexValue = labels.length - 0.5;
    } else if (labels[lupIndexValue] !== lupIndex) {
      lupIndexValue -= 0.5;
    }
    graphAnnotations["lup"] = {
      type: "line",
      scaleID: "y",
      value: lupIndexValue,
      borderColor: "#F6C361",
      borderWidth: 2,
      borderDash: [10, 8],
      label: {
        position: "end",
        backgroundColor: "#1A1B23",
        padding: 5,
        color: "#F6C361",
        content: "LUP",
        rotation: "90",
        display: true,
        font: { weight: "normal" },
      },
    };
  }

  if (htpIndex) {
    let htpIndexValue = labels.findIndex((el) => el >= htpIndex);
    if (htpIndexValue === -1) {
      htpIndexValue = labels.length - 0.5;
    } else if (labels[htpIndexValue] !== htpIndex) {
      htpIndexValue -= 0.5;
    }
    graphAnnotations["htp"] = {
      type: "line",
      scaleID: "y",
      value: htpIndexValue,
      borderColor: "#FF5C69",
      borderWidth: 2,
      borderDash: [10, 8],
      label: {
        position: "end",
        backgroundColor: "#1A1B23",
        padding: 5,
        rotation: "90",
        color: "#FF5C69",
        xAdjust: -20,
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
    scales: {
      x: {
        stacked: true,
        ticks: {
          callback: (value) => compact(value, 2, true),
        },
        title: {
          display: true,
          text: "quote amount",
        },
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: "bucket index",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: (tooltipItems) => {
            return `Bucket price: ${formatToDecimals(
              tooltipItems[0].raw.bucketPrice,
              5
            )}`;
          },
          label: (tooltipItem) => {
            let value = tooltipItem.parsed.x;
            value = compact(value, value < 1 ? 5 : 2, true);
            const utilized =
              tooltipItem.dataset.label === "utilized" ? "utilized" : "not utilized";
            return `Bucket #${tooltipItem.raw.y} ${utilized}: ${value}`;
          },
        },
      },
      annotation: {
        annotations: graphAnnotations,
      },
    },
  };

  return (
    <div className="min-h-[20rem]">
      <Graph series={series} options={options} type="bar" labels={labels} />
    </div>
  );
};

export default BucketsGraph;

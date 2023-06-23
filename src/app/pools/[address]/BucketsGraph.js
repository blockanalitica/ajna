"use client";

import CardBackground from "@/components/card/CardBackground";
import Graph from "@/components/graph/Graph";
import { useFetch } from "@/hooks";
import { compact, formatToDecimals } from "@/utils/number";

const BucketsGraph = ({ address, lup, htp, ...rest }) => {
  const { data, error, isLoading } = useFetch(`/pools/${address}/buckets/`, {
    p_size: 50,
    order: "-bucket_price",
  });

  if (error) {
    return <p>Failed to load data</p>;
  }
  if (isLoading) {
    return <p>Loading....</p>;
  }

  const { results } = data;

  const series = [];
  const labels = [];
  let lupIndex = 0;
  let htpIndex = 0;
  results.forEach((row, index) => {
    const y = formatToDecimals(row.bucket_price);
    labels.push(y);

    if (row.bucket_price >= lup) {
      lupIndex = index;
    }
    if (row.bucket_price >= htp) {
      htpIndex = index;
    }

    series.push({
      label: row.bucket_index,
      data: [{ x: row.deposit, y: y, bucketPrice: row.bucket_price }],
    });
  });

  const graphAnnotations = {
    htp: {
      type: "line",
      scaleID: "y",
      value: htpIndex,
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
      value: lupIndex,
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
    scales: {
      x: {
        ticks: {
          callback: (value) => compact(value, 2, true),
        },
        title: {
          display: true,
          text: "quote",
        },
      },
      y: {
        type: "category",
        stacked: true,
        title: {
          display: true,
          text: "bucket price",
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
              2
            )}`;
          },
          label: (tooltipItem) => {
            const value = compact(tooltipItem.parsed.x, 2, true);
            return `Bucket #${tooltipItem.dataset.label}: ${value}`;
          },
        },
      },
      annotation: {
        annotations: graphAnnotations,
      },
    },
  };

  return (
    <CardBackground {...rest}>
      <Graph series={series} options={options} type="bar" labels={labels} />
    </CardBackground>
  );
};

export default BucketsGraph;

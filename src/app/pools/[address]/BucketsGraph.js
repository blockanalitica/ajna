"use client";

import CardBackground from "@/components/card/CardBackground";
import Graph from "@/components/graph/Graph";
import { useFetch } from "@/hooks";
import { compact, formatToDecimals } from "@/utils/number";

const BucketsGraph = ({ address, ...rest }) => {
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
  results.forEach((row) => {
    const y = formatToDecimals(row.bucket_price);
    labels.push(y);
    series.push({
      label: row.bucket_index,
      data: [{ x: row.deposit, y: y, bucketPrice: row.bucket_price }],
    });
  });

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
            return `Bucket ${tooltipItem.dataset.label}: ${value}`;
          },
        },
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

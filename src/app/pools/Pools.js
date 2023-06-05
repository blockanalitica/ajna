"use client";

import { useState } from "react";
import { useFetch } from "@/hooks.js";
import PoolsTable from "@/components/table/specific/PoolsTable";

const Pools = ({ daysAgo = 1, ...rest }) => {
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState("-tvl");

  const {
    data = {},
    error,
    isLoading,
  } = useFetch("/pools/", {
    p: page,
    p_size: pageSize,
    order,
    days_ago: daysAgo,
  });

  if (error) {
    return <p>Failed to load data</p>;
  }

  const { results, count } = data;

  return (
    <PoolsTable
      data={results}
      currentPage={page}
      pageSize={pageSize}
      totalRecords={count}
      onPageChange={setPage}
      onOrderChange={setOrder}
      currentOrder={order}
      isLoading={isLoading}
      {...rest}
    />
  );
};

export default Pools;

"use client";

import { useState } from "react";
import { useFetch } from "@/hooks";
import PoolsTable from "@/components/table/specific/PoolsTable";

const TokenPools = ({ address, daysAgo, ...rest }) => {
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState("-tvl");

  const {
    data = {},
    error,
    isLoading,
  } = useFetch(`/tokens/${address}/pools/`, {
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
    <section {...rest}>
      <h1 className="text-xl md:text-1xl xl:text-2xl mb-5">Pools</h1>
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
    </section>
  );
};

export default TokenPools;

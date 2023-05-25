"use client";

import { useState } from "react";
import { useFetch } from "@/hooks.js";
import TokensTable from "@/components/table/specific/TokensTable";

const TopPools = async ({ ...rest }) => {
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState("-tvl");

  const { data, error, isLoading } = useFetch("/tokens/", {
    p: page,
    p_size: pageSize,
    order,
  });

  if (error) {
    return <p>Failed to load data</p>;
  }
  if (isLoading) {
    return <p>Loading....</p>;
  }

  const { results, count } = data;

  return (
    <TokensTable
      data={results}
      currentPage={page}
      pageSize={pageSize}
      totalRecords={count}
      onPageChange={setPage}
      onOrderChange={setOrder}
      currentOrder={order}
      {...rest}
    />
  );
};

export default TopPools;

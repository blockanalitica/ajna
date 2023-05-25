"use client";

import { useState } from "react";
import { useFetch } from "@/hooks.js";
import PoolsTable from "@/components/table/specific/PoolsTable";

const Pools = ({ ...rest }) => {
  const pageSize = 2;
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState("-tlv");

  const { data, error, isLoading } = useFetch("/pools/", {
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
    <PoolsTable
      data={results}
      page={page}
      pageSize={pageSize}
      totalRecords={count}
      onPageChange={setPage}
      onSortChange={setOrder}
      {...rest}
    />
  );
};

export default Pools;

"use client";

import { faBucket } from "@fortawesome/free-solid-svg-icons";
import Table from "@/components/table/Table";
import Value from "@/components/value/Value";
import { useFetch } from "@/hooks";
import { faCheckCircle, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const PoolBuckets = ({ address, ...rest }) => {
  const pageSize = 5;
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState("-bucket_price");

  const {
    data = {},
    error,
    isLoading,
  } = useFetch(`/pools/${address}/buckets/`, {
    p: page,
    p_size: pageSize,
    order,
  });

  if (error) {
    return <p>Failed to load data</p>;
  }

  const { results, count } = data;

  const columns = [
    {
      header: "#",
      cell: ({ row }) => (
        <span className="font-syncopate text-gray-7">{row.bucket_index}</span>
      ),
      orderField: "bucket_index",
      cellSize: "0.2fr",
    },
    {
      header: "Bucket Price",
      cell: ({ row }) => (
        <Value
          value={row.bucket_price}
          suffix={row.quote_token_symbol}
          decimals={row.bucket_price < 1 ? 5 : 2}
        />
      ),
      smallCell: ({ row }) => (
        <Value
          value={row.bucket_price * row.quote_token_underlying_price}
          prefix="$"
          decimals={row.bucket_price * row.quote_token_underlying_price < 1 ? 5 : 2}
        />
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: "bucket_price",
    },
    {
      header: "Collateral",
      cell: ({ row }) => (
        <Value
          value={row.collateral}
          suffix={row.collateral_token_symbol}
          decimals={row.collateral < 1 ? 5 : 2}
        />
      ),
      smallCell: ({ row }) => (
        <Value
          value={row.collateral * row.collateral_token_underlying_price}
          prefix="$"
          decimals={row.collateral * row.collateral_token_underlying_price < 1 ? 5 : 2}
        />
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: "collateral",
      visibleAfter: "md",
    },
    {
      header: "Quote",
      cell: ({ row }) => (
        <Value
          value={row.deposit}
          suffix={row.quote_token_symbol}
          decimals={row.deposit < 1 ? 5 : 2}
        />
      ),
      smallCell: ({ row }) => (
        <Value
          value={row.deposit * row.quote_token_underlying_price}
          prefix="$"
          decimals={row.deposit * row.quote_token_underlying_price < 1 ? 5 : 2}
        />
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: "deposit",
      visibleAfter: "md",
    },
    {
      header: "Utilized Bucket",
      cell: ({ row }) =>
        row.is_utilized ? (
          <FontAwesomeIcon icon={faCheckCircle} className="text-green-8" />
        ) : (
          <FontAwesomeIcon icon={faCircleXmark} className="text-red-8" />
        ),
      headerAlign: "end",
      cellAlign: "end",
    },
  ];

  return (
    <div {...rest}>
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl md:text-1xl xl:text-2xl">Buckets</h1>
      </div>
      <Table
        data={results}
        keyField="bucket_index"
        columns={columns}
        currentPage={page}
        pageSize={pageSize}
        totalRecords={count}
        onPageChange={setPage}
        onOrderChange={setOrder}
        currentOrder={order}
        isLoading={isLoading}
        emptyIcon={faBucket}
        emptyTitle="No Buckets"
        emptyContent="There are no buckets"
        placeholderRows={pageSize}
      />
    </div>
  );
};

export default PoolBuckets;

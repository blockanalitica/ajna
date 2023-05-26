"use client";

import CryptoIcon from "@/components/icon/CryptoIcon";
import Table from "@/components/table/Table";
import Tag from "@/components/tags/Tag";
import Value from "@/components/value/Value";
import ValueChange from "@/components/value/ValueChange";
import { useFetch } from "@/hooks.js";
import { useState } from "react";

const TokenPoolsTable = ({ address }) => {
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState("-pool_size");

  const {
    data = {},
    error,
    isLoading,
  } = useFetch(`/tokens/${address}/pools/`, {
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
      cell: ({ index }) => <>{index + 1}</>,
    },
    {
      header: "Collateral / Quote",
      cell: ({ row }) => (
        <>
          <span className="relative flex">
            <CryptoIcon name={row.collateral_token_symbol} className="z-10" />
            <CryptoIcon
              name={row.quote_token_symbol}
              className="relative left-[-10px] z-0"
            />
          </span>
          <span className="font-medium pl-4">
            {row.collateral_token_symbol} / {row.quote_token_symbol}
          </span>
        </>
      ),
    },
    {
      header: "Market Price",
      cell: ({ row }) => (
        <div className="flex">
          <Value
            value={row.collateral_token_underlying_price}
            decimals={2}
            compact
            prefix="$"
          />
          <ValueChange value={1} decimals={2} compact hideIfZero className="ml-2" />
        </div>
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: "collateral_token_underlying_price",
    },
    {
      header: "LUP",
      cell: ({ row }) => (
        <div className="flex">
          <Value value={row.lup} decimals={2} compact />
          <ValueChange value={1} decimals={2} compact hideIfZero className="ml-2" />
        </div>
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: "lup",
    },
    {
      header: "HTP",
      cell: ({ row }) => (
        <div className="flex">
          <Value value={row.htp} decimals={2} compact />
          <ValueChange value={1} decimals={2} compact hideIfZero className="ml-2" />
        </div>
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: "htp",
    },
    {
      header: "TVL",
      cell: ({ row }) => (
        <div className="flex">
          <Value value={row.pool_size} decimals={2} compact prefix="$" />
          <ValueChange value={0} decimals={2} compact hideIfZero className="ml-2" />
        </div>
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: "pool_size",
    },
    {
      header: "Lend APR",
      cell: ({ row }) => (
        <Tag>
          <Value value={row.lend_rate * 100} decimals={2} suffix="%" />
        </Tag>
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: "interest_rate",
    },
    {
      header: "Borrow APR",
      cell: ({ row }) => (
        <Tag>
          <Value value={row.borrow_rate * 100} decimals={2} suffix="%" />
        </Tag>
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: "interest_rate",
    },
    {
      header: "Volume",
      cell: ({ row }) => (
        <div className="flex flex-col items-end">
          <Value value={row.total_ajna_burned} decimals={2} />
          <ValueChange value={0} decimals={2} compact dashIfZero />
        </div>
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: "total_ajna_burned",
    },
  ];

  return (
    <Table
      data={results}
      keyField="address"
      columns={columns}
      gridColumnClassName="grid-cols-table-pools"
      href={(row) => `/pools/${row.address}`}
      currentPage={page}
      pageSize={pageSize}
      totalRecords={count}
      onPageChange={setPage}
      onOrderChange={setOrder}
      currentOrder={order}
      isLoading={isLoading}
    />
  );
};

export default TokenPoolsTable;

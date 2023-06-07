"use client";

import { useFetch } from "@/hooks";
import { useState } from "react";
import CryptoIcon from "@/components/icon/CryptoIcon";
import Table from "@/components/table/Table";
import Value from "@/components/value/Value";
import ValueChange from "@/components/value/ValueChange";

const TokenArbitragePools = ({ address, daysAgo, ...rest }) => {
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState("-collateral_token_underlying_price");

  const {
    data = {},
    error,
    isLoading,
  } = useFetch(`/tokens/${address}/arbitrage-pools/`, {
    p: page,
    p_size: pageSize,
    order,
    days_ago: daysAgo,
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
          <span className="font-medium pl-1">
            {row.collateral_token_symbol} / {row.quote_token_symbol}
          </span>
        </>
      ),
    },
    {
      header: "Market Price",
      cell: ({ row }) => (
        <Value value={row.collateral_token_underlying_price} prefix="$" />
      ),
      smallCell: ({ row }) => (
        <ValueChange
          value={
            row.collateral_token_underlying_price -
            row.prev_collateral_token_underlying_price
          }
        />
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: "collateral_token_underlying_price",
    },
    {
      header: "LUP",
      cell: ({ row }) => <Value value={row.lup} />,
      smallCell: ({ row }) => <ValueChange value={row.lup - row.prev_lup} />,
      headerAlign: "end",
      cellAlign: "end",
      orderField: "lup",
    },
    {
      header: "HTP",
      cell: ({ row }) => <Value value={row.htp} />,
      smallCell: ({ row }) => <ValueChange value={row.htp - row.prev_htp} />,
      headerAlign: "end",
      cellAlign: "end",
      orderField: "htp",
    },
    {
      header: "HPB",
      cell: ({ row }) => <Value value={row.hpb} />,
      smallCell: ({ row }) => <ValueChange value={row.hpb - row.prev_hpb} />,
      headerAlign: "end",
      cellAlign: "end",
      orderField: "hpb",
    },
  ];

  return (
    <section {...rest}>
      <h1 className="text-xl md:text-1xl xl:text-2xl mb-5">Arbitrage Pools</h1>

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
    </section>
  );
};

export default TokenArbitragePools;
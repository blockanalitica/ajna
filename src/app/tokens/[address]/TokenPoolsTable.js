"use client";

import classnames from "classnames";
import CryptoIcon from "@/components/icon/CryptoIcon";
import Tag from "@/components/tags/Tag";
import Value from "@/components/value/Value";
import ValueChange from "@/components/value/ValueChange";
import CardBackground from "@/components/card/CardBackground";
import Table from "@/components/table/Table";
import { useFetch } from "@/hooks.js";
import Link from "next/link";

// TODO: make it async and suspense it for the url fetch
const TokenPoolsTable = ({ address }) => {
  const { data, error, isLoading } = useFetch(`/tokens/${address}/pools/`);

  if (error) {
    return <p>Failed to load Data</p>;
  }
  if (isLoading) {
    return <p>Loading....</p>;
  }

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
    },
    {
      header: "APR",
      cell: ({ row }) => (
        <Tag>
          <Value value={row.interest_rate} decimals={2} suffix="%" />
        </Tag>
      ),
      headerAlign: "end",
      cellAlign: "end",
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
    },
  ];

  return (
    <Table
      data={data.results}
      keyField="address"
      columns={columns}
      gridColumnClassName="grid-cols-table-pools"
      href={(row) => `/pools/${row.address}`}
    />
  );
};

export default TokenPoolsTable;

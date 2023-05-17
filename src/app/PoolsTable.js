"use client";

import classnames from "classnames";
import CryptoIcon from "@/components/icon/CryptoIcon";
import TagComp from "@/components/tags/TagComp";
import Value from "@/components/value/Value";
import ValueChange from "@/components/value/ValueChange";
import CardBackground from "@/components/card/CardBackground";
import Table from "@/components/table/Table";
import { useFetch } from "@/hooks.js";
import Link from "next/link";

// TODO: make it async and suspense it for the url fetch
const PoolsTable = () => {
  // TODO: wrong url (should only fetch "top" pools, not all?)
  const { data, error, isLoading } = useFetch("/pools/");

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
      header: "Collateral",
      cell: ({ row }) => (
        <div className="flex flex-col items-end">
          <div className="flex">
            <Value
              value={row.pledged_collateral}
              decimals={2}
              compact
              suffix={row.collateral_token_symbol}
            />
            <ValueChange value={1} decimals={2} compact hideIfZero className="ml-2" />
          </div>
          <div className="flex text-gray-6 text-xs">
            <Value
              value={row.pledged_collateral * row.collateral_token_underlying_price}
              prefix="$"
              decimals={2}
              compact
            />
            <ValueChange
              value={1}
              decimals={2}
              compact
              hideIfZero
              className="ml-2"
              prefix="$"
            />
          </div>
        </div>
      ),
      headerAlign: "end",
      cellAlign: "end",
    },
    {
      header: "Quote",
      cell: ({ row }) => (
        <div className="flex flex-col items-end">
          <div className="flex">
            <Value
              value={row.pool_size}
              decimals={2}
              compact
              suffix={row.quote_token_symbol}
            />
            <ValueChange value={0} decimals={2} compact hideIfZero className="ml-2" />
          </div>
          <div className="flex text-gray-6 text-xs">
            <Value
              value={row.pool_size * row.quote_token_underlying_price}
              prefix="$"
              decimals={2}
              compact
            />
            <ValueChange value={0} decimals={2} compact hideIfZero prefix="$" />
          </div>
        </div>
      ),
      headerAlign: "end",
      cellAlign: "end",
    },
    {
      header: "Debt",
      cell: ({ row }) => (
        <div className="flex flex-col items-end">
          <div className="flex">
            <Value
              value={row.current_debt}
              decimals={2}
              compact
              suffix={row.quote_token_symbol}
            />
            <ValueChange value={0} decimals={2} compact hideIfZero className="ml-2" />
          </div>
          <div className="flex text-gray-6 text-xs">
            <Value
              value={row.current_debt * row.quote_token_underlying_price}
              prefix="$"
              decimals={2}
              compact
            />
            <ValueChange value={0} decimals={2} compact hideIfZero prefix="$" />
          </div>
        </div>
      ),
      headerAlign: "end",
      cellAlign: "end",
    },
    {
      header: "TVL",
      cell: ({ row }) => (
        <div className="flex flex-col items-end">
          <Value value={row.tvl} decimals={2} prefix="$" compact />
          <ValueChange value={0} decimals={2} prefix="$" compact dashIfZero />
        </div>
      ),
      headerAlign: "end",
      cellAlign: "end",
    },
    {
      header: "APR",
      cell: ({ row }) => (
        <TagComp
          title={<Value value={row.interest_rate} decimals={2} suffix={"%"} />}
        />
      ),
      headerAlign: "end",
      cellAlign: "end",
    },
    {
      header: "🔥",
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

export default PoolsTable;

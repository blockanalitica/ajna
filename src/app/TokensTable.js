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
const TokensTable = () => {
  // TODO: wrong url (should only fetch "top" tokens, not all?)
  const { data, error, isLoading } = useFetch("/tokens/");

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
      header: "Name",
      cell: ({ row }) => (
        <>
          <CryptoIcon name={row.symbol} />
          <span className="font-medium ml-2">
            {row.name}
            <span className="text-gray-13 ml-2">({row.symbol})</span>
          </span>
        </>
      ),
    },
    {
      header: "Price",
      cell: ({ row }) => (
        <Value value={row.underlying_price} decimals={2} prefix="$" compact />
      ),
      headerAlign: "end",
      cellAlign: "end",
    },

    {
      header: "TVL",
      cell: ({ row }) => <Value value={row.tvl} decimals={2} prefix="$" compact />,
      headerAlign: "end",
      cellAlign: "end",
    },
    {
      header: "Pools",
      cell: ({ row }) => <Value value={row.pool_count} decimals={0} />,
      headerAlign: "end",
      cellAlign: "end",
    },
  ];

  return (
    <Table
      data={data.results}
      keyField="underlying_address"
      columns={columns}
      gridColumnClassName="grid-cols-table-tokens"
      href={(row) => `/tokens/${row.underlying_address}`}
    />
  );
};

export default TokensTable;

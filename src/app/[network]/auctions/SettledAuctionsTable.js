"use client";

import { useState } from "react";
import { useFetch } from "@/hooks";
import { shorten } from "@/utils/address";
import { DateTime } from "luxon";
import Table from "@/components/table/Table";
import Value from "@/components/value/Value";
import DateTimeAgo from "@/components/dateTime/DateTimeAgo";
import CryptoIcon from "@/components/icon/CryptoIcon";
import Link from "next/link";
import { useParams } from "next/navigation";

const SettledAuctionsTable = ({ daysAgo }) => {
  const { network } = useParams();
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState("-settle_time");

  const {
    data = {},
    error,
    isLoading,
  } = useFetch("/auctions/settled/", {
    p: page,
    p_size: pageSize,
    order,
    days_ago: daysAgo,
  });

  if (error) {
    return <p>Failed to load data</p>;
  }

  const { results = [], count } = data;

  if (results.length === 0) {
    return null;
  }

  const columns = [
    {
      header: "Pool",
      cell: ({ row }) => (
        <Link
          href={`/${network}/pools/${row.pool_address}`}
          className="text-purple-6 hover:underline flex"
        >
          <span className="relative hidden md:flex">
            <CryptoIcon name={row.collateral_token_symbol} className="z-10" />
            <CryptoIcon
              name={row.debt_token_symbol}
              className="relative left-[-10px] z-0"
            />
          </span>
          <span className="font-medium md:pl-2">
            {row.collateral_token_symbol} / {row.debt_token_symbol}
          </span>
        </Link>
      ),
    },
    {
      header: "Borrower",
      cell: ({ row }) => <>{shorten(row.borrower)}</>,
      smallCell: ({ row }) => (
        <DateTimeAgo
          dateTime={DateTime.fromSeconds(row.settle_time)}
          className="sm:hidden"
        />
      ),
      headerAlign: "center",
      cellAlign: "center",
      visibleAfter: "sm",
    },
    {
      header: "Collateral",
      cell: ({ row }) => (
        <Value value={row.collateral} suffix={row.collateral_token_symbol} />
      ),
      smallCell: ({ row }) => <Value value={row.collateral_usd} prefix="$" />,
      headerAlign: "end",
      cellAlign: "end",
      orderField: "collateral",
    },
    {
      header: "Debt",
      cell: ({ row }) => <Value value={row.debt} suffix={row.debt_token_symbol} />,
      smallCell: ({ row }) => <Value value={row.debt_usd} prefix="$" />,
      headerAlign: "end",
      cellAlign: "end",
      orderField: "debt",
    },
    {
      header: "Settled",
      cell: ({ row }) => (
        <DateTimeAgo dateTime={DateTime.fromSeconds(row.settle_time)} />
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: "settle_time",
      visibleAfter: "sm",
    },
  ];

  return (
    <Table
      data={results}
      currentPage={page}
      pageSize={pageSize}
      totalRecords={count}
      onPageChange={setPage}
      onOrderChange={setOrder}
      currentOrder={order}
      isLoading={isLoading}
      keyField="uid"
      columns={columns}
    />
  );
};

export default SettledAuctionsTable;

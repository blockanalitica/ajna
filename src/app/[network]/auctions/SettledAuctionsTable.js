"use client";

import { useState } from "react";
import { useFetch } from "@/hooks";
import { shorten } from "@/utils/address";
import { DateTime } from "luxon";
import Table from "@/components/table/Table";
import Value from "@/components/value/Value";
import DateTimeAgo from "@/components/dateTime/DateTimeAgo";

const SettledAuctionsTable = ({ daysAgo }) => {
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
      header: "Borrower",
      cell: ({ row }) => <>{shorten(row.borrower)}</>,
      smallCell: ({ row }) => (
        <DateTimeAgo
          dateTime={DateTime.fromSeconds(row.settle_time)}
          className="sm:hidden"
        />
      ),
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

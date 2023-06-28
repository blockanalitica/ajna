"use client";

import { useState } from "react";
import { faGavel } from "@fortawesome/free-solid-svg-icons";
import { useFetch } from "@/hooks";
import { shorten } from "@/utils/address";
import { DateTime } from "luxon";
import Table from "@/components/table/Table";
import Value from "@/components/value/Value";
import HoursMinutes from "@/components/dateTime/HoursMinutes";

const ActiveAuctions = () => {
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState("-kick_time");

  const {
    data = {},
    error,
    isLoading,
  } = useFetch("/auctions/active/", {
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
      header: "Borrower Address",
      cell: ({ row }) => <>{shorten(row.borrower)}</>,
    },
    {
      header: "Time Remaining",
      cell: ({ row }) => (
        <HoursMinutes
          dateTime={DateTime.fromSeconds(row.kick_time).plus({ hours: 72 })}
        />
      ),
      headerAlign: "end",
      cellAlign: "end",
    },
    {
      header: "Collateral Remaining / Total",
      cell: ({ row }) => (
        <>
          <Value value={row.collateral_remaining} />
          <span className="px-2">/</span>
          <Value value={row.collateral} suffix={row.collateral_token_symbol} />
        </>
      ),
      headerAlign: "end",
      cellAlign: "end",
    },
    {
      header: "Debt Remaining / Total",
      cell: ({ row }) => (
        <>
          <Value value={row.debt_remaining} />
          <span className="px-2">/</span>
          <Value value={row.debt} suffix={row.debt_token_symbol} />
        </>
      ),
      headerAlign: "end",
      cellAlign: "end",
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
      emptyIcon={faGavel}
      emptyTitle="No Auctions"
      emptyContent="There are no active auctions"
    />
  );
};

export default ActiveAuctions;

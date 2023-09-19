"use client";

import { useState } from "react";
import { useFetch } from "@/hooks";
import Table from "@/components/table/Table";
import { DateTime } from "luxon";
import { useParams } from "next/navigation";
import { shorten } from "@/utils/address";
import Value from "@/components/value/Value";
import DateTimeAgo from "@/components/dateTime/DateTimeAgo";

const Depositors = ({ searchTerm }) => {
  const { network } = useParams();
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState("-supply_usd");

  const {
    data = {},
    error,
    isLoading,
  } = useFetch("/wallets/", {
    p: page,
    p_size: pageSize,
    order,
    search: searchTerm,
    type: "depositors",
  });

  if (error) {
    return <p>Failed to load data</p>;
  }

  const { results, count } = data;

  const columns = [
    {
      header: "Wallet",
      cell: ({ row }) => <>{shorten(row.wallet_address)}</>,
    },
    {
      header: "Deposited",
      cell: ({ row }) => <Value value={row.supply_usd} prefix="$" />,

      headerAlign: "end",
      cellAlign: "end",
      orderField: "supply_usd",
    },
    {
      header: "Latest Activity",
      cell: ({ row }) => <DateTimeAgo dateTime={DateTime.fromISO(row.last_activity)} />,
      headerAlign: "end",
      cellAlign: "end",
      orderField: "last_activity",
    },
    {
      header: "Earlies Activity",
      cell: ({ row }) => (
        <DateTimeAgo dateTime={DateTime.fromISO(row.first_activity)} />
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: "first_activity",
    },
  ];

  return (
    <>
      <Table
        data={results}
        currentPage={page}
        pageSize={pageSize}
        totalRecords={count}
        onPageChange={setPage}
        onOrderChange={setOrder}
        currentOrder={order}
        isLoading={isLoading}
        keyField="wallet_address"
        columns={columns}
        href={(row) => `/v2/${network}/wallets/${row.wallet_address}`}
        emptyTitle="No Wallets"
        emptyContent="There are no wallets"
      />
    </>
  );
};

export default Depositors;

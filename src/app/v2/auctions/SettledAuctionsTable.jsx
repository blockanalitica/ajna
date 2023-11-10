import { useState } from "react";
import { useFetch, useLinkBuilder } from "@/hooks";
import Table from "@/components/table/Table";
import Value from "@/components/value/Value";
import DateTimeAgo from "@/components/dateTime/DateTimeAgo";
import { parseUTCDateTime } from "@/utils/datetime";
import Address from "@/components/address/Address";
import PoolName from "@/components/poolName/PoolName";

const SettledAuctionsTable = ({ daysAgo }) => {
  const buildLink = useLinkBuilder();
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
        <PoolName
          collateralSymbol={row.collateral_token_symbol}
          quoteSymbol={row.quote_token_symbol}
        />
      ),
    },
    {
      header: "Borrower",
      cell: ({ row }) => <Address address={row.borrower} />,
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
      cell: ({ row }) => <Value value={row.debt} suffix={row.quote_token_symbol} />,
      smallCell: ({ row }) => <Value value={row.debt_usd} prefix="$" />,
      headerAlign: "end",
      cellAlign: "end",
      orderField: "debt",
    },
    {
      header: "Settled",
      cell: ({ row }) => <DateTimeAgo dateTime={parseUTCDateTime(row.settle_time)} />,
      headerAlign: "end",
      cellAlign: "end",
      orderField: "settle_time",
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
      linkTo={(row) => buildLink(`auctions/${row.uid}`)}
    />
  );
};

export default SettledAuctionsTable;

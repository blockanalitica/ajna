import { useState } from "react";
import { useFetch, useLinkBuilder } from "@/hooks";
import Table from "@/components/table/Table";
import Value from "@/components/value/Value";
import CurrencyValue from "@/components/value/CurrencyValue";
import DateTimeAgo from "@/components/dateTime/DateTimeAgo";
import { parseUTCDateTime } from "@/utils/datetime";
import Address from "@/components/address/Address";

const AuctionsSettled = ({ poolAddress }) => {
  const buildLink = useLinkBuilder();
  const pageSize = 5;
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState("-settle_time");

  const {
    data = {},
    error,
    isLoading,
  } = useFetch(`/pools/${poolAddress}/auctions/settled/`, {
    p: page,
    p_size: pageSize,
    order,
  });

  if (error) {
    return <p>Failed to load data</p>;
  }

  const { results = [], count } = data;

  const columns = [
    {
      header: "Borrower",
      cell: ({ row }) => <Address address={row.borrower} />,
      cellSize: "minmax(140px, auto)",
      sticky: true,
    },
    {
      header: "Collateral",
      cell: ({ row }) => (
        <CurrencyValue
          value={row.collateral}
          currencySymbol={row.collateral_token_symbol}
          currencyAddress={row.collateral_token_address}
        />
      ),
      smallCell: ({ row }) => <Value value={row.collateral_usd} prefix="$" />,
      headerAlign: "end",
      cellAlign: "end",
      orderField: "collateral",
    },
    {
      header: "Debt",
      cell: ({ row }) => (
        <CurrencyValue
          value={row.debt}
          currencySymbol={row.quote_token_symbol}
          currencyAddress={row.quote_token_address}
        />
      ),
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

  const footerRow = (
    <div className="text-xs text-gray-13 text-end">
      USD prices are calculated using market price at kick time
    </div>
  );

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
      footerRow={footerRow}
    />
  );
};

export default AuctionsSettled;

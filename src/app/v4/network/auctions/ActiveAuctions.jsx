import { useState } from "react";
import { faGavel } from "@fortawesome/free-solid-svg-icons";
import { useFetch, usePageTitle, useLinkBuilder } from "@/hooks";
import Table from "@/components/table/Table";
import Value from "@/components/value/Value";
import CurrencyValue from "@/components/value/CurrencyValue";
import HoursMinutes from "@/components/dateTime/HoursMinutes";
import { DateTime } from "luxon";
import { parseUTCDateTime } from "@/utils/datetime";
import Address from "@/components/address/Address";
import PoolName from "@/components/poolName/PoolName";

const ActiveAuctions = () => {
  usePageTitle("Active Auctions");
  const buildLink = useLinkBuilder();
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
      header: "Pool",
      cell: ({ row }) => (
        <PoolName
          collateralSymbol={row.collateral_token_symbol}
          collateralAddress={row.collateral_token_address}
          quoteSymbol={row.quote_token_symbol}
          quoteAddress={row.quote_token_address}
        />
      ),
      cellSize: "1.5fr",
    },
    {
      header: "Borrower",
      cell: ({ row }) => <Address address={row.borrower} />,
    },
    {
      header: "Time Remaining",
      cell: ({ row }) => {
        const dt = parseUTCDateTime(row.kick_time).plus({ hours: 72 });
        if (dt.toUnixInteger() < DateTime.now().toUnixInteger()) {
          return <>-</>;
        }
        return <HoursMinutes dateTime={dt} />;
      },
      smallCell: ({ row }) => {
        const dt = parseUTCDateTime(row.kick_time).plus({ hours: 72 });
        if (dt.toUnixInteger() < DateTime.now().toUnixInteger()) {
          return <span className="text-sm text-gray-6">Available to settle</span>;
        }
      },
      headerAlign: "end",
      cellAlign: "end",
    },
    {
      header: "LUP",
      cell: ({ row }) => (
        <CurrencyValue
          value={row.lup}
          currencySymbol={row.quote_token_symbol}
          currencyAddress={row.quote_token_address}
        />
      ),
      smallCell: ({ row }) => <Value value={row.lup_usd} prefix="$" />,
      headerAlign: "end",
      cellAlign: "end",
    },

    {
      header: "Collateral Remaining",
      cell: ({ row }) => (
        <CurrencyValue
          value={row.collateral_remaining}
          currencySymbol={row.collateral_token_symbol}
          currencyAddress={row.collateral_token_address}
        />
      ),
      smallCell: ({ row }) => <Value value={row.collateral_remaining_usd} prefix="$" />,
      headerAlign: "end",
      cellAlign: "end",
    },
    {
      header: "Debt Remaining",
      cell: ({ row }) => (
        <CurrencyValue
          value={row.debt_remaining}
          currencySymbol={row.quote_token_symbol}
          currencyAddress={row.quote_token_address}
        />
      ),
      smallCell: ({ row }) => <Value value={row.debt_remaining_usd} prefix="$" />,
      headerAlign: "end",
      cellAlign: "end",
    },
  ];

  const footerRow = (
    <div className="text-xs text-gray-13 text-end">
      USD prices are caclualted using market price at kick time
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
      emptyIcon={faGavel}
      emptyTitle="No Auctions"
      emptyContent="There are no active auctions"
      linkTo={(row) => buildLink(`auctions/${row.uid}`)}
      footerRow={footerRow}
    />
  );
};

export default ActiveAuctions;

import { useState } from "react";
import { faGavel } from "@fortawesome/free-solid-svg-icons";
import { useFetch, usePageTitle, useLinkBuilder } from "@/hooks";
import Table from "@/components/table/Table";
import Value from "@/components/value/Value";
import HoursMinutes from "@/components/dateTime/HoursMinutes";
import { DateTime } from "luxon";
import CryptoIcon from "@/components/icon/CryptoIcon";
import { parseUTCDateTime } from "@/utils/datetime";
import Address from "@/components/address/Address";

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
        <>
          <span className="relative hidden sm:flex">
            <CryptoIcon name={row.collateral_token_symbol} className="z-10" />
            <CryptoIcon
              name={row.quote_token_symbol}
              className="relative left-[-10px] z-0"
            />
          </span>
          <span className="font-medium">
            {row.collateral_token_symbol} / {row.quote_token_symbol}
          </span>
        </>
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
      visibleAfter: "sm",
    },
    {
      header: "LUP",
      cell: ({ row }) => <Value value={row.lup} suffix={row.quote_token_symbol} />,
      headerAlign: "end",
      cellAlign: "end",
    },

    {
      header: "Collateral Remaining",
      cell: ({ row }) => (
        <Value value={row.collateral_remaining} suffix={row.collateral_token_symbol} />
      ),
      headerAlign: "end",
      cellAlign: "end",
    },
    {
      header: "Debt Remaining",
      cell: ({ row }) => (
        <Value value={row.debt_remaining} suffix={row.quote_token_symbol} />
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
      linkTo={(row) => buildLink(`auctions/${row.uid}`)}
    />
  );
};

export default ActiveAuctions;

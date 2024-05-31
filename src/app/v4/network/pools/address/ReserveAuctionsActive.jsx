import { useState } from "react";
import { faGavel } from "@fortawesome/free-solid-svg-icons";
import { useFetch, useLinkBuilder } from "@/hooks";
import Table from "@/components/table/Table";
import CurrencyValue from "@/components/value/CurrencyValue";
import HoursMinutes from "@/components/dateTime/HoursMinutes";
import { parseUTCDateTime } from "@/utils/datetime";
import { AJNA_TOKEN_ADDRESS } from "@/utils/constants";

const ReserveAuctionsActive = ({ poolAddress }) => {
  const buildLink = useLinkBuilder();
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState("-kick_datetime");

  const {
    data = {},
    error,
    isLoading,
  } = useFetch(`/pools/${poolAddress}/reserve-auctions/active/`, {
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
      header: "Time Remaining",
      cell: ({ row }) => (
        <HoursMinutes
          dateTime={parseUTCDateTime(row.kick_datetime).plus({ hours: 72 })}
        />
      ),
      orderField: "kick_datetime",
    },
    {
      header: "Claimable Reserves Remaining",
      cell: ({ row }) => (
        <CurrencyValue
          value={row.claimable_reserves_remaining}
          currencySymbol={row.quote_token_symbol}
          currencyAddress={row.quote_token_address}
        />
      ),
      smallCell: ({ row }) => (
        <>
          <span className="pe-1">Total:</span>
          <CurrencyValue
            value={row.claimable_reserves}
            currencySymbol={row.quote_token_symbol}
            currencyAddress={row.quote_token_address}
          />
        </>
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: "claimable_reserves_remaining",
    },
    {
      header: "Est. Auction Price",
      cell: ({ row }) => (
        <CurrencyValue
          value={row.auction_price}
          currencySymbol="AJNA"
          currencyAddress={AJNA_TOKEN_ADDRESS}
          network="ethereum"
          dashIfZero
        />
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: "last_take_price",
    },
    {
      header: "Last Take Price",
      cell: ({ row }) => (
        <CurrencyValue
          value={row.take_count > 0 ? row.last_take_price : 0}
          currencySymbol="AJNA"
          currencyAddress={AJNA_TOKEN_ADDRESS}
          network="ethereum"
          dashIfZero
        />
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: "last_take_price",
    },
    {
      header: "# Takes",
      cell: ({ row }) => <>{row.take_count}</>,
      headerAlign: "end",
      cellAlign: "end",
      orderField: "take_count",
    },
    {
      header: "🔥",
      cell: ({ row }) => (
        <CurrencyValue
          value={row.ajna_burned}
          currencySymbol="AJNA"
          currencyAddress={AJNA_TOKEN_ADDRESS}
          network="ethereum"
        />
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: "ajna_burned",
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
      emptyTitle="No Active Reserve Auctions"
      emptyContent="There are no active reserve auctions"
      linkTo={(row) => buildLink(`reserve-auctions/${row.uid}`)}
    />
  );
};

export default ReserveAuctionsActive;

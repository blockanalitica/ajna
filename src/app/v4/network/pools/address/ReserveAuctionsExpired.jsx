import { useState } from "react";
import { DateTime } from "luxon";
import DateTimeAgo from "@/components/dateTime/DateTimeAgo";
import { faGavel } from "@fortawesome/free-solid-svg-icons";
import { useFetch, useLinkBuilder } from "@/hooks";
import Table from "@/components/table/Table";
import CurrencyValue from "@/components/value/CurrencyValue";
import { AJNA_TOKEN_ADDRESS } from "@/utils/constants";

const ReserveAuctionsExpired = ({ poolAddress }) => {
  const buildLink = useLinkBuilder();
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState("-block_number");

  const {
    data = {},
    error,
    isLoading,
  } = useFetch(`/pools/${poolAddress}/reserve-auctions/expired/`, {
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
      header: "Claimed Reserves",
      cell: ({ row }) => (
        <CurrencyValue
          value={row.claimable_reserves}
          currencySymbol={row.quote_token_symbol}
          currencyAddress={row.quote_token_address}
        />
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: "claimable_reserves",
    },
    {
      header: "Last Take Price",
      cell: ({ row }) => (
        <CurrencyValue
          value={row.take_count > 0 ? row.last_take_price : 0}
          currencySymbol="AJNA"
          currencyAddress={AJNA_TOKEN_ADDRESS}
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
        />
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: "ajna_burned",
    },
    {
      header: "Start Time",
      cell: ({ row }) => (
        <DateTimeAgo dateTime={DateTime.fromISO(row.block_datetime)} />
      ),
      smallCell: ({ row }) => <>{row.block_number}</>,
      headerAlign: "end",
      cellAlign: "end",
      orderField: "block_number",
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
      emptyTitle="No Expired Reserve Auctions"
      emptyContent="There are no expired reserve auctions"
      linkTo={(row) => buildLink(`reserve-auctions/${row.uid}`)}
    />
  );
};

export default ReserveAuctionsExpired;

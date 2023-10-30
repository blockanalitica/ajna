import { useState } from "react";
import { faGavel } from "@fortawesome/free-solid-svg-icons";
import { useFetch, usePageTitle, useLinkBuilder } from "@/hooks";
import Table from "@/components/table/Table";
import Value from "@/components/value/Value";
import PoolName from "@/components/poolName/PoolName";

const ExpiredReserveAuctions = () => {
  usePageTitle("Expired Reserve Auctions");
  const buildLink = useLinkBuilder();
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState("-block_number");

  const {
    data = {},
    error,
    isLoading,
  } = useFetch("/reserve-auctions/expired/", {
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
          quoteSymbol={row.quote_token_symbol}
        />
      ),
      cellSize: "1.5fr",
      orderField: "pool_address",
    },
    {
      header: "Claimed Reserves",
      cell: ({ row }) => (
        <Value value={row.claimable_reserves} suffix={row.quote_token_symbol} />
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: "claimable_reserves",
    },
    {
      header: "Last Take Price",
      cell: ({ row }) => (
        <Value
          value={row.take_count > 0 ? row.last_take_price : 0}
          suffix="AJNA"
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
      cell: ({ row }) => <Value value={row.ajna_burned} suffix="AJNA" />,
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
      emptyTitle="No Expired Reserve Auctions"
      emptyContent="There are no expired reserve auctions"
      linkTo={(row) => buildLink(`reserve-auctions/${row.uid}`)}
    />
  );
};

export default ExpiredReserveAuctions;

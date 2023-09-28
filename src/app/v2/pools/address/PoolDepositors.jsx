import { useState } from "react";
import { useFetch, useLinkBuilder } from "@/hooks";
import { DateTime } from "luxon";
import Table from "@/components/table/Table";
import { shorten } from "@/utils/address";
import Value from "@/components/value/Value";
import ValueChange from "@/components/value/ValueChange";
import InlineSelect from "@/components/select/InlineSelect";
import Info from "@/components/info/Info";
import DateTimeAgo from "@/components/dateTime/DateTimeAgo";

const PoolDepositors = ({ address, daysAgo }) => {
  const buildLink = useLinkBuilder();
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState("-supply");
  const [isPriceUsd, setIsPriceUsd] = useState(false);

  const {
    data = {},
    error,
    isLoading,
  } = useFetch(`/pools/${address}/positions/`, {
    p: page,
    p_size: pageSize,
    order,
    days_ago: daysAgo,
    type: "depositor",
  });

  if (error) {
    return <p>Failed to load data</p>;
  }

  const priceOptions = [
    { key: "token", value: "Token" },
    { key: "usd", value: "USD" },
  ];

  const onPriceOptionChange = (event) => {
    setIsPriceUsd(event.target.value === "usd");
  };

  const footerRow = (
    <div className="text-sm text-right">
      Prices shown in{" "}
      <InlineSelect
        options={priceOptions}
        value={isPriceUsd ? "usd" : "token"}
        onChange={onPriceOptionChange}
      />
    </div>
  );

  const { results, count } = data;

  const columns = [
    {
      header: "Wallet",
      cell: ({ row }) => <>{shorten(row.wallet_address)}</>,
    },
    {
      header: "Deposited",
      cell: ({ row }) => (
        <>
          {isPriceUsd ? (
            <Value value={row.supply_usd} prefix="$" />
          ) : (
            <Value value={row.supply} suffix={row.quote_token_symbol} />
          )}
        </>
      ),
      smallCell: ({ row }) => (
        <>
          {isPriceUsd ? (
            <ValueChange value={row.supply_usd - row.prev_supply_usd} prefix="$" />
          ) : (
            <ValueChange
              value={row.supply - row.prev_supply}
              suffix={row.quote_token_symbol}
            />
          )}
        </>
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: "supply",
    },
    {
      header: (
        <span>
          Deposit Share
          <Info className="ms-2" title="Deposit Share">
            Share (in %) of the total deposit into the pool. Calculated as wallet
            deposit in USD divided by total pool size in USD.
          </Info>
        </span>
      ),
      cell: ({ row }) => (
        <Value value={row.supply_share * 100} decimals={2} suffix="%" dashIfZero />
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: "supply_share",
    },
    {
      header: "Latest Activity",
      cell: ({ row }) => <DateTimeAgo dateTime={DateTime.fromISO(row.last_activity)} />,
      headerAlign: "end",
      cellAlign: "end",
      orderField: "last_activity",
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
      keyField="wallet_address"
      columns={columns}
      linkTo={(row) => buildLink(`/wallets/${row.wallet_address}`)}
      footerRow={footerRow}
      emptyTitle="No Wallets"
      emptyContent="There are no wallets"
    />
  );
};

export default PoolDepositors;

import { useState } from "react";
import { useFetch, useLinkBuilder } from "@/hooks";
import { DateTime } from "luxon";
import Table from "@/components/table/Table";
import Address from "@/components/address/Address";
import Value from "@/components/value/Value";
import CurrencyValue from "@/components/value/CurrencyValue";
import ValueChange from "@/components/value/ValueChange";
import InlineSelect from "@/components/select/InlineSelect";
import Info from "@/components/info/Info";
import DateTimeAgo from "@/components/dateTime/DateTimeAgo";

const Depositors = ({ address, daysAgo, search, onlyClosed }) => {
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
    closed: onlyClosed,
    search,
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
      cell: ({ row }) => <Address address={row.wallet_address} />,
    },
    {
      header: "Deposited",
      cell: ({ row }) => (
        <>
          {isPriceUsd ? (
            <Value value={row.supply_usd} prefix="$" />
          ) : (
            <CurrencyValue
              value={row.supply}
              currencySymbol={row.quote_token_symbol}
              currencyAddress={row.quote_token_address}
            />
          )}
        </>
      ),
      smallCell: ({ row }) => (
        <>
          {isPriceUsd ? (
            <ValueChange value={row.supply_usd - row.prev_supply_usd} prefix="$" />
          ) : (
            <CurrencyValue
              value={row.supply - row.prev_supply}
              currencySymbol={row.quote_token_symbol}
              currencyAddress={row.quote_token_address}
              trend
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
            deposit divided by total pool buckets deposit (quote + collateral).
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
      header: "Earliest Activity",
      cell: ({ row }) => (
        <DateTimeAgo dateTime={DateTime.fromISO(row.first_activity)} />
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: "first_activity",
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

export default Depositors;

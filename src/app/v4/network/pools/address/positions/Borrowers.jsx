import { faInfinity } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { DateTime } from "luxon";
import { useFetch, useLinkBuilder } from "@/hooks";
import Table from "@/components/table/Table";
import Address from "@/components/address/Address";
import Value from "@/components/value/Value";
import CurrencyValue from "@/components/value/CurrencyValue";
import ValueChange from "@/components/value/ValueChange";
import InlineSelect from "@/components/select/InlineSelect";
import Info from "@/components/info/Info";
import DateTimeAgo from "@/components/dateTime/DateTimeAgo";
import Tag from "@/components/tags/Tag";

const Borrowers = ({ address, daysAgo, search, onlyClosed }) => {
  const buildLink = useLinkBuilder();
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState("-debt");
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
    type: "borrower",
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
      smallCell: ({ row }) => (
        <>{row.in_liquidation ? <Tag size="xs">In Liquidation</Tag> : null}</>
      ),
    },
    {
      header: "Collateral",
      cell: ({ row }) => (
        <>
          {isPriceUsd ? (
            <Value value={row.collateral_usd} prefix="$" />
          ) : (
            <CurrencyValue
              value={row.collateral}
              currencySymbol={row.collateral_token_symbol}
              currencyAddress={row.collateral_token_address}
            />
          )}
        </>
      ),
      smallCell: ({ row }) => (
        <>
          {isPriceUsd ? (
            <ValueChange
              value={row.collateral_usd - row.prev_collateral_usd}
              prefix="$"
            />
          ) : (
            <CurrencyValue
              value={row.collateral - row.prev_collateral}
              currencySymbol={row.collateral_token_symbol}
              currencyAddress={row.collateral_token_address}
              trend
            />
          )}
        </>
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: "collateral",
    },
    {
      header: "Debt",
      cell: ({ row }) => (
        <>
          {isPriceUsd ? (
            <Value value={row.debt_usd} prefix="$" />
          ) : (
            <CurrencyValue
              value={row.debt}
              currencySymbol={row.quote_token_symbol}
              currencyAddress={row.quote_token_address}
            />
          )}
        </>
      ),
      smallCell: ({ row }) => (
        <>
          {isPriceUsd ? (
            <ValueChange value={row.debt_usd - row.prev_debt_usd} prefix="$" />
          ) : (
            <CurrencyValue
              value={row.debt - row.prev_debt}
              currencySymbol={row.quote_token_symbol}
              currencyAddress={row.quote_token_address}
              trend
            />
          )}
        </>
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: "debt",
    },
    {
      header: (
        <span>
          Debt Share
          <Info className="ms-2" title="Debt Share">
            Share (in %) of the total debt of the pool. Calculated as wallet debt in USD
            divided by total pool debt in USD.
          </Info>
        </span>
      ),
      cell: ({ row }) => (
        <Value value={row.debt_share * 100} decimals={2} suffix="%" dashIfZero />
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: "debt_share",
    },
    {
      header: (
        <span>
          Health Rate
          <Info className="ms-2" title="Health Rate">
            Calculated as LUP / (loan debt / loan collateral * 0.04). If value is &lt;1,
            loan is undercollateralized and can be Kicked into auction.
          </Info>
        </span>
      ),
      cell: ({ row }) => (
        <>
          {row.health_rate ? (
            <Value value={row.health_rate} />
          ) : (
            <FontAwesomeIcon icon={faInfinity} />
          )}
        </>
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: "health_rate",
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
        linkTo={(row) => buildLink(`/wallets/${row.wallet_address}`)}
        footerRow={footerRow}
        emptyTitle="No Wallets"
        emptyContent="There are no wallets"
      />
    </>
  );
};

export default Borrowers;

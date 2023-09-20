import { faInfinity } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useFetch, useLinkBuilder } from "@/hooks";
import Table from "@/components/table/Table";
import { shorten } from "@/utils/address";
import Value from "@/components/value/Value";
import ValueChange from "@/components/value/ValueChange";
import InlineSelect from "@/components/select/InlineSelect";
import Info from "@/components/info/Info";

const PoolBorrowers = ({ address, daysAgo }) => {
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
      header: "Collateral",
      cell: ({ row }) => (
        <>
          {isPriceUsd ? (
            <Value value={row.collateral_usd} prefix="$" />
          ) : (
            <Value value={row.collateral} suffix={row.collateral_token_symbol} />
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
            <ValueChange
              value={row.collateral - row.prev_collateral}
              suffix={row.collateral_token_symbol}
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
            <Value value={row.debt} suffix={row.quote_token_symbol} />
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
      header: "Health Rate",
      cell: ({ row }) => (
        <>
          {row.health_rate ? (
            <Value value={row.health_rate} decimals={3} />
          ) : (
            <FontAwesomeIcon icon={faInfinity} />
          )}
        </>
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: "health_rate",
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

export default PoolBorrowers;
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { faCalendarDays, faInfinity } from "@fortawesome/free-solid-svg-icons";
import { useFetch, useLinkBuilder } from "@/hooks";
import Table from "@/components/table/Table";
import Value from "@/components/value/Value";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CryptoIcon from "@/components/icon/CryptoIcon";
import InlineSelect from "@/components/select/InlineSelect";
import Info from "@/components/info/Info";

const Pools = ({ address, ...rest }) => {
  const buildLink = useLinkBuilder();
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState("-debt");
  const [isPriceUsd, setIsPriceUsd] = useState(false);

  const {
    data = {},
    error,
    isLoading,
  } = useFetch(`/wallets/${address}/pools/`, {
    p: page,
    p_size: pageSize,
    order,
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
      header: "Pool",
      cell: ({ row }) => (
        <>
          <Link
            to={buildLink(`/pools/${row.pool_address}`)}
            className="text-purple-6 hover:underline flex"
          >
            <span className="flex">
              <CryptoIcon name={row.collateral_token_symbol} className="z-10" />
              <CryptoIcon
                name={row.quote_token_symbol}
                className="relative left-[-10px] z-0"
              />
            </span>
            {row.collateral_token_symbol} / {row.quote_token_symbol}
          </Link>
        </>
      ),
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
    <div {...rest}>
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-xl md:text-1xl xl:text-2xl mb-5">Pools</h1>
      </div>
      <Table
        data={results}
        keyField="id"
        columns={columns}
        currentPage={page}
        pageSize={pageSize}
        totalRecords={count}
        onPageChange={setPage}
        onOrderChange={setOrder}
        currentOrder={order}
        isLoading={isLoading}
        emptyIcon={faCalendarDays}
        emptyTitle="No pools"
        emptyContent="There are no pools"
        placeholderRows={pageSize}
        footerRow={footerRow}
      />
    </div>
  );
};

export default Pools;

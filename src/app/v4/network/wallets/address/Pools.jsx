import { useState } from "react";
import { faCalendarDays, faInfinity } from "@fortawesome/free-solid-svg-icons";
import { useFetch, useLinkBuilder } from "@/hooks";
import Table from "@/components/table/Table";
import Value from "@/components/value/Value";
import CurrencyValue from "@/components/value/CurrencyValue";
import ValueChange from "@/components/value/ValueChange";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InlineSelect from "@/components/select/InlineSelect";
import Info from "@/components/info/Info";
import Tag from "@/components/tags/Tag";
import PoolName from "@/components/poolName/PoolName";

const Pools = ({ address, block, daysAgo, ...rest }) => {
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
    block,
    days_ago: daysAgo,
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
        <PoolName
          collateralSymbol={row.collateral_token_symbol}
          collateralAddress={row.collateral_token_address}
          quoteSymbol={row.quote_token_symbol}
          quoteAddress={row.quote_token_address}
        />
      ),
      cellSize: "minmax(120px, auto)",
      sticky: true,
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
            Calculated as LUP / (loan debt / loan collateral * 0.04). If value is &lt;1, loan
            is undercollateralized and can be Kicked into auction.
          </Info>
        </span>
      ),
      cell: ({ row }) => (
        <>
          {row.in_liquidation ? (
            <Tag size="md">In Liquidation</Tag>
          ) : (
            <>
              {row.health_rate ? (
                <Value value={row.health_rate} />
              ) : (
                <FontAwesomeIcon icon={faInfinity} />
              )}
            </>
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
        keyField="pool_address"
        linkTo={(row) => buildLink(`wallets/${address}/${row.pool_address}`)}
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

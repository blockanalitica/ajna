"use client";

import CryptoIcon from "@/components/icon/CryptoIcon";
import InlineSelect from "@/components/select/InlineSelect";
import Table from "@/components/table/Table";
import Value from "@/components/value/Value";
import ValueChange from "@/components/value/ValueChange";
import { useState } from "react";

const PoolsTable = ({ ...rest }) => {
  const [isPriceUsd, setIsPriceUsd] = useState(false);

  const columns = [
    {
      header: "#",
      cell: ({ index }) => (
        <span className="font-syncopate text-gray-7">{index + 1}</span>
      ),
    },
    {
      header: "Collateral / Quote",
      cell: ({ row }) => (
        <>
          <span className="relative flex">
            <CryptoIcon name={row.collateral_token_symbol} className="z-10" />
            <CryptoIcon
              name={row.quote_token_symbol}
              className="relative left-[-10px] z-0"
            />
          </span>
          <span className="font-medium pl-4">
            {row.collateral_token_symbol} / {row.quote_token_symbol}
          </span>
        </>
      ),
    },
    {
      header: "Collateral",
      cell: ({ row }) => (
        <>
          {isPriceUsd ? (
            <Value value={row.pledged_collateral_usd} prefix="$" />
          ) : (
            <Value
              value={row.pledged_collateral}
              suffix={row.collateral_token_symbol}
            />
          )}
        </>
      ),
      smallCell: ({ row }) => (
        <>
          {isPriceUsd ? (
            <ValueChange
              value={row.pledged_collateral_usd - row.prev_pledged_collateral_usd}
              prefix="$"
            />
          ) : (
            <ValueChange
              value={row.pledged_collateral - row.prev_pledged_collateral}
              suffix={row.collateral_token_symbol}
            />
          )}
        </>
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: "pledged_collateral",
    },
    {
      header: "Quote",
      cell: ({ row }) => (
        <>
          {isPriceUsd ? (
            <Value value={row.pool_size_usd} prefix="$" />
          ) : (
            <Value value={row.pool_size} suffix={row.quote_token_symbol} />
          )}
        </>
      ),
      smallCell: ({ row }) => (
        <>
          {isPriceUsd ? (
            <ValueChange
              value={row.pool_size_usd - row.prev_pool_size_usd}
              prefix="$"
            />
          ) : (
            <ValueChange
              value={row.pool_size - row.prev_pool_size}
              suffix={row.quote_token_symbol}
            />
          )}
        </>
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: "pool_size",
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
      smallCell: ({ row }) => (
        <>
          {isPriceUsd ? (
            <ValueChange value={row.debt_usd - row.prev_debt_usd} prefix="$" />
          ) : (
            <ValueChange
              value={row.debt - row.prev_debt}
              suffix={row.quote_token_symbol}
            />
          )}
        </>
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: "debt",
    },
    {
      header: "TVL",
      cell: ({ row }) => (
        <div className="flex flex-col items-end">
          <Value value={row.tvl} prefix="$" />
          <ValueChange value={row.tvl - row.prev_tvl} small prefix={"$"} />
        </div>
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: "tvl",
    },
    {
      header: "Lend APR",
      cell: ({ row }) => (
        <div className="flex flex-col items-end">
          <Value value={row.lend_rate * 100} suffix="%" />
          <ValueChange
            value={(row.lend_rate - row.prev_lend_rate) * 100}
            small
            suffix={"%"}
          />
        </div>
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: "lend_rate",
    },
    {
      header: "Borrow APR",
      cell: ({ row }) => (
        <div className="flex flex-col items-end">
          <Value value={row.borrow_rate * 100} suffix="%" />
          <ValueChange
            value={(row.borrow_rate - row.prev_borrow_rate) * 100}
            small
            suffix={"%"}
          />
        </div>
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: "borrow_rate",
    },
    {
      header: "🔥",
      cell: ({ row }) => (
        <div className="flex flex-col items-end">
          <Value value={row.total_ajna_burned} suffix="AJNA" />
          <ValueChange
            value={row.total_ajna_burned - row.prev_total_ajna_burned}
            small
          />
        </div>
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: "total_ajna_burned",
    },
  ];

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
  return (
    <Table
      keyField="address"
      columns={columns}
      gridColumnClassName="grid-cols-table-pools"
      href={(row) => `/pools/${row.address}`}
      footerRow={footerRow}
      {...rest}
    />
  );
};

export default PoolsTable;

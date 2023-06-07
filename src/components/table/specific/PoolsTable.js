"use client";

import CryptoIcon from "@/components/icon/CryptoIcon";
import Table from "@/components/table/Table";
import Value from "@/components/value/Value";
import ValueChange from "@/components/value/ValueChange";

const PoolsTable = ({ ...rest }) => {
  const columns = [
    {
      header: "#",
      cell: ({ index }) => <>{index + 1}</>,
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
        <div className="flex flex-col items-end">
          <div className="flex">
            <Value
              value={row.pledged_collateral}
              decimals={2}
              compact
              suffix={row.collateral_token_symbol}
            />
            <ValueChange
              value={row.pledged_collateral - row.prev_pledged_collateral}
              decimals={2}
              compact
              hideIfZero
              className="ml-2"
            />
          </div>
          <div className="flex text-gray-6 text-xs">
            <Value value={row.pledged_collateral_usd} prefix="$" decimals={2} compact />
            <ValueChange
              value={row.pledged_collateral_usd - row.prev_pledged_collateral_usd}
              decimals={2}
              compact
              hideIfZero
              className="ml-2"
            />
          </div>
        </div>
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: "pledged_collateral",
    },
    {
      header: "Quote",
      cell: ({ row }) => (
        <div className="flex flex-col items-end">
          <div className="flex">
            <Value
              value={row.pool_size}
              decimals={2}
              compact
              suffix={row.quote_token_symbol}
            />
            <ValueChange
              value={row.pool_size - row.prev_pool_size}
              decimals={2}
              compact
              hideIfZero
              className="ml-2"
            />
          </div>
          <div className="flex text-gray-6 text-xs">
            <Value value={row.pool_size_usd} prefix="$" decimals={2} compact />
            <ValueChange
              value={row.pool_size_usd - row.prev_pool_size_usd}
              decimals={2}
              compact
              hideIfZero
              className="ml-2"
            />
          </div>
        </div>
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: "pool_size",
    },
    {
      header: "Debt",
      cell: ({ row }) => (
        <div className="flex flex-col items-end">
          <div className="flex">
            <Value
              value={row.debt}
              decimals={2}
              compact
              suffix={row.quote_token_symbol}
            />
            <ValueChange
              value={row.debt - row.prev_debt}
              decimals={2}
              compact
              hideIfZero
              className="ml-2"
            />
          </div>
          <div className="flex text-gray-6 text-xs">
            <Value value={row.debt_usd} prefix="$" decimals={2} compact />
            <ValueChange
              value={row.debt_usd - row.prev_debt_usd}
              decimals={2}
              compact
              hideIfZero
              className="ml-2"
            />
          </div>
        </div>
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: "debt",
    },
    {
      header: "TVL",
      cell: ({ row }) => (
        <div className="flex flex-col items-end">
          <Value value={row.tvl} decimals={2} prefix="$" compact />
          <ValueChange
            value={row.tvl - row.prev_tvl}
            decimals={2}
            compact
            hideIfZero
            small
          />
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
          <Value value={row.lend_rate * 100} decimals={2} suffix="%" />
          <ValueChange
            value={(row.lend_rate - row.prev_lend_rate) * 100}
            decimals={2}
            compact
            hideIfZero
            small
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
          <Value value={row.borrow_rate * 100} decimals={2} suffix="%" />
          <ValueChange
            value={(row.borrow_rate - row.prev_borrow_rate) * 100}
            decimals={2}
            compact
            hideIfZero
            small
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
          <Value value={row.total_ajna_burned} suffix="AJNA" decimals={2} />
          <ValueChange
            value={row.total_ajna_burned - row.prev_total_ajna_burned}
            decimals={2}
            compact
            hideIfZero
            small
          />
        </div>
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: "total_ajna_burned",
    },
  ];

  return (
    <Table
      keyField="address"
      columns={columns}
      gridColumnClassName="grid-cols-table-pools"
      href={(row) => `/pools/${row.address}`}
      {...rest}
    />
  );
};

export default PoolsTable;

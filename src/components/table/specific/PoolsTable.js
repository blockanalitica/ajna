"use client";

import CryptoIcon from "@/components/icon/CryptoIcon";
import Tag from "@/components/tags/Tag";
import Value from "@/components/value/Value";
import ValueChange from "@/components/value/ValueChange";
import Table from "@/components/table/Table";

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
            <ValueChange value={1} decimals={2} compact hideIfZero className="ml-2" />
          </div>
          <div className="flex text-gray-6 text-xs">
            <Value
              value={row.pledged_collateral * row.collateral_token_underlying_price}
              prefix="$"
              decimals={2}
              compact
            />
            <ValueChange
              value={1}
              decimals={2}
              compact
              hideIfZero
              className="ml-2"
              prefix="$"
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
            <ValueChange value={0} decimals={2} compact hideIfZero className="ml-2" />
          </div>
          <div className="flex text-gray-6 text-xs">
            <Value
              value={row.pool_size * row.quote_token_underlying_price}
              prefix="$"
              decimals={2}
              compact
            />
            <ValueChange value={0} decimals={2} compact hideIfZero prefix="$" />
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
              value={row.current_debt}
              decimals={2}
              compact
              suffix={row.quote_token_symbol}
            />
            <ValueChange value={0} decimals={2} compact hideIfZero className="ml-2" />
          </div>
          <div className="flex text-gray-6 text-xs">
            <Value
              value={row.current_debt * row.quote_token_underlying_price}
              prefix="$"
              decimals={2}
              compact
            />
            <ValueChange value={0} decimals={2} compact hideIfZero prefix="$" />
          </div>
        </div>
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: "current_debt",
    },
    {
      header: "TVL",
      cell: ({ row }) => (
        <div className="flex flex-col items-end">
          <Value value={row.tvl} decimals={2} prefix="$" compact />
          <ValueChange value={0} decimals={2} prefix="$" compact dashIfZero />
        </div>
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: "tvl",
    },
    {
      header: "APR",
      cell: ({ row }) => (
        <Tag>
          <Value value={row.interest_rate} decimals={2} suffix="%" />
        </Tag>
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: "interest_rate",
    },
    {
      header: "🔥",
      cell: ({ row }) => (
        <div className="flex flex-col items-end">
          <Value value={row.total_ajna_burned} suffix="AJNA" decimals={2} />
          <ValueChange value={0} decimals={2} compact dashIfZero />
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

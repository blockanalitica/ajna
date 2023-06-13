"use client";

import CryptoIcon from "@/components/icon/CryptoIcon";
import Value from "@/components/value/Value";
import ValueChange from "@/components/value/ValueChange";
import Table from "@/components/table/Table";

const TokensTable = ({ ...rest }) => {
  const columns = [
    {
      header: "#",
      cell: ({ index }) => (
        <span className="font-syncopate text-gray-7">{index + 1}</span>
      ),
    },
    {
      header: "Name",
      cell: ({ row }) => (
        <>
          <CryptoIcon name={row.symbol} />
          <span className="font-medium ml-2">
            {row.name}
            <span className="text-gray-13 ml-2">({row.symbol})</span>
          </span>
        </>
      ),
    },
    {
      header: "Price",
      cell: ({ row }) => <Value value={row.underlying_price} prefix="$" />,
      smallCell: ({ row }) => (
        <ValueChange
          value={row.underlying_price - row.prev_underlying_price}
          prefix="$"
        />
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: "price",
    },

    {
      header: "TVL",
      cell: ({ row }) => <Value value={row.tvl} prefix="$" />,
      smallCell: ({ row }) => <ValueChange value={row.tvl - row.prev_tvl} prefix="$" />,
      headerAlign: "end",
      cellAlign: "end",
      orderField: "tvl",
    },
    {
      header: "Pools",
      cell: ({ row }) => <Value value={row.pool_count} decimals={0} />,
      smallCell: ({ row }) => (
        <ValueChange value={row.pool_count - row.prev_pool_count} decimals={0} />
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: "pool_count",
    },
  ];

  return (
    <Table
      keyField="underlying_address"
      columns={columns}
      gridColumnClassName="grid-cols-table-tokens"
      href={(row) => `/tokens/${row.underlying_address}`}
      {...rest}
    />
  );
};

export default TokensTable;

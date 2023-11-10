import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { useLinkBuilder } from "@/hooks";
import CryptoIcon from "@/components/icon/CryptoIcon";
import Table from "@/components/table/Table";
import Value from "@/components/value/Value";
import ValueChange from "@/components/value/ValueChange";

const TokensTable = ({ currentPage = 1, pageSize = 10, ...rest }) => {
  const buildLink = useLinkBuilder();
  const columns = [
    {
      header: "#",
      cell: ({ index }) => (
        <span className="font-syncopate text-gray-7">
          {(currentPage - 1) * pageSize + index + 1}
        </span>
      ),
      cellSize: "0.2fr",
    },
    {
      header: "Name",
      cell: ({ row }) => (
        <>
          <CryptoIcon name={row.symbol} />
          <span className="font-medium ml-2">{row.symbol}</span>
        </>
      ),
      smallCell: ({ row }) => (
        <span className="hidden sm:inline-block ml-8">{row.name}</span>
      ),
      cellSize: "minmax(120px, auto)",
      sticky: true,
    },
    {
      header: "Price",
      cell: ({ row }) => (
        <Value
          value={row.underlying_price}
          prefix="$"
          dashIfZero
          decimals={row.underlying_price < 1 ? 5 : 2}
        />
      ),
      smallCell: ({ row }) => (
        <ValueChange
          value={row.underlying_price - row.prev_underlying_price}
          prefix="$"
          decimals={
            Math.abs(row.underlying_price - row.prev_underlying_price) < 1 ? 5 : 2
          }
        />
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: "price",
    },

    {
      header: "TVL",
      cell: ({ row }) => <Value value={row.tvl} prefix="$" dashIfZero />,
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
      linkTo={(row) => buildLink(`tokens/${row.underlying_address}`)}
      currentPage={currentPage}
      pageSize={pageSize}
      emptyIcon={faCoins}
      emptyTitle="No Tokens"
      emptyContent="There are no tokens"
      {...rest}
    />
  );
};

export default TokensTable;

import CryptoIcon from "@/components/icon/CryptoIcon";
import Table from "@/components/table/Table";
import Value from "@/components/value/Value";
import ValueChange from "@/components/value/ValueChange";
import { NETWORKS_ICON_MAP } from "@/networks";

const NetworksTable = ({ data, ...rest }) => {
  const columns = [
    {
      header: "#",
      cell: ({ index }) => (
        <span className="font-syncopate text-gray-7">{index + 1}</span>
      ),
      cellSize: "0.2fr",
    },
    {
      header: "Network",
      cell: ({ row }) => (
        <>
          <CryptoIcon name={NETWORKS_ICON_MAP[row.network]} />
          <span className="font-medium ml-2">{row.network_name}</span>
        </>
      ),
      cellSize: "minmax(120px, auto)",
      sticky: true,
    },
    {
      header: "Deposited",
      cell: ({ row }) => <Value value={row.supply_usd} prefix="$" dashIfZero />,
      smallCell: ({ row }) => (
        <ValueChange value={row.supply_usd - row.prev_supply_usd} prefix="$" />
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: "supply_usd",
    },
    {
      header: "Borrowed",
      cell: ({ row }) => <Value value={row.debt_usd} prefix="$" dashIfZero />,
      smallCell: ({ row }) => (
        <ValueChange value={row.debt_usd - row.prev_debt_usd} prefix="$" />
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: "debt_usd",
    },
    {
      header: "Collateral",
      cell: ({ row }) => <Value value={row.collateral_usd} prefix="$" dashIfZero />,
      smallCell: ({ row }) => (
        <ValueChange value={row.collateral_usd - row.prev_collateral_usd} prefix="$" />
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: "collateral_usd",
    },
    {
      header: "TVL",
      cell: ({ row }) => <Value value={row.tvl} prefix="$" dashIfZero />,
      smallCell: ({ row }) => <ValueChange value={row.tvl - row.prev_tvl} prefix="$" />,
      headerAlign: "end",
      cellAlign: "end",
      orderField: "tvl",
    },
  ];

  return (
    <Table
      data={data}
      keyField="network"
      columns={columns}
      linkTo={(row) => row.network}
      placeholderRows={5}
      {...rest}
    />
  );
};

export default NetworksTable;

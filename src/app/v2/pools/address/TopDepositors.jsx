import { useFetch, useLinkBuilder } from "@/hooks";
import { Link } from "react-router-dom";
import Table from "@/components/table/Table";
import Address from "@/components/address/Address";
import Value from "@/components/value/Value";
import ValueChange from "@/components/value/ValueChange";
import Info from "@/components/info/Info";

const TopDepositors = ({ address, daysAgo }) => {
  const buildLink = useLinkBuilder();

  const {
    data = {},
    error,
    isLoading,
  } = useFetch(`/pools/${address}/positions/`, {
    p: 1,
    p_size: 4,
    order: "-supply",
    days_ago: daysAgo,
    type: "depositor",
  });

  if (error) {
    return <p>Failed to load data</p>;
  }

  const { results, count } = data;

  const columns = [
    {
      header: "Wallet",
      cell: ({ row }) => <Address address={row.wallet_address} />,
    },
    {
      header: "Deposited",
      cell: ({ row }) => <Value value={row.supply} suffix={row.quote_token_symbol} />,
      smallCell: ({ row }) => (
        <ValueChange
          value={row.supply - row.prev_supply}
          suffix={row.quote_token_symbol}
        />
      ),
      headerAlign: "end",
      cellAlign: "end",
    },
    {
      header: (
        <span>
          Share
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
    },
  ];

  const footerRow = (
    <div className="text-center">
      <Link
        className="text-purple-6 hover:underline"
        to={{
          pathname: "positions",
          search: `?type=depositor`,
        }}
      >
        View all ({count})
      </Link>
    </div>
  );
  return (
    <Table
      data={results}
      isLoading={isLoading}
      keyField="wallet_address"
      columns={columns}
      linkTo={(row) => buildLink(`/wallets/${row.wallet_address}`)}
      footerRow={footerRow}
      emptyTitle="No Depositors"
      emptyContent="There are no depositors"
    />
  );
};

export default TopDepositors;

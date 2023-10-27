import { Link } from "react-router-dom";
import { useFetch, useLinkBuilder } from "@/hooks";
import Table from "@/components/table/Table";
import Address from "@/components/address/Address";
import Value from "@/components/value/Value";
import ValueChange from "@/components/value/ValueChange";

const TopBorrowers = ({ address, daysAgo }) => {
  const buildLink = useLinkBuilder();
  const {
    data = {},
    error,
    isLoading,
  } = useFetch(`/pools/${address}/positions/`, {
    p: 1,
    p_size: 4,
    order: "-debt",
    days_ago: daysAgo,
    type: "borrower",
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
      header: "Collateral",
      cell: ({ row }) => (
        <Value value={row.collateral} suffix={row.collateral_token_symbol} />
      ),
      smallCell: ({ row }) => (
        <ValueChange
          value={row.collateral - row.prev_collateral}
          suffix={row.collateral_token_symbol}
        />
      ),
      headerAlign: "end",
      cellAlign: "end",
    },
    {
      header: "Debt",
      cell: ({ row }) => <Value value={row.debt} suffix={row.quote_token_symbol} />,
      smallCell: ({ row }) => (
        <ValueChange value={row.debt - row.prev_debt} suffix={row.quote_token_symbol} />
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
          search: `?type=borrower`,
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
      emptyTitle="No Borrowers"
      emptyContent="There are no borrowers"
    />
  );
};

export default TopBorrowers;

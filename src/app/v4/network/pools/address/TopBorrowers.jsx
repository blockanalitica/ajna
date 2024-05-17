import { Link } from "react-router-dom";
import { useFetch, useLinkBuilder } from "@/hooks";
import Table from "@/components/table/Table";
import Address from "@/components/address/Address";
import CurrencyValue from "@/components/value/CurrencyValue";

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
      sticky: true,
    },
    {
      header: "Collateral",
      cell: ({ row }) => (
        <CurrencyValue
          value={row.collateral}
          currencySymbol={row.collateral_token_symbol}
          currencyAddress={row.collateral_token_address}
        />
      ),
      smallCell: ({ row }) => (
        <CurrencyValue
          value={row.collateral - row.prev_collateral}
          currencySymbol={row.collateral_token_symbol}
          currencyAddress={row.collateral_token_address}
          trend
        />
      ),
      headerAlign: "end",
      cellAlign: "end",
    },
    {
      header: "Debt",
      cell: ({ row }) => (
        <CurrencyValue
          value={row.debt}
          currencySymbol={row.quote_token_symbol}
          currencyAddress={row.quote_token_address}
        />
      ),
      smallCell: ({ row }) => (
        <CurrencyValue
          value={row.debt - row.prev_debt}
          currencySymbol={row.quote_token_symbol}
          currencyAddress={row.quote_token_address}
          trend
        />
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

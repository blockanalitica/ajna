import { useState } from "react";
import { faGavel } from "@fortawesome/free-solid-svg-icons";
import { useFetch, useLinkBuilder } from "@/hooks";
import { Link, useLocation } from "react-router-dom";
import { smartLocationParts } from "@/utils/url";
import Table from "@/components/table/Table";
import Value from "@/components/value/Value";
import CurrencyValue from "@/components/value/CurrencyValue";
import SecondaryButton from "@/components/button/SecondaryButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import Address from "@/components/address/Address";

const AuctionsKicker = ({ poolAddress }) => {
  const location = useLocation();
  const { network } = smartLocationParts(location);
  const buildLink = useLinkBuilder();
  const pageSize = 5;
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState("-debt");

  const {
    data = {},
    error,
    isLoading,
  } = useFetch(`/pools/${poolAddress}/auctions/to-kick/`, {
    p: page,
    p_size: pageSize,
    order,
  });

  if (error) {
    return <p>Failed to load data</p>;
  }

  const { results, count } = data;

  const columns = [
    {
      header: "Borrower",
      cell: ({ row }) => (
        <Link
          to={buildLink(`/wallets/${row.wallet_address}`)}
          className="text-purple-6 hover:underline "
        >
          <Address address={row.wallet_address} />
        </Link>
      ),
      cellSize: "minmax(140px, auto)",
      sticky: true,
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
      smallCell: ({ row }) => <Value value={row.debt_usd} prefix="$" />,
      headerAlign: "end",
      cellAlign: "end",
    },
    {
      header: "Threshold Price",
      cell: ({ row }) => (
        <CurrencyValue
          value={row.threshold_price}
          currencySymbol={row.quote_token_symbol}
          currencyAddress={row.quote_token_address}
        />
      ),
      headerAlign: "end",
      cellAlign: "end",
    },
    {
      header: "LUP",
      cell: ({ row }) => (
        <CurrencyValue
          value={row.lup}
          currencySymbol={row.quote_token_symbol}
          currencyAddress={row.quote_token_address}
        />
      ),
      headerAlign: "end",
      cellAlign: "end",
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
      smallCell: ({ row }) => <Value value={row.collateral_usd} prefix="$" />,
      headerAlign: "end",
      cellAlign: "end",
    },
    {
      header: "",
      cell: ({ row }) => (
        <SecondaryButton
          text={
            <>
              View in app
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                size="xs"
                className="ms-2"
              />
            </>
          }
          href={`https://ajnafi.com/${network}/pools/${row.pool_address}/kicker`}
        />
      ),
      headerAlign: "end",
      cellAlign: "end",
    },
  ];

  const footerRow = (
    <div className="text-xs text-gray-13 text-end">
      USD prices are calculated using market price at current time
    </div>
  );

  return (
    <Table
      data={results}
      currentPage={page}
      pageSize={pageSize}
      totalRecords={count}
      onPageChange={setPage}
      onOrderChange={setOrder}
      currentOrder={order}
      isLoading={isLoading}
      keyField="wallet_address"
      columns={columns}
      emptyIcon={faGavel}
      emptyTitle="No loans to kick"
      emptyContent="There are no loans to kick"
      footerRow={footerRow}
    />
  );
};

export default AuctionsKicker;

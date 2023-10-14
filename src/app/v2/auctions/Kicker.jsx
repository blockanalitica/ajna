import { useState } from "react";
import { faGavel } from "@fortawesome/free-solid-svg-icons";
import { useFetch, usePageTitle, useLinkBuilder } from "@/hooks";
import { Link } from "react-router-dom";
import Table from "@/components/table/Table";
import Value from "@/components/value/Value";
import SecondaryButton from "@/components/button/SecondaryButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import CryptoIcon from "@/components/icon/CryptoIcon";
import Address from "@/components/address/Address";

const Kicker = () => {
  usePageTitle("Active Auctions");
  const buildLink = useLinkBuilder();
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState("-kick_time");

  const {
    data = {},
    error,
    isLoading,
  } = useFetch("/auctions/to-kick/", {
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
      header: "Pool",
      cell: ({ row }) => (
        <>
          <span className="relative hidden sm:flex">
            <CryptoIcon name={row.collateral_token_symbol} className="z-10" />
            <CryptoIcon
              name={row.quote_token_symbol}
              className="relative left-[-10px] z-0"
            />
          </span>
          <span className="font-medium">
            {row.collateral_token_symbol} / {row.quote_token_symbol}
          </span>
        </>
      ),
    },
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
    },
    {
      header: "Debt",
      cell: ({ row }) => <Value value={row.debt} suffix={row.quote_token_symbol} />,
      headerAlign: "end",
      cellAlign: "end",
    },
    {
      header: "LUP",
      cell: ({ row }) => <Value value={row.lup} suffix={row.quote_token_symbol} />,
      headerAlign: "end",
      cellAlign: "end",
    },
    {
      header: "Collateral",
      cell: ({ row }) => (
        <Value value={row.collateral} suffix={row.collateral_token_symbol} />
      ),
      headerAlign: "end",
      cellAlign: "end",
    },
    {
      header: "Collateral",
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
          href={`https://app.ajna.finance/pools/${row.pool_address}/manage`}
        />
      ),
      headerAlign: "end",
      cellAlign: "end",
    },
  ];

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
      keyField="uid"
      columns={columns}
      emptyIcon={faGavel}
      emptyTitle="No loans to kick"
      emptyContent="There are no loans to kick"
    />
  );
};

export default Kicker;

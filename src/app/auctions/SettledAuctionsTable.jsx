import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useFetch, useLinkBuilder } from "@/hooks";
import { shorten } from "@/utils/address";
import { DateTime } from "luxon";
import Table from "@/components/table/Table";
import Value from "@/components/value/Value";
import DateTimeAgo from "@/components/dateTime/DateTimeAgo";
import CryptoIcon from "@/components/icon/CryptoIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileContract } from "@fortawesome/free-solid-svg-icons";
import { generateEtherscanUrl } from "@/utils/url";
import CopyToClipboard from "@/components/copyToClipboard/CopyToClipboard";
import Tooltip from "@/components/tooltip/Tooltip";
import ExternalLink from "@/components/externalLink/ExternalLink";
import { smartLocationParts } from "@/utils/url";

const SettledAuctionsTable = ({ daysAgo }) => {
  const buildLink = useLinkBuilder();
  const location = useLocation();
  const { network } = smartLocationParts(location);
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState("-settle_time");

  const {
    data = {},
    error,
    isLoading,
  } = useFetch("/auctions/settled/", {
    p: page,
    p_size: pageSize,
    order,
    days_ago: daysAgo,
  });

  if (error) {
    return <p>Failed to load data</p>;
  }

  const { results = [], count } = data;

  if (results.length === 0) {
    return null;
  }

  const columns = [
    {
      header: "Pool",
      cell: ({ row }) => (
        <Link
          to={buildLink(`pools/${row.pool_address}`)}
          className="text-purple-6 hover:underline flex"
        >
          <span className="relative hidden md:flex">
            <CryptoIcon name={row.collateral_token_symbol} className="z-10" />
            <CryptoIcon
              name={row.quote_token_symbol}
              className="relative left-[-10px] z-0"
            />
          </span>
          <span className="font-medium md:pl-2">
            {row.collateral_token_symbol} / {row.quote_token_symbol}
          </span>
        </Link>
      ),
      visibleAfter: "sm",
    },
    {
      header: "Borrower",
      cell: ({ row }) => (
        <>
          {shorten(row.wallet_address)}
          <div className="sm:hidden">
            <CopyToClipboard className="ml-3 text-gray-6" text={row.wallet_address} />
          </div>
        </>
      ),
      smallCell: ({ row }) => (
        <>
          <div className="items-center hidden pt-1 sm:flex">
            <ExternalLink href={generateEtherscanUrl(network, row.wallet_address)}>
              <CryptoIcon name="etherscan" size={16} />
            </ExternalLink>
            <CopyToClipboard className="ml-3 mr-3" text={row.wallet_address} />
            {row.borrower !== row.wallet_address ? (
              <ExternalLink href={generateEtherscanUrl(network, row.borrower)}>
                <Tooltip
                  message="View contract on Etherscan"
                  className="w-28"
                  wrapperClassName="flex"
                >
                  <FontAwesomeIcon icon={faFileContract} className="mr-3" />
                </Tooltip>
              </ExternalLink>
            ) : null}
          </div>
          <DateTimeAgo
            dateTime={DateTime.fromSeconds(row.settle_time)}
            className="sm:hidden"
          />
        </>
      ),
    },
    {
      header: "Collateral",
      cell: ({ row }) => (
        <Value value={row.collateral} suffix={row.collateral_token_symbol} />
      ),
      smallCell: ({ row }) => <Value value={row.collateral_usd} prefix="$" />,
      headerAlign: "end",
      cellAlign: "end",
      orderField: "collateral",
    },
    {
      header: "Debt",
      cell: ({ row }) => <Value value={row.debt} suffix={row.quote_token_symbol} />,
      smallCell: ({ row }) => <Value value={row.debt_usd} prefix="$" />,
      headerAlign: "end",
      cellAlign: "end",
      orderField: "debt",
    },
    {
      header: "Settled",
      cell: ({ row }) => (
        <DateTimeAgo dateTime={DateTime.fromSeconds(row.settle_time)} />
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: "settle_time",
      visibleAfter: "sm",
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
    />
  );
};

export default SettledAuctionsTable;

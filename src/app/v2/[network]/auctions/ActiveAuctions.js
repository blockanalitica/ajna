"use client";

import { useState } from "react";
import { faGavel } from "@fortawesome/free-solid-svg-icons";
import { useFetch, usePageTitle } from "@/hooks";
import { shorten } from "@/utils/address";
import { DateTime } from "luxon";
import Table from "@/components/table/Table";
import Value from "@/components/value/Value";
import HoursMinutes from "@/components/dateTime/HoursMinutes";
import SecondaryButton from "@/components/button/SecondaryButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faFileContract,
} from "@fortawesome/free-solid-svg-icons";
import CryptoIcon from "@/components/icon/CryptoIcon";
import CopyToClipboard from "@/components/copyToClipboard/CopyToClipboard";
import { generateEtherscanUrl } from "@/utils/urls";
import { useParams } from "next/navigation";
import Tooltip from "@/components/tooltip/Tooltip";

const ActiveAuctions = () => {
  usePageTitle("Active Auctions");
  const { network } = useParams();
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState("-kick_time");

  const {
    data = {},
    error,
    isLoading,
  } = useFetch("/auctions/active/", {
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
            <a href={generateEtherscanUrl(network, row.wallet_address)} target="_blank">
              <CryptoIcon name="etherscan" size={16} />
            </a>
            <CopyToClipboard className="mx-3" text={row.wallet_address} />
            {row.borrower !== row.wallet_address ? (
              <a href={generateEtherscanUrl(network, row.borrower)} target="_blank">
                <Tooltip
                  message="View contract on Etherscan"
                  className="w-28"
                  wrapperClassName="flex"
                >
                  <FontAwesomeIcon icon={faFileContract} className="mr-3" />
                </Tooltip>
              </a>
            ) : null}
          </div>
          <HoursMinutes
            dateTime={DateTime.fromSeconds(row.kick_time).plus({ hours: 72 })}
            className="sm:hidden"
          />
        </>
      ),
    },
    {
      header: "Time Remaining",
      cell: ({ row }) => (
        <HoursMinutes
          dateTime={DateTime.fromSeconds(row.kick_time).plus({ hours: 72 })}
        />
      ),
      headerAlign: "end",
      cellAlign: "end",
      visibleAfter: "sm",
    },
    {
      header: "Collateral Remaining / Total",
      cell: ({ row }) => (
        <>
          <Value
            value={row.collateral_remaining}
            suffix={row.collateral_token_symbol}
          />
          <span className="hidden sm:inline-flex">
            <span className="px-2">/</span>
            <Value value={row.collateral} suffix={row.collateral_token_symbol} />
          </span>
        </>
      ),
      smallCell: ({ row }) => (
        <Value
          value={row.collateral}
          suffix={row.collateral_token_symbol}
          className="sm:hidden"
        />
      ),
      headerAlign: "end",
      cellAlign: "end",
    },
    {
      header: "Debt Remaining / Total",
      cell: ({ row }) => (
        <>
          <Value value={row.debt_remaining} suffix={row.debt_token_symbol} />
          <span className="hidden sm:inline-flex">
            <span className="px-2">/</span>
            <Value value={row.debt} suffix={row.debt_token_symbol} />
          </span>
        </>
      ),
      smallCell: ({ row }) => (
        <Value
          value={row.debt}
          suffix={row.debt_token_symbol}
          small
          className="sm:hidden"
        />
      ),
      headerAlign: "end",
      cellAlign: "end",
    },
    {
      header: "",
      cell: ({ row }) => (
        <>
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
            href={`https://app.ajna.finance/pools/${row.pool_address}/auctions`}
            target="_blank"
          />
        </>
      ),

      headerAlign: "end",
      cellAlign: "end",
      visibleAfter: "lg",
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
      emptyTitle="No Auctions"
      emptyContent="There are no active auctions"
    />
  );
};

export default ActiveAuctions;

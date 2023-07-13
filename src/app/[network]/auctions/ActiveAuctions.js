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
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import CryptoIcon from "@/components/icon/CryptoIcon";
import CopyToClipboard from "@/components/copyToClipboard/CopyToClipboard";
import { generateEtherscanUrl } from "@/utils/urls";
import { useParams } from "next/navigation";

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
          {shorten(row.borrower)}
          <div className="sm:hidden">
            <CopyToClipboard className="ml-3 text-gray-6" text={row.borrower} />
          </div>
        </>
      ),
      smallCell: ({ row }) => (
        <>
          <div className="items-center hidden sm:flex">
            <a href={generateEtherscanUrl(network, row.borrower)} target="_blank">
              <CryptoIcon name="etherscan" size={16} />
            </a>
            <CopyToClipboard className="ml-3 mr-3" text={row.borrower} />
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

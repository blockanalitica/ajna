"use client";

import { useState } from "react";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { useFetch } from "@/hooks";
import { DateTime } from "luxon";
import Table from "@/components/table/Table";
import DateTimeAgo from "@/components/dateTime/DateTimeAgo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { shorten } from "@/utils/address";
import Select from "@/components/select/Select";
import { generateEtherscanUrl } from "@/utils/urls";
import { useParams } from "next/navigation";
import Link from "next/link";

const PoolEvents = ({ address, ...rest }) => {
  const { network } = useParams();
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState("-order_index");
  const [eventType, setEventType] = useState("all");
  const {
    data = {},
    error,
    isLoading,
  } = useFetch(`/pools/${address}/events/`, {
    p: page,
    p_size: pageSize,
    order,
    name: eventType !== "all" ? eventType : null,
  });

  if (error) {
    return <p>Failed to load data</p>;
  }

  const eventTypeMapping = {
    AddCollateral: "Add Collateral",
    AddQuoteToken: "Add Quote Token",
    AuctionSettle: "Auction Settle",
    BondWithdrawn: "Bond Withdrawn",
    DrawDebt: "Draw Debt",
    Kick: "Kick",
    KickReserveAuction: "Kick Reserve Auction",
    LoanStamped: "Loan Stamped",
    MoveQuoteToken: "Move Quote Token",
    PoolCreated: "Pool Created",
    RemoveCollateral: "Remove Collateral",
    RemoveQuoteToken: "Remove Quote Token",
    RepayDebt: "Repay Debt",
    Settle: "Settle",
    Take: "Take",
    UpdateInterestRate: "Update Interest Rate",
  };

  const eventTypeOptions = [{ key: "all", value: "All" }];
  Object.entries(eventTypeMapping).forEach(([key, value]) => {
    eventTypeOptions.push({ key, value });
  });

  const onEventTypeOptionChange = (event) => {
    setPage(1);
    setEventType(event.target.value);
  };

  const { results, count } = data;

  const columns = [
    {
      header: "Event",
      cell: ({ row }) => <>{eventTypeMapping[row.name]}</>,
    },
    {
      header: "Wallets",
      cell: ({ row }) => (
        <div className="flex flex-col">
          {row.wallet_addresses?.map((address) => (
            <Link
              key={`wallet-link-${address}`}
              href={`/v2/${network}/wallets/${address}`}
              className="text-purple-6 hover:underline flex"
            >
              {shorten(address)}
            </Link>
          ))}
        </div>
      ),
    },
    {
      header: "Event Data",
      cell: ({ row }) => <>{row.data}</>,
    },
    {
      header: "Time",
      cell: ({ row }) => (
        <DateTimeAgo dateTime={DateTime.fromISO(row.block_datetime)} />
      ),
      smallCell: ({ row }) => (
        <>
          {row.block_number}
          <a
            href={generateEtherscanUrl(network, row.transaction_hash, "tx")}
            target="_blank"
            className="ms-2 hover:text-white"
          >
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
          </a>
        </>
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: "order_index",
    },
  ];

  return (
    <div {...rest}>
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-xl md:text-1xl xl:text-2xl mb-5">Activity</h1>
        <div className="text-sm text-gray-6 mb-5">
          Showing:
          <Select
            options={eventTypeOptions}
            value={eventType}
            onChange={onEventTypeOptionChange}
            className="ml-4"
          />
        </div>
      </div>
      <Table
        data={results}
        keyField="order_index"
        columns={columns}
        currentPage={page}
        pageSize={pageSize}
        totalRecords={count}
        onPageChange={setPage}
        onOrderChange={setOrder}
        currentOrder={order}
        isLoading={isLoading}
        emptyIcon={faCalendarDays}
        emptyTitle="No Events"
        emptyContent="There are no events"
        placeholderRows={pageSize}
      />
    </div>
  );
};

export default PoolEvents;

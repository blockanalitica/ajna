"use client";

import { useState } from "react";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { useFetch } from "@/hooks";
import { DateTime } from "luxon";
import Table from "@/components/table/Table";
import Value from "@/components/value/Value";
import DateTimeAgo from "@/components/dateTime/DateTimeAgo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { shorten } from "@/utils/address";
import Select from "@/components/select/Select";

const PoolEvents = ({ address, ...rest }) => {
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState("-tvl");
  const [eventType, setEventType] = useState(null);

  const {
    data = {},
    error,
    isLoading,
  } = useFetch(`/pools/${address}/events/`, {
    p: page,
    p_size: pageSize,
    order,
    type: eventType,
  });

  if (error) {
    return <p>Failed to load data</p>;
  }

  const eventTypeMapping = {
    add_collateral: "Add Collateral",
    remove_collateral: "Remove Collateral",
    add_quote_token: "Add Quote Token",
    remove_quote_token: "Remove Quote Token",
    draw_debt: "Draw Debt",
    repay_debt: "Repay Debt",
  };

  const eventTypeOptions = [{ key: null, value: "All" }];
  Object.entries(eventTypeMapping).forEach(([key, value]) => {
    eventTypeOptions.push({ key, value });
  });

  const onEventTypeOptionChange = (event) => {
    setEventType(event.target.value);
  };

  const { results, count } = data;

  const columns = [
    {
      header: "Event",
      cell: ({ row }) => <>{eventTypeMapping[row.event_type]}</>,
    },
    {
      header: "Amount",
      cell: ({ row }) => <Value value={row.amount} suffix={row.amount_symbol} />,
      headerAlign: "end",
      cellAlign: "end",
      orderField: "amount",
    },
    {
      header: "Collateral",
      cell: ({ row }) => (
        <Value value={row.collateral} suffix={row.collateral_symbol} />
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: "collateral",
    },
    {
      header: "Account",
      cell: ({ row }) => (
        <a
          href={`https://etherscan.io/address/${row.account}`}
          target="_blank"
          className="ms-2 text-purple-6 hover:underline"
        >
          {shorten(row.account)}
          <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="ms-2" size="xs" />
        </a>
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: "account",
    },
    {
      header: "Time",
      cell: ({ row }) => (
        <div>
          <DateTimeAgo dateTime={DateTime.fromSeconds(row.block_timestamp)} />
          <br />
          <span className="text-sm text-gray-10">
            {row.block_number}
            <a
              href={`https://etherscan.io/tx/${row.transaction_hash}`}
              target="_blank"
              className="ms-2 hover:text-white"
            >
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </a>
          </span>
        </div>
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: "block_timestamp",
    },
  ];

  return (
    <div {...rest}>
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl md:text-1xl xl:text-2xl">Events</h1>
        <div className="text-sm text-gray-6">
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
        keyField="id"
        columns={columns}
        gridColumnClassName="grid-cols-table-pool-events"
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
      />
    </div>
  );
};

export default PoolEvents;

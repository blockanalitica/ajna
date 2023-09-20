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
import { generateEtherscanUrl, smartLocationParts } from "@/utils/url";
import { useLocation } from "react-router-dom";
import ExternalLink from "@/components/externalLink/ExternalLink";

const PoolEvents = ({ address, ...rest }) => {
  const location = useLocation();
  const { network } = smartLocationParts(location);

  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState("-tvl");
  const [eventType, setEventType] = useState("all");
  const {
    data = {},
    error,
    isLoading,
  } = useFetch(`/pools/${address}/events/`, {
    p: page,
    p_size: pageSize,
    order,
    type: eventType !== "all" ? eventType : null,
  });

  if (error) {
    return <p>Failed to load data</p>;
  }

  const eventTypeMapping = {
    add_collateral: "Add Collateral",
    remove_collateral: "Remove Collateral",
    add_quote_token: "Add Quote Token",
    move_quote_token: "Move Quote Token",
    remove_quote_token: "Remove Quote Token",
    draw_debt: "Draw Debt",
    repay_debt: "Repay Debt",
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
      cell: ({ row }) => <>{eventTypeMapping[row.event_type]}</>,
      smallCell: ({ row }) => (
        <>
          {row.event_type === "move_quote_token" ? (
            <>
              Bucket from {row.bucket_index_from} to {row.bucket_index_to}
            </>
          ) : null}
        </>
      ),
      cellSize: "1.5fr",
    },
    {
      header: "Amount",
      cell: ({ row }) => <Value value={row.amount} suffix={row.amount_symbol} />,
      headerAlign: "end",
      cellAlign: "end",
      orderField: "amount",
      visibleAfter: "sm",
    },
    {
      header: "Collateral",
      cell: ({ row }) => (
        <Value value={row.collateral} suffix={row.collateral_symbol} />
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: "collateral",
      visibleAfter: "sm",
    },
    {
      header: "Account",
      cell: ({ row }) => (
        <ExternalLink
          href={generateEtherscanUrl(network, row.account)}
          className="ms-2 text-purple-6 hover:underline"
        >
          {shorten(row.account)}
          <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="ms-2" size="xs" />
        </ExternalLink>
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: "account",
      visibleAfter: "lg",
    },
    {
      header: "Time",
      cell: ({ row }) => (
        <DateTimeAgo dateTime={DateTime.fromSeconds(row.block_timestamp)} />
      ),
      smallCell: ({ row }) => (
        <>
          {row.block_number}
          <ExternalLink
            href={generateEtherscanUrl(network, row.transaction_hash, "tx")}
            className="ms-2 hover:text-white"
          >
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
          </ExternalLink>
        </>
      ),
      headerAlign: "end",
      cellAlign: "end",
      orderField: "block_timestamp",
    },
  ];

  return (
    <div {...rest}>
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-xl md:text-1xl xl:text-2xl mb-5">Events</h1>
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
        keyField="id"
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

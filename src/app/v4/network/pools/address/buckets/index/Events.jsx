import { useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { useFetch } from "@/hooks";
import { DateTime } from "luxon";
import Table from "@/components/table/Table";
import DateTimeAgo from "@/components/dateTime/DateTimeAgo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import Select from "@/components/select/Select";
import { generateEtherscanUrl, smartLocationParts } from "@/utils/url";
import ExternalLink from "@/components/externalLink/ExternalLink";
import EventFormatter from "@/components/events/EventFormatter";
import { EVENT_TYPE_MAPPING, BUCKET_EVENTS } from "@/utils/constants";

const Events = ({ ...rest }) => {
  const location = useLocation();
  const { network } = smartLocationParts(location);
  const { address, index } = useParams();
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState("-order_index");
  const [eventType, setEventType] = useState("all");
  const {
    data = {},
    error,
    isLoading,
  } = useFetch(`/pools/${address}/buckets/${index}/events`, {
    p: page,
    p_size: pageSize,
    order,
    name: eventType !== "all" ? eventType : null,
  });

  if (error) {
    return <p>Failed to load data</p>;
  }

  const {
    results,
    count,
    collateral_token_symbol: collateralTokenSymbol,
    collateral_token_address: collateralTokenAddress,
    quote_token_symbol: quoteTokenSymbol,
    quote_token_address: quoteTokenAddress,
  } = data;

  const eventTypeOptions = [{ key: "all", value: "All" }];
  BUCKET_EVENTS.forEach((key) => {
    eventTypeOptions.push({ key, value: EVENT_TYPE_MAPPING[key] });
  });

  const onEventTypeOptionChange = (event) => {
    setPage(1);
    setEventType(event.target.value);
  };

  const columns = [
    {
      header: "Event",
      cell: ({ row }) => <>{EVENT_TYPE_MAPPING[row.name]}</>,
      cellSize: "minmax(120px, auto)",
      sticky: true,
    },
    {
      header: "Details",
      cell: ({ row }) => (
        <EventFormatter
          type={row.name}
          data={row.data}
          quoteTokenSymbol={quoteTokenSymbol}
          quoteTokenAddress={quoteTokenAddress}
          collateralTokenSymbol={collateralTokenSymbol}
          collateralTokenAddress={collateralTokenAddress}
        />
      ),
      cellSize: "2.5fr",
    },
    {
      header: "Time",
      cell: ({ row }) => (
        <DateTimeAgo dateTime={DateTime.fromISO(row.block_datetime)} />
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
        emptyTitle={`No ${
          EVENT_TYPE_MAPPING[eventType] ? EVENT_TYPE_MAPPING[eventType] : ""
        } Events`}
        emptyContent="There are no events"
        placeholderRows={pageSize}
      />
    </div>
  );
};

export default Events;

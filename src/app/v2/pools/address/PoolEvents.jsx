import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { useFetch, useLinkBuilder } from "@/hooks";
import { DateTime } from "luxon";
import Table from "@/components/table/Table";
import DateTimeAgo from "@/components/dateTime/DateTimeAgo";
import Address from "@/components/address/Address";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import Select from "@/components/select/Select";
import { generateEtherscanUrl, smartLocationParts } from "@/utils/url";
import ExternalLink from "@/components/externalLink/ExternalLink";
import EventFormatter from "@/components/events/EventFormatter";

const PoolEvents = ({ address, ...rest }) => {
  const buildLink = useLinkBuilder();
  const location = useLocation();
  const { network } = smartLocationParts(location);
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

  const {
    results,
    count,
    collateral_token_symbol: collateralTokenSymbol,
    quote_token_symbol: quoteTokenSymbol,
  } = data;

  const columns = [
    {
      header: "Event",
      cell: ({ row }) => <>{eventTypeMapping[row.name]}</>,
      smallCell: ({ row }) => <>{row.name}</>,
    },
    {
      header: "Wallets",
      cell: ({ row }) => (
        <div className="flex flex-col">
          {row.wallet_addresses?.map((address) => (
            <Link
              key={`wallet-link-${address}`}
              to={buildLink(`/wallets/${address}`)}
              className="text-purple-6 hover:underline flex"
            >
              <Address address={address} />
            </Link>
          ))}
        </div>
      ),
    },
    {
      header: "Details",
      cell: ({ row }) => (
        <EventFormatter
          type={row.name}
          data={row.data}
          quoteTokenSymbol={quoteTokenSymbol}
          collateralTokenSymbol={collateralTokenSymbol}
        />
      ),
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
        emptyTitle="No Events"
        emptyContent="There are no events"
        placeholderRows={pageSize}
      />
    </div>
  );
};

export default PoolEvents;

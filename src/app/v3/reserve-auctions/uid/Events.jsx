import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useFetch } from "@/hooks";
import { DateTime } from "luxon";
import Table from "@/components/table/Table";
import Value from "@/components/value/Value";
import DateTimeAgo from "@/components/dateTime/DateTimeAgo";
import CryptoIcon from "@/components/icon/CryptoIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { generateEtherscanUrl } from "@/utils/url";
import CopyToClipboard from "@/components/copyToClipboard/CopyToClipboard";
import ExternalLink from "@/components/externalLink/ExternalLink";
import { smartLocationParts } from "@/utils/url";
import Address from "@/components/address/Address";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

const EventValue = ({ title, children }) => {
  return (
    <div>
      <div className="text-gray-6 text-xs">{title}</div>
      <div className="text-sm flex items-center">{children}</div>
    </div>
  );
};

const EventData = ({ children }) => {
  return <div className="flex flex-row space-x-4">{children}</div>;
};

const ReserveAuctionEventFormatter = ({ type, event, quoteTokenSymbol, network }) => {
  let content;
  switch (type) {
    case "Kick":
      content = (
        <EventData>
          <EventValue title="Kicker">
            <Address address={event.data.kicker} className="pe-3" />
            <ExternalLink href={generateEtherscanUrl(network, event.data.kicker)}>
              <CryptoIcon name="etherscan" size={16} />
            </ExternalLink>
            <CopyToClipboard className="mx-3" text={event.data.kicker} />
          </EventValue>
          <EventValue title="Claimable Reserves">
            <Value value={event.data.claimable_reserves} suffix={quoteTokenSymbol} />
          </EventValue>
          <EventValue title="Starting Price">
            <Value value={event.data.starting_price} suffix="AJNA" />
          </EventValue>
        </EventData>
      );
      break;
    case "Take":
      content = (
        <EventData>
          <EventValue title="Taker">
            <Address address={event.data.taker} className="pe-3" />
            <ExternalLink href={generateEtherscanUrl(network, event.data.taker)}>
              <CryptoIcon name="etherscan" size={16} />
            </ExternalLink>
            <CopyToClipboard className="mx-3" text={event.data.taker} />
          </EventValue>
          <EventValue title="Quote Purchased">
            <Value value={event.data.quote_purchased} suffix={quoteTokenSymbol} />
          </EventValue>
          <EventValue title="Ajna Burned">
            <Value value={event.data.ajna_burned} suffix="AJNA" />
          </EventValue>
          <EventValue title="Auction Price">
            <Value value={event.data.auction_price} suffix="AJNA" />
          </EventValue>
        </EventData>
      );
      break;
    default:
    // pass
  }

  return <>{content}</>;
};

const Events = ({ uid, quoteTokenSymbol }) => {
  const location = useLocation();
  const { network } = smartLocationParts(location);
  const pageSize = 10;
  const [page, setPage] = useState(1);

  const {
    data = {},
    error,
    isLoading,
  } = useFetch(`/reserve-auctions/${uid}/events/`, {
    p: page,
    p_size: pageSize,
  });

  if (error) {
    return <p>Failed to load data</p>;
  }

  const { results = [], count } = data;

  const columns = [
    {
      header: "Event",
      cell: ({ row }) => <>{row.event}</>,
      cellSize: ".5fr",
    },
    {
      header: "Details",
      cell: ({ row }) => (
        <ReserveAuctionEventFormatter
          type={row.event}
          event={row}
          quoteTokenSymbol={quoteTokenSymbol}
          network={network}
        />
      ),
      cellSize: "3fr",
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
    },
  ];

  return (
    <Table
      data={results}
      currentPage={page}
      pageSize={pageSize}
      totalRecords={count}
      onPageChange={setPage}
      isLoading={isLoading}
      keyField="order_index"
      columns={columns}
      emptyTitle="No Events"
      emptyContent="There have been no events"
    />
  );
};

export default Events;

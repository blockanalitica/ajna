import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useFetch } from "@/hooks";
import { DateTime } from "luxon";
import Table from "@/components/table/Table";
import CurrencyValue from "@/components/value/CurrencyValue";
import DateTimeAgo from "@/components/dateTime/DateTimeAgo";
import EtherscanIcon from "@/components/icon/EtherscanIcon";
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

const AuctionEventFormatter = ({
  type,
  event,
  quoteTokenSymbol,
  quoteTokenAddress,
  collateralTokenSymbol,
  collateralTokenAddress,
  network,
}) => {
  let content;
  switch (type) {
    case "Kick":
      content = (
        <EventData>
          <EventValue title="Kicker">
            <Address address={event.data.kicker} className="pe-2" />
            <ExternalLink href={generateEtherscanUrl(network, event.data.kicker)}>
              <EtherscanIcon network={network} size={14} />
            </ExternalLink>
            <CopyToClipboard className="mx-2" text={event.data.kicker} size="sm" />
          </EventValue>
          <EventValue title="Debt">
            <CurrencyValue
              value={event.data.debt}
              currencySymbol={quoteTokenSymbol}
              currencyAddress={quoteTokenAddress}
              small
            />
          </EventValue>
          <EventValue title="Collateral">
            <CurrencyValue
              value={event.data.collateral}
              currencySymbol={collateralTokenSymbol}
              currencyAddress={collateralTokenAddress}
              small
            />
          </EventValue>
          <EventValue title="Bond">
            <CurrencyValue
              value={event.data.bond}
              currencySymbol={quoteTokenSymbol}
              currencyAddress={quoteTokenAddress}
              small
            />
          </EventValue>
        </EventData>
      );
      break;
    case "Take":
      content = (
        <EventData>
          <EventValue title="Taker">
            <Address address={event.data.taker} className="pe-2" />
            <ExternalLink href={generateEtherscanUrl(network, event.data.taker)}>
              <EtherscanIcon network={network} size={14} />
            </ExternalLink>
            <CopyToClipboard className="mx-2" text={event.data.taker} size="sm" />
          </EventValue>
          <EventValue title="Debt">
            <CurrencyValue
              value={event.data.amount}
              currencySymbol={quoteTokenSymbol}
              currencyAddress={quoteTokenAddress}
              small
            />
          </EventValue>
          <EventValue title="Collateral">
            <CurrencyValue
              value={event.data.collateral}
              currencySymbol={collateralTokenSymbol}
              currencyAddress={collateralTokenAddress}
              small
            />
          </EventValue>
          <EventValue title="Bond Change">
            <CurrencyValue
              value={event.data.bond_change}
              currencySymbol={quoteTokenSymbol}
              currencyAddress={quoteTokenAddress}
              small
            />
          </EventValue>
        </EventData>
      );
      break;

    case "Bucket Take":
      content = (
        <EventData>
          <EventValue title="Taker">
            <Address address={event.data.taker} className="pe-2" />
            <ExternalLink href={generateEtherscanUrl(network, event.data.taker)}>
              <EtherscanIcon network={network} size={14} />
            </ExternalLink>
            <CopyToClipboard className="mx-2" text={event.data.taker} size="sm" />
          </EventValue>
          <EventValue title="Bucket Index">{event.data.index}</EventValue>
          <EventValue title="Debt">
            <CurrencyValue
              value={event.data.amount}
              currencySymbol={quoteTokenSymbol}
              currencyAddress={quoteTokenAddress}
              small
            />
          </EventValue>
          <EventValue title="Collateral">
            <CurrencyValue
              value={event.data.collateral}
              currencySymbol={collateralTokenSymbol}
              currencyAddress={collateralTokenAddress}
              small
            />
          </EventValue>
          <EventValue title="Bond Change">
            <CurrencyValue
              value={event.data.bond_change}
              currencySymbol={quoteTokenSymbol}
              currencyAddress={quoteTokenAddress}
              small
            />
          </EventValue>
        </EventData>
      );
      break;

    case "Auction Settle":
      content = (
        <EventData>
          <EventValue title="Collateral">
            <CurrencyValue
              value={event.data.collateral}
              currencySymbol={collateralTokenSymbol}
              currencyAddress={collateralTokenAddress}
              small
            />
          </EventValue>
        </EventData>
      );
      break;

    case "Auction NFT Settle":
      content = (
        <EventData>
          <EventValue title="Collateral">
            <CurrencyValue
              value={event.data.collateral}
              currencySymbol={collateralTokenSymbol}
              currencyAddress={collateralTokenAddress}
              small
            />
          </EventValue>
          <EventValue title="Index">{event.data.index}</EventValue>
        </EventData>
      );
      break;

    case "Settle":
      content = (
        <EventData>
          <EventValue title="Settled Debt">
            <CurrencyValue
              value={event.data.settled_debt}
              currencySymbol={quoteTokenSymbol}
              currencyAddress={quoteTokenAddress}
              small
            />
          </EventValue>
        </EventData>
      );
      break;

    default:
    // pass
  }

  return <>{content}</>;
};

const Events = ({
  auction_uid,
  quoteTokenSymbol,
  quoteTokenAddress,
  collateralTokenSymbol,
  collateralTokenAddress,
}) => {
  const location = useLocation();
  const { network } = smartLocationParts(location);
  const pageSize = 10;
  const [page, setPage] = useState(1);

  const {
    data = {},
    error,
    isLoading,
  } = useFetch(`/auctions/${auction_uid}/events/`, {
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
      cellSize: "minmax(120px, auto)",
      sticky: true,
    },
    {
      header: "Details",
      cell: ({ row }) => (
        <AuctionEventFormatter
          type={row.event}
          event={row}
          quoteTokenSymbol={quoteTokenSymbol}
          quoteTokenAddress={quoteTokenAddress}
          collateralTokenSymbol={collateralTokenSymbol}
          collateralTokenAddress={collateralTokenAddress}
          network={network}
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

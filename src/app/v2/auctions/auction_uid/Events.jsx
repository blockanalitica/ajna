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

const AuctionEventFormatter = ({
  type,
  event,
  quoteTokenSymbol,
  collateralTokenSymbol,
  network,
}) => {
  let content;
  switch (type) {
    case "Kick":
      content = (
        <div className="flex flex-col">
          <div className="flex items-center">
            <span className="text-gray-6 text-sm pe-1">Kicker:</span>
            <Address address={event.data.kicker} className="pe-3" />
            <ExternalLink href={generateEtherscanUrl(network, event.data.kicker)}>
              <CryptoIcon name="etherscan" size={16} />
            </ExternalLink>
            <CopyToClipboard className="mx-3" text={event.data.kicker} />
          </div>
          <div>
            <span className="text-gray-6 text-sm pe-1">Debt:</span>
            <Value value={event.data.debt} suffix={quoteTokenSymbol} />
          </div>
          <div>
            <span className="text-gray-6 text-sm pe-1">Collateral:</span>
            <Value value={event.data.collateral} suffix={collateralTokenSymbol} />
          </div>
          <div>
            <span className="text-gray-6 text-sm pe-1">Bond:</span>
            <Value value={event.data.bond} suffix={quoteTokenSymbol} />
          </div>
        </div>
      );
      break;
    case "Take":
      content = (
        <div className="flex flex-col">
          <div className="flex items-center">
            <span className="text-gray-6 text-sm pe-1">Taker:</span>
            <Address address={event.data.taker} className="pe-3" />
            <ExternalLink href={generateEtherscanUrl(network, event.data.taker)}>
              <CryptoIcon name="etherscan" size={16} />
            </ExternalLink>
            <CopyToClipboard className="mx-3" text={event.data.taker} />
          </div>
          <div>
            <span className="text-gray-6 text-sm pe-1">Debt:</span>
            <Value value={event.data.amount} suffix={quoteTokenSymbol} />
          </div>
          <div>
            <span className="text-gray-6 text-sm pe-1">Collateral:</span>
            <Value value={event.data.collateral} suffix={collateralTokenSymbol} />
          </div>
          <div>
            <span className="text-gray-6 text-sm pe-1">Bond Change:</span>
            <Value value={event.data.bondChange} suffix={quoteTokenSymbol} />
          </div>
        </div>
      );
      break;

    case "Bucket Take":
      content = (
        <div className="flex flex-col">
          <div className="flex items-center">
            <span className="text-gray-6 text-sm pe-1">Taker:</span>
            <Address address={event.data.taker} className="pe-3" />
            <ExternalLink href={generateEtherscanUrl(network, event.data.taker)}>
              <CryptoIcon name="etherscan" size={16} />
            </ExternalLink>
            <CopyToClipboard className="mx-3" text={event.data.taker} />
          </div>
          <div>
            <span className="text-gray-6 text-sm pe-1">Bucket Index:</span>
            {event.data.index}
          </div>
          <div>
            <span className="text-gray-6 text-sm pe-1">Debt:</span>
            <Value value={event.data.amount} suffix={quoteTokenSymbol} />
          </div>
          <div>
            <span className="text-gray-6 text-sm pe-1">Collateral:</span>
            <Value value={event.data.collateral} suffix={collateralTokenSymbol} />
          </div>
          <div>
            <span className="text-gray-6 text-sm pe-1">Bond Change:</span>
            <Value value={event.data.bondChange} suffix={quoteTokenSymbol} />
          </div>
        </div>
      );
      break;

    case "Auction Settle":
      content = (
        <div>
          <span className="text-gray-6 text-sm pe-1">Collateral:</span>
          <Value value={event.data.collateral} suffix={collateralTokenSymbol} />
        </div>
      );
      break;
    case "Settle":
      content = (
        <div>
          <span className="text-gray-6 text-sm pe-1">Settled Debt:</span>
          <Value value={event.data.settled_debt} suffix={quoteTokenSymbol} />
        </div>
      );
      break;

    default:
    // pass
  }

  return <>{content}</>;
};

const Events = ({ auction_uid, quoteTokenSymbol, collateralTokenSymbol }) => {
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
    },
    {
      header: "Details",
      cell: ({ row }) => (
        <AuctionEventFormatter
          type={row.event}
          event={row}
          quoteTokenSymbol={quoteTokenSymbol}
          collateralTokenSymbol={collateralTokenSymbol}
          network={network}
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

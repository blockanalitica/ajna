import Value from "@/components/value/Value";
import ValueChange from "@/components/value/ValueChange";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EventFormatter = ({ type, data, quoteTokenSymbol, collateralTokenSymbol }) => {
  let content;

  switch (type) {
    case "UpdateInterestRate":
      content = (
        <div className="flex flex-col">
          <div className="flex items-center">
            <Value value={data.oldRate * 100} suffix="%" />
            <FontAwesomeIcon
              icon={faArrowRightLong}
              size="sm"
              className="text-gray-6 px-1"
            />
            <Value value={data.newRate * 100} suffix="%" />
          </div>
          <ValueChange
            value={(data.newRate - data.oldRate) * 100}
            suffix="%"
            className="text-sm"
          />
        </div>
      );
      break;

    case "AddQuoteToken":
      content = (
        <div className="flex flex-col">
          <Value value={data.amount} suffix={quoteTokenSymbol} />
          <div className="text-sm">
            <span className="text-gray-6">Bucket:</span> {data.index}
          </div>
        </div>
      );
      break;

    case "RemoveQuoteToken":
      content = (
        <div className="flex flex-col">
          <Value value={data.amount} suffix={quoteTokenSymbol} />
          <div className="text-sm">
            <span className="text-gray-6">Bucket:</span> {data.index}
          </div>
        </div>
      );
      break;

    case "MoveQuoteToken":
      content = (
        <div className="flex flex-col">
          <Value value={data.amount} suffix={quoteTokenSymbol} />
          <div className="text-sm">
            <span className="text-gray-6">Bucket:</span> {data.from}
            <FontAwesomeIcon
              icon={faArrowRightLong}
              size="sm"
              className="text-gray-6 px-1"
            />
            {data.to}
          </div>
        </div>
      );
      break;

    case "AddCollateral":
      content = (
        <div className="flex flex-col">
          <Value value={data.amount} suffix={collateralTokenSymbol} />
          <div className="text-sm">
            <span className="text-gray-6">Bucket:</span> {data.index}
          </div>
        </div>
      );
      break;

    case "RemoveCollateral":
      content = (
        <div className="flex flex-col">
          <Value value={data.amount} suffix={collateralTokenSymbol} />
          <div className="text-sm">
            <span className="text-gray-6">Bucket:</span> {data.index}
          </div>
        </div>
      );
      break;

    case "Kick":
      content = (
        <div className="flex flex-row space-x-2">
          <div>
            <span className="text-gray-6 text-sm pe-1">Debt:</span>
            <Value value={data.debt} suffix={quoteTokenSymbol} />
          </div>
          <div>
            <span className="text-gray-6 text-sm pe-1">Collateral:</span>
            <Value value={data.collateral} suffix={collateralTokenSymbol} />
          </div>
          <div>
            <span className="text-gray-6 text-sm pe-1">Bond:</span>
            <Value value={data.bond} suffix={quoteTokenSymbol} />
          </div>
        </div>
      );
      break;

    case "KickReserveAuction":
      content = (
        <div className="flex flex-col">
          <div>
            <span className="text-gray-6 text-sm pe-1">Auction Price:</span>
            <Value value={data.auctionPrice} suffix={quoteTokenSymbol} />
          </div>
          <div className="text-sm">
            <span className="text-gray-6">Claimable Reserves Remaining:</span>{" "}
            <Value value={data.claimableReservesRemaining} suffix={quoteTokenSymbol} />
          </div>
        </div>
      );
      break;

    case "Take":
      content = (
        <div className="flex flex-row space-x-2">
          <div>
            <span className="text-gray-6 text-sm pe-1">Debt:</span>
            <Value value={data.amount} suffix={quoteTokenSymbol} />
          </div>
          <div>
            <span className="text-gray-6 text-sm pe-1">Collateral:</span>
            <Value value={data.collateral} suffix={collateralTokenSymbol} />
          </div>
          <div>
            <span className="text-gray-6 text-sm pe-1">Bond Change:</span>
            <Value value={data.bondChange} suffix={quoteTokenSymbol} />
          </div>
        </div>
      );
      break;

    case "AuctionSettle":
      content = <Value value={data.collateral} suffix={collateralTokenSymbol} />;
      break;

    case "BondWithdrawn":
      content = <Value value={data.amount} suffix={quoteTokenSymbol} />;
      break;

    case "DrawDebt":
      content = (
        <div className="flex flex-col">
          <Value value={data.amountBorrowed} suffix={quoteTokenSymbol} />
          <div className="text-sm">
            <Value value={data.collateralPledged} suffix={collateralTokenSymbol} />
          </div>
        </div>
      );
      break;

    case "RepayDebt":
      content = (
        <div className="flex flex-col">
          <Value value={data.quoteRepaid} suffix={quoteTokenSymbol} />
          <div className="text-sm">
            <Value value={data.collateralPulled} suffix={collateralTokenSymbol} />
          </div>
        </div>
      );
      break;

    case "Settle":
      content = <Value value={data.settledDebt} suffix={quoteTokenSymbol} />;
      break;

    default:
    // pass
  }

  return <>{content}</>;
};

export default EventFormatter;

import _ from "lodash";
import Value from "@/components/value/Value";
import ValueChange from "@/components/value/ValueChange";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Address from "@/components/address/Address";
import CopyToClipboard from "@/components/copyToClipboard/CopyToClipboard";
import { Link } from "react-router-dom";
import { useLinkBuilder } from "@/hooks";

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

const EventFormatter = ({ type, data, quoteTokenSymbol, collateralTokenSymbol }) => {
  const buildLink = useLinkBuilder();
  let content;

  switch (type) {
    case "AddCollateral":
      content = (
        <EventData>
          <EventValue title="Actor">
            <Link
              to={buildLink(`wallets/${data.actor}`)}
              className="text-purple-6 hover:underline"
            >
              <Address address={data.actor} />
            </Link>
          </EventValue>
          <EventValue title="Amount">
            <Value value={data.amount} suffix={collateralTokenSymbol} />
          </EventValue>
          <EventValue title="Bucket">{data.index}</EventValue>
        </EventData>
      );
      break;

    case "AddCollateralNFT":
      break;

    case "AddQuoteToken":
      content = (
        <EventData>
          <EventValue title="Lender">
            <Link
              to={buildLink(`wallets/${data.lender}`)}
              className="text-purple-6 hover:underline"
            >
              <Address address={data.lender} />
            </Link>
          </EventValue>
          <EventValue title="Amount">
            <Value value={data.amount} suffix={quoteTokenSymbol} />
          </EventValue>
          <EventValue title="Bucket">{data.index}</EventValue>
        </EventData>
      );
      break;

    case "ApproveLPTransferors":
      content = (
        <EventData>
          <EventValue title="Lender">
            <Link
              to={buildLink(`wallets/${data.lender}`)}
              className="text-purple-6 hover:underline"
            >
              <Address address={data.lender} />
            </Link>
          </EventValue>
          <EventValue title="Transferors">
            {data.transferors?.map((transferor) => (
              <div className="me-2 flex items-center" key={transferor}>
                <Address address={transferor} />
                <CopyToClipboard className="ms-2" text={transferor} />
              </div>
            ))}
          </EventValue>
        </EventData>
      );
      break;

    case "AuctionNFTSettle":
      content = (
        <EventData>
          <EventValue title="Borrower">
            <Link
              to={buildLink(`wallets/${data.borrower}`)}
              className="text-purple-6 hover:underline"
            >
              <Address address={data.borrower} />
            </Link>
          </EventValue>
        </EventData>
      );
      break;

    case "AuctionSettle":
      content = (
        <EventData>
          <EventValue title="Borrower">
            <Link
              to={buildLink(`wallets/${data.borrower}`)}
              className="text-purple-6 hover:underline"
            >
              <Address address={data.borrower} />
            </Link>
          </EventValue>
          <EventValue title="Collateral">
            <Value value={data.collateral} suffix={collateralTokenSymbol} />
          </EventValue>
        </EventData>
      );
      break;

    case "BondWithdrawn":
      content = (
        <EventData>
          <EventValue title="Kicker">
            <Link
              to={buildLink(`wallets/${data.kicker}`)}
              className="text-purple-6 hover:underline"
            >
              <Address address={data.kicker} />
            </Link>
          </EventValue>
          <EventValue title="Receiver">
            <Link
              to={buildLink(`wallets/${data.receiver}`)}
              className="text-purple-6 hover:underline"
            >
              <Address address={data.receiver} />
            </Link>
          </EventValue>
          <EventValue title="Amount">
            <Value value={data.amount} suffix={quoteTokenSymbol} />
          </EventValue>
        </EventData>
      );
      break;

    case "BucketBankruptcy":
      content = (
        <EventData>
          <EventValue title="Index">{data.index}</EventValue>
          <EventValue title="LP Forfeited">
            <Value value={data.lpForfeited} suffix={quoteTokenSymbol} />
          </EventValue>
        </EventData>
      );

      break;

    case "BucketTake":
      content = (
        <EventData>
          <EventValue title="Borrower">
            <Link
              to={buildLink(`wallets/${data.borrower}`)}
              className="text-purple-6 hover:underline"
            >
              <Address address={data.borrower} />
            </Link>
          </EventValue>
          <EventValue title="Debt">
            <Value value={data.amount} suffix={quoteTokenSymbol} />
          </EventValue>
          <EventValue title="Collateral">
            <Value value={data.collateral} suffix={collateralTokenSymbol} />
          </EventValue>
          <EventValue title="Bond Change">
            <Value value={data.bondChange} suffix={quoteTokenSymbol} />
          </EventValue>
          <EventValue title="Bucket">{data.index}</EventValue>
        </EventData>
      );
      break;

    case "BucketTakeLPAwarded":
      content = (
        <EventData>
          <EventValue title="Kicker">
            <Link
              to={buildLink(`wallets/${data.kicker}`)}
              className="text-purple-6 hover:underline"
            >
              <Address address={data.kicker} />
            </Link>
          </EventValue>
          <EventValue title="Taker">
            <Link
              to={buildLink(`wallets/${data.taker}`)}
              className="text-purple-6 hover:underline"
            >
              <Address address={data.taker} />
            </Link>
          </EventValue>

          <EventValue title="Kicker LP Awarded">
            <Value value={data.lpAwardedKicker} suffix={quoteTokenSymbol} />
          </EventValue>
          <EventValue title="Taker LP Awarded">
            <Value value={data.lpAwardedTaker} suffix={quoteTokenSymbol} />
          </EventValue>
        </EventData>
      );
      break;

    case "DecreaseLPAllowance":
      break;

    case "DrawDebt":
      content = (
        <EventData>
          <EventValue title="Borrower">
            <Link
              to={buildLink(`wallets/${data.borrower}`)}
              className="text-purple-6 hover:underline"
            >
              <Address address={data.borrower} />
            </Link>
          </EventValue>
          <EventValue title="Amount Borrowed">
            <Value value={data.amountBorrowed} suffix={quoteTokenSymbol} />
          </EventValue>
          <EventValue title="Collateral Pledged">
            <Value value={data.collateralPledged} suffix={collateralTokenSymbol} />
          </EventValue>
        </EventData>
      );
      break;

    case "DrawDebtNFT":
      content = (
        <EventData>
          <EventValue title="Borrower">
            <Link
              to={buildLink(`wallets/${data.borrower}`)}
              className="text-purple-6 hover:underline"
            >
              <Address address={data.borrower} />
            </Link>
          </EventValue>
          <EventValue title="Amount Borrowed">
            <Value value={data.amountBorrowed} suffix={quoteTokenSymbol} />
          </EventValue>
          {data.tokenIdsPledged?.length > 0 ? (
            <EventValue title="Token Ids Pledged">
              {data.tokenIdsPledged.join(", ")}
            </EventValue>
          ) : null}
        </EventData>
      );
      break;

    case "Flashloan":
      content = (
        <EventData>
          <EventValue title="Receiver">
            <Link
              to={buildLink(`wallets/${data.receiver}`)}
              className="text-purple-6 hover:underline"
            >
              <Address address={data.receiver} />
            </Link>
          </EventValue>
          <EventValue title="Amount">
            <Value value={data.amount} suffix={data.token_symbol} />
          </EventValue>
        </EventData>
      );
      break;

    case "IncreaseLPAllowance":
      content = (
        <EventData>
          <EventValue title="Owner">
            <Link
              to={buildLink(`wallets/${data.owner}`)}
              className="text-purple-6 hover:underline"
            >
              <Address address={data.owner} />
            </Link>
          </EventValue>
          <EventValue title="Spender">
            <Address address={data.spender} />
            <CopyToClipboard className="ms-2" text={data.spender} />
          </EventValue>
          {data.indexes?.length > 0 ? (
            <EventValue title="Indexes">
              {_.zip(data.indexes, data.amounts).map(([index, amount]) => (
                <div className="me-2 inline-block" key={index}>
                  {index}: <Value value={amount} suffix={quoteTokenSymbol} />
                </div>
              ))}
            </EventValue>
          ) : null}
        </EventData>
      );

      break;

    case "Kick":
      content = (
        <EventData>
          <EventValue title="Borrower">
            <Link
              to={buildLink(`wallets/${data.borrower}`)}
              className="text-purple-6 hover:underline"
            >
              <Address address={data.borrower} />
            </Link>
          </EventValue>
          <EventValue title="Debt">
            <Value value={data.debt} suffix={quoteTokenSymbol} />
          </EventValue>
          <EventValue title="Collateral">
            <Value value={data.collateral} suffix={collateralTokenSymbol} />
          </EventValue>
          <EventValue title="Bond">
            <Value value={data.bond} suffix={quoteTokenSymbol} />
          </EventValue>
        </EventData>
      );
      break;

    case "KickReserveAuction":
      content = (
        <EventData>
          <EventValue title="Auction Price">
            <Value value={data.auctionPrice} suffix={quoteTokenSymbol} />
          </EventValue>
          <EventValue title="Claimable Reserves Remaining">
            <Value value={data.claimableReservesRemaining} suffix={quoteTokenSymbol} />
          </EventValue>
        </EventData>
      );
      break;

    case "LoanStamped":
      content = (
        <EventData>
          <EventValue title="Borrower">
            <Link
              to={buildLink(`wallets/${data.borrower}`)}
              className="text-purple-6 hover:underline"
            >
              <Address address={data.borrower} />
            </Link>
          </EventValue>
        </EventData>
      );
      break;

    case "MergeOrRemoveCollateralNFT":
      content = (
        <EventData>
          <EventValue title="Actor">
            <Link
              to={buildLink(`wallets/${data.actor}`)}
              className="text-purple-6 hover:underline"
            >
              <Address address={data.actor} />
            </Link>
          </EventValue>
          <EventValue title="Collateral Merged">
            <Value value={data.collateralMerged} suffix={collateralTokenSymbol} />
          </EventValue>
          <EventValue title="To Index Lps">
            <Value value={data.toIndexLps} />
          </EventValue>
        </EventData>
      );
      break;

    case "MoveQuoteToken":
      content = (
        <EventData>
          <EventValue title="Lender">
            <Link
              to={buildLink(`wallets/${data.lender}`)}
              className="text-purple-6 hover:underline"
            >
              <Address address={data.lender} />
            </Link>
          </EventValue>
          <EventValue title="Amount">
            <Value value={data.amount} suffix={quoteTokenSymbol} />
          </EventValue>
          <EventValue title="Bucket">
            {data.from}
            <FontAwesomeIcon
              icon={faArrowRightLong}
              size="sm"
              className="text-gray-6 px-1"
            />
            {data.to}
          </EventValue>
        </EventData>
      );
      break;

    case "RemoveCollateral":
      content = (
        <EventData>
          <EventValue title="Claimer">
            <Link
              to={buildLink(`wallets/${data.claimer}`)}
              className="text-purple-6 hover:underline"
            >
              <Address address={data.claimer} />
            </Link>
          </EventValue>
          <EventValue title="Amount">
            <Value value={data.amount} suffix={collateralTokenSymbol} />
          </EventValue>
          <EventValue title="Bucket">{data.index}</EventValue>
        </EventData>
      );
      break;

    case "RemoveQuoteToken":
      content = (
        <EventData>
          <EventValue title="Lender">
            <Link
              to={buildLink(`wallets/${data.lender}`)}
              className="text-purple-6 hover:underline"
            >
              <Address address={data.lender} />
            </Link>
          </EventValue>
          <EventValue title="Amount">
            <Value value={data.amount} suffix={quoteTokenSymbol} />
          </EventValue>
          <EventValue title="Bucket">{data.index}</EventValue>
        </EventData>
      );
      break;

    case "RepayDebt":
      content = (
        <EventData>
          <EventValue title="Borrower">
            <Link
              to={buildLink(`wallets/${data.borrower}`)}
              className="text-purple-6 hover:underline"
            >
              <Address address={data.borrower} />
            </Link>
          </EventValue>
          <EventValue title="Quote Repaid">
            <Value value={data.quoteRepaid} suffix={quoteTokenSymbol} />
          </EventValue>
          <EventValue title="Collateral Pulled">
            <Value value={data.collateralPulled} suffix={collateralTokenSymbol} />
          </EventValue>
        </EventData>
      );
      break;

    case "ReserveAuction":
      content = (
        <EventData>
          <EventValue title="Auction Price">
            <Value value={data.auctionPrice} suffix={quoteTokenSymbol} />
          </EventValue>
          <EventValue title="Claimable Reserves Remaining">
            <Value value={data.claimableReservesRemaining} suffix={quoteTokenSymbol} />
          </EventValue>
          <EventValue title="Current Burn Epoch">{data.currentBurnEpoch}</EventValue>
        </EventData>
      );
      break;

    case "ResetInterestRate":
      content = (
        <EventData>
          <EventValue title="Interest Rate">
            <div className="flex items-center me-3">
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
          </EventValue>
        </EventData>
      );
      break;

    case "RevokeLPAllowance":
      break;

    case "RevokeLPTransferors":
      break;

    case "Settle":
      content = (
        <EventData>
          <EventValue title="Borrower">
            <Link
              to={buildLink(`wallets/${data.borrower}`)}
              className="text-purple-6 hover:underline"
            >
              <Address address={data.borrower} />
            </Link>
          </EventValue>
          <EventValue title="Settled Debt">
            <Value value={data.settledDebt} suffix={quoteTokenSymbol} />
          </EventValue>
        </EventData>
      );
      break;

    case "Take":
      content = (
        <EventData>
          <EventValue title="Borrower">
            <Link
              to={buildLink(`wallets/${data.borrower}`)}
              className="text-purple-6 hover:underline"
            >
              <Address address={data.borrower} />
            </Link>
          </EventValue>
          <EventValue title="Debt">
            <Value value={data.amount} suffix={quoteTokenSymbol} />
          </EventValue>
          <EventValue title="Collateral">
            <Value value={data.collateral} suffix={collateralTokenSymbol} />
          </EventValue>
          <EventValue title="Bond Change">
            <Value value={data.bondChange} suffix={quoteTokenSymbol} />
          </EventValue>
        </EventData>
      );
      break;

    case "TransferLP":
      content = (
        <EventData>
          <EventValue title="Owner">
            <Link
              to={buildLink(`wallets/${data.owner}`)}
              className="text-purple-6 hover:underline"
            >
              <Address address={data.owner} />
            </Link>
          </EventValue>
          <EventValue title="New Owner">
            <Link
              to={buildLink(`wallets/${data.newOwner}`)}
              className="text-purple-6 hover:underline"
            >
              <Address address={data.newOwner} />
            </Link>
          </EventValue>
          <EventValue title="LP">
            <Value value={data.lp} suffix={quoteTokenSymbol} />
          </EventValue>
          {data.indexes?.length > 0 ? (
            <EventValue title="Indexes">{data.indexes.join(", ")}</EventValue>
          ) : null}
        </EventData>
      );
      break;

    case "UpdateInterestRate":
      content = (
        <EventData>
          <EventValue title="Interest Rate">
            <div className="flex items-center me-3">
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
          </EventValue>
        </EventData>
      );
      break;

    default:
    // pass
  }

  return <>{content}</>;
};

export default EventFormatter;

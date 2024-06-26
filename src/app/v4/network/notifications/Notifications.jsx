import { useState } from "react";
import { usePageTitle, useFetch, useLinkBuilder } from "@/hooks";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";
import CardOpaque from "@/components/card/CardOpaque";
import Address from "@/components/address/Address";
import PoolName from "@/components/poolName/PoolName";
import Value from "@/components/value/Value";
import CurrencyValue from "@/components/value/CurrencyValue";
import Pagination from "@/components/pagination/Pagination";
import DateTimeAgo from "@/components/dateTime/DateTimeAgo";

const NotificationFormatter = ({ notification }) => {
  const buildLink = useLinkBuilder();
  let content;

  switch (notification.type) {
    case "AddCollateral":
      content = (
        <>
          <div className="font-syncopate uppercase text-sm mb-2">Collateral Added</div>
          <div className="gap-x-1 flex flex-wrap items-end mb-2">
            <Link
              to={buildLink(`/wallets/${notification.data.actor.toLowerCase()}`)}
              className="text-purple-6 hover:underline"
            >
              <Address address={notification.data.actor} />
            </Link>
            added
            <CurrencyValue
              value={notification.data.amount}
              currencySymbol={notification.collateral_token_symbol}
              currencyAddress={notification.collateral_token_address}
            />
            <span className="text-gray-6">
              (<Value value={notification.data.amount_usd} prefix="$" />)
            </span>
            collateral to bucket {notification.data.index} in
            <Link
              to={buildLink(`/pools/${notification.pool_address}`)}
              className="text-purple-6 hover:underline"
            >
              <PoolName
                collateralSymbol={notification.collateral_token_symbol}
                collateralAddress={notification.collateral_token_address}
                quoteSymbol={notification.quote_token_symbol}
                quoteAddress={notification.quote_token_address}
                size="sm"
              />
            </Link>
          </div>
        </>
      );
      break;

    case "AddQuoteToken":
      content = (
        <>
          <div className="font-syncopate uppercase text-sm mb-2">Quote Token Added</div>
          <div className="gap-x-1 flex flex-wrap items-end mb-2">
            <Link
              to={buildLink(
                `/wallets/${notification.data.wallet_address.toLowerCase()}`,
              )}
              className="text-purple-6 hover:underline"
            >
              <Address address={notification.data.wallet_address} />
            </Link>
            added
            <CurrencyValue
              value={notification.data.amount}
              currencySymbol={notification.quote_token_symbol}
              currencyAddress={notification.quote_token_address}
            />
            <span className="text-gray-6">
              (<Value value={notification.data.amount_usd} prefix="$" />)
            </span>
            quote token to
            <Link
              to={buildLink(`/pools/${notification.pool_address}`)}
              className="text-purple-6 hover:underline"
            >
              <PoolName
                collateralSymbol={notification.collateral_token_symbol}
                collateralAddress={notification.collateral_token_address}
                quoteSymbol={notification.quote_token_symbol}
                quoteAddress={notification.quote_token_address}
                size="sm"
              />
            </Link>
          </div>
        </>
      );
      break;

    case "Kick":
      content = (
        <>
          <div className="font-syncopate uppercase text-sm mb-2">Auction Kicked</div>
          <div className="gap-x-1 flex flex-wrap items-end mb-2">
            New
            <Link
              to={buildLink(`/auctions/${notification.data.auction_uid}`)}
              className="text-purple-6 hover:underline"
            >
              auction
            </Link>
            kicked in
            <Link
              to={buildLink(`/pools/${notification.pool_address}`)}
              className="text-purple-6 hover:underline"
            >
              <PoolName
                collateralSymbol={notification.collateral_token_symbol}
                collateralAddress={notification.collateral_token_address}
                quoteSymbol={notification.quote_token_symbol}
                quoteAddress={notification.quote_token_address}
                size="sm"
              />
            </Link>
          </div>
        </>
      );
      break;

    case "AuctionSettle":
      content = (
        <>
          <div className="font-syncopate uppercase text-sm mb-2">Auction Settled</div>
          <div className="gap-x-1 flex flex-wrap items-end mb-2">
            <Link
              to={buildLink(`/auctions/${notification.data.auction_uid}`)}
              className="text-purple-6 hover:underline"
            >
              Auction
            </Link>
            has been settled in
            <Link
              to={buildLink(`/pools/${notification.pool_address}`)}
              className="text-purple-6 hover:underline"
            >
              <PoolName
                collateralSymbol={notification.collateral_token_symbol}
                collateralAddress={notification.collateral_token_address}
                quoteSymbol={notification.quote_token_symbol}
                quoteAddress={notification.quote_token_address}
                size="sm"
              />
            </Link>
          </div>
        </>
      );
      break;

    case "DrawDebt":
      content = (
        <>
          <div className="font-syncopate uppercase text-sm mb-2">Debt Drawed</div>
          <div className="gap-x-1 flex flex-wrap items-end mb-2">
            <Link
              to={buildLink(
                `/wallets/${notification.data.wallet_address.toLowerCase()}`,
              )}
              className="text-purple-6 hover:underline"
            >
              <Address address={notification.data.wallet_address} />
            </Link>
            drawed
            <CurrencyValue
              value={notification.data.amount}
              currencySymbol={notification.quote_token_symbol}
              currencyAddress={notification.quote_token_address}
            />
            <span className="text-gray-6">
              (<Value value={notification.data.amount_usd} prefix="$" />)
            </span>
            debt in
            <Link
              to={buildLink(`/pools/${notification.pool_address}`)}
              className="text-purple-6 hover:underline"
            >
              <PoolName
                collateralSymbol={notification.collateral_token_symbol}
                collateralAddress={notification.collateral_token_address}
                quoteSymbol={notification.quote_token_symbol}
                quoteAddress={notification.quote_token_address}
                size="sm"
              />
            </Link>
          </div>
        </>
      );
      break;

    case "WalletAtRisk":
      content = (
        <>
          <div className="font-syncopate uppercase text-sm mb-2">Wallet at Risk</div>
          <div className="gap-x-1 flex flex-wrap items-end mb-2">
            <PoolName
              collateralSymbol={notification.collateral_token_symbol}
              collateralAddress={notification.collateral_token_address}
              quoteSymbol={notification.quote_token_symbol}
              quoteAddress={notification.quote_token_address}
              size="sm"
            />
            wallet
            <Link
              to={buildLink(
                `/wallets/${notification.data.wallet_address.toLowerCase()}/${
                  notification.pool_address
                }`,
              )}
              className="text-purple-6 hover:underline"
            >
              <Address address={notification.data.wallet_address} />
            </Link>
            is at risk of being liquidated
            <Link
              to={buildLink(`/pools/${notification.pool_address}`)}
              className="text-purple-6 hover:underline"
            ></Link>
          </div>
          <div className="flex gap-x-5 mb-2">
            <div>
              <div className="text-gray-6 text-xs">Collateral</div>
              <div className="text-sm flex items-center">
                <CurrencyValue
                  value={notification.data.collateral}
                  currencySymbol={notification.collateral_token_symbol}
                  currencyAddress={notification.collateral_token_address}
                />
              </div>
            </div>
            <div>
              <div className="text-gray-6 text-xs">Debt</div>
              <div className="text-sm flex items-center">
                <CurrencyValue
                  value={notification.data.debt}
                  currencySymbol={notification.quote_token_symbol}
                  currencyAddress={notification.quote_token_address}
                />
              </div>
            </div>
          </div>
        </>
      );
      break;

    default:
    // pass
  }

  return <>{content}</>;
};

const Notifications = () => {
  usePageTitle("Notifications");
  const pageSize = 10;
  const [page, setPage] = useState(1);

  const { data = {}, error } = useFetch("/notifications/", {
    p: page,
    p_size: pageSize,
  });

  if (error) {
    return <p>Failed to load data</p>;
  }

  const { results, count } = data;

  const totalPages = Math.ceil(count / pageSize);

  return (
    <>
      {count === 0 ? <span className="text-gray-6">No notifications</span> : null}

      {results?.map((row) => (
        <CardOpaque className="mb-5" key={row.key}>
          <NotificationFormatter notification={row} />

          <div className="flex">
            <div className="text-sm text-gray-6">
              <DateTimeAgo dateTime={DateTime.fromISO(row.datetime)} />
            </div>
          </div>
        </CardOpaque>
      ))}

      {totalPages > 1 ? (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
          className="mt-6"
        />
      ) : null}
    </>
  );
};

export default Notifications;

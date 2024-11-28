import { useParams, useLocation, Link } from "react-router-dom";
import { useFetch, useLinkBuilder } from "@/hooks";
import CryptoIcon from "@/components/icon/CryptoIcon";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import GenericPlaceholder from "@/components/GenericPlaceholder";
import SecondaryButton from "@/components/button/SecondaryButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { generateEtherscanUrl, smartLocationParts } from "@/utils/url";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import Tag from "@/components/tags/Tag";
import Value from "@/components/value/Value";
import ExternalLink from "@/components/externalLink/ExternalLink";
import CopyToClipboard from "@/components/copyToClipboard/CopyToClipboard";
import CardBackground from "@/components/card/CardBackground";
import Address from "@/components/address/Address";
import PoolName from "@/components/poolName/PoolName";
import Events from "./Events";
import AuctionStats from "./AuctionStats";
import Kpi from "@/components/kpis/Kpi";

const Auction = () => {
  const { auction_uid } = useParams();
  const location = useLocation();
  const { network } = smartLocationParts(location);
  const buildLink = useLinkBuilder();

  const { data = {}, error, isLoading } = useFetch(`/auctions/${auction_uid}/`);
  if (error) {
    return <p>Failed to load data</p>;
  }
  if (isLoading) {
    return <GenericPlaceholder />;
  }

  return (
    <>
      <section className="flex items-center justify-center sm:justify-end md:justify-between mb-10">
        <Breadcrumbs />
      </section>

      <div className="flex flex-col sm:flex-row text-2xl items-center font-syncopate uppercase gap-2 mb-5">
        <PoolName
          collateralSymbol={data.collateral_token_symbol}
          quoteSymbol={data.quote_token_symbol}
          size="xl"
        />
        Auction
      </div>

      {!data.settled ? (
        <div className="flex justify-between">
          <div className="inline-block">
            <Tag className="flex">
              <span className="pr-2">LUP:</span>
              <Value value={data.lup} suffix={data.quote_token_symbol} />
            </Tag>
          </div>
          <SecondaryButton
            text={
              <>
                View in app
                <FontAwesomeIcon
                  icon={faArrowUpRightFromSquare}
                  size="xs"
                  className="ms-2"
                />
              </>
            }
            href={`https://app.ajna.finance/pools/${data.pool_address}/auctions`}
          />
        </div>
      ) : null}

      <AuctionStats data={data} className="mt-5 mb-5" />

      <div className="flex flex-col lg:flex-row md:gap-4">
        <CardBackground className="lg:w-1/3 col-span-2 mb-10 grid grid-cols-1 place-content-between">
          <div>
            <h3 className="text-sm font-bold text-gray-1 font-syncopate uppercase mb-3">
              Info
            </h3>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm">Borrower</span>
              <div className="flex">
                <ExternalLink href={generateEtherscanUrl(network, data.borrower)}>
                  <CryptoIcon name="etherscan" size={16} />
                </ExternalLink>
                <CopyToClipboard className="mx-3" text={data.borrower} />

                <Link
                  className="text-purple-6 hover:underline"
                  to={buildLink(`/wallets/${data.borrower}`)}
                >
                  <Address address={data.borrower} />
                </Link>
              </div>
            </div>

            {data.borrower !== data.borrower_eoa ? (
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">Borrower EOA</span>
                <div className="flex">
                  <ExternalLink href={generateEtherscanUrl(network, data.borrower_eoa)}>
                    <CryptoIcon name="etherscan" size={16} />
                  </ExternalLink>
                  <CopyToClipboard className="mx-3" text={data.borrower_eoa} />
                  <Address address={data.borrower_eoa} />
                </div>
              </div>
            ) : null}

            <div className="flex justify-between items-center mb-2">
              <span className="text-sm">Kicker</span>
              <div className="flex">
                <ExternalLink href={generateEtherscanUrl(network, data.kicker)}>
                  <CryptoIcon name="etherscan" size={16} />
                </ExternalLink>
                <CopyToClipboard className="mx-3" text={data.kicker} />

                <Address address={data.kicker} />
              </div>
            </div>

            <div className="flex justify-between items-center mb-2">
              <span className="text-sm">Pool</span>
              <div className="flex">
                <ExternalLink href={generateEtherscanUrl(network, data.pool_address)}>
                  <CryptoIcon name="etherscan" size={16} />
                </ExternalLink>
                <CopyToClipboard className="mx-3" text={data.pool_address} />
                <Link
                  className="text-purple-6 hover:underline"
                  to={buildLink(`/pools/${data.pool_address}`)}
                >
                  <Address address={data.pool_address} />
                </Link>
              </div>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <Kpi
                title="Neutral Price"
                value={
                  <Value value={data.neutral_price} suffix={data.quote_token_symbol} />
                }
              />
            </div>
            <div className="text-xs text-gray-13 text-end pt-5">
              * price is calculated using USD market price at kick time
            </div>
          </div>
        </CardBackground>
        <div className="lg:w-2/3 mb-10">
          <h3 className="text-lg font-bold text-gray-1 font-syncopate uppercase mb-4">
            Activity
          </h3>
          <Events
            auction_uid={auction_uid}
            quoteTokenSymbol={data.quote_token_symbol}
            collateralTokenSymbol={data.collateral_token_symbol}
          />
        </div>
      </div>
    </>
  );
};

export default Auction;

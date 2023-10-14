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
import Stats from "@/components/stats/Stats";
import CardBackground from "@/components/card/CardBackground";
import Address from "@/components/address/Address";
import Events from "./Events";

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

  const stats = [
    {
      title: "Collateral",
      value: (
        <Value value={data.collateral} suffix={data.collateral_token_symbol} big />
      ),
      smallValue: (
        <>
          {!data.settled ? (
            <>
              <span className="pr-1">Remaining:</span>
              <Value
                value={data.collateral_remaining}
                suffix={data.collateral_token_symbol}
              />
            </>
          ) : null}
        </>
      ),
    },
    {
      title: "Debt",
      value: <Value value={data.debt} suffix={data.quote_token_symbol} big />,
      smallValue: (
        <>
          {!data.settled ? (
            <>
              <span className="pr-1">Remaining:</span>
              <Value value={data.debt_remaining} suffix={data.quote_token_symbol} />
            </>
          ) : null}
        </>
      ),
    },
    {
      title: "Bond",
      value: <Value value={data.bond} suffix={data.quote_token_symbol} big />,
    },
  ];

  return (
    <>
      <section className="flex items-center justify-center sm:justify-end md:justify-between mb-10">
        <Breadcrumbs />
      </section>

      <div className="flex items-center justify-between">
        <h1 className="flex text-xl md:text-1xl xl:text-2xl">
          <span className="relative hidden sm:flex">
            <CryptoIcon name={data.collateral_token_symbol} className="z-10" />
            <CryptoIcon
              name={data.quote_token_symbol}
              className="relative left-[-10px] z-0"
            />
          </span>
          <span className="font-medium pr-4">
            {data.collateral_token_symbol} / {data.quote_token_symbol}
          </span>
          Auction
        </h1>

        {!data.settled ? (
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
        ) : null}
      </div>

      {!data.settled ? (
        <div className="inline-block mt-3">
          <Tag className="flex">
            <span className="pr-2">LUP:</span>
            <Value value={data.lup} suffix={data.quote_token_symbol} />
          </Tag>
        </div>
      ) : null}

      <Stats data={stats} className="mt-10 mb-10" />

      <div className="flex flex-col md:flex-row md:gap-4">
        <CardBackground className="md:w-1/3 col-span-2 mb-10 grid grid-cols-1 place-content-between">
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
        </CardBackground>
        <div className="md:w-2/3 mb-10">
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

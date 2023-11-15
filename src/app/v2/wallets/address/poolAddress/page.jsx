import { useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { usePageTitle } from "@/hooks";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import GenericPlaceholder from "@/components/GenericPlaceholder";
import { useFetch, useLinkBuilder } from "@/hooks";
import { shorten } from "@/utils/address";
import Address from "@/components/address/Address";
import CopyToClipboard from "@/components/copyToClipboard/CopyToClipboard";
import { generateEtherscanUrl, smartLocationParts } from "@/utils/url";
import Stats from "@/components/stats/Stats";
import Value from "@/components/value/Value";
import ValueChange from "@/components/value/ValueChange";
import DisplaySwitch from "@/components/switch/DisplaySwitch";
import CryptoIcon from "@/components/icon/CryptoIcon";
import { faInfinity } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HistoricGraphs from "./HistoricGraphs";
import CardBackground from "@/components/card/CardBackground";
import Tag from "@/components/tags/Tag";
import Kpi from "@/components/kpis/Kpi";
import Info from "@/components/info/Info";
import ExternalLink from "@/components/externalLink/ExternalLink";
import PoolName from "@/components/poolName/PoolName";
import Events from "./Events";
import Buckets from "./Buckets";

const WalletPoolPosition = () => {
  const buildLink = useLinkBuilder();
  const location = useLocation();
  const { network } = smartLocationParts(location);
  const { address, poolAddress } = useParams();
  const [daysAgo, setDaysAgo] = useState(1);

  const {
    data = {},
    error,
    isLoading,
  } = useFetch(`/wallets/${address}/pools/${poolAddress}/`, { days_ago: daysAgo });

  usePageTitle(`Wallet ${shorten(address)}`);

  if (error) {
    return <p>Failed to load data</p>;
  }
  if (isLoading) {
    return <GenericPlaceholder />;
  }

  const stats = [
    {
      title: "Deposited",
      value: (
        <>
          <Value
            value={data.supply}
            suffix={data.quote_token_symbol}
            className="pe-3"
          />
          <ValueChange
            value={data.supply - data.prev_supply}
            suffix={data.quote_token_symbol}
          />
        </>
      ),
      smallValue: (
        <>
          <Value value={data.supply_usd} prefix="$" className="pe-3" />
          <ValueChange value={data.supply_usd - data.prev_supply_usd} prefix="$" />
        </>
      ),
    },
    {
      title: "Borrowed",
      value: (
        <>
          <Value value={data.debt} suffix={data.quote_token_symbol} className="pe-3" />
          <ValueChange
            value={data.debt - data.prev_debt}
            suffix={data.quote_token_symbol}
          />
        </>
      ),
      smallValue: (
        <>
          <Value value={data.debt_usd} prefix="$" className="pe-3" />
          <ValueChange value={data.debt_usd - data.prev_debt_usd} prefix="$" />
        </>
      ),
    },
    {
      title: "Collateral",
      value: (
        <>
          <Value
            value={data.collateral}
            suffix={data.collateral_token_symbol}
            className="pe-3"
          />
          <ValueChange
            value={data.collateral - data.prev_collateral}
            suffix={data.collateral_token_symbol}
          />
        </>
      ),
      smallValue: (
        <>
          <Value value={data.collateral_usd} prefix="$" className="pe-3" />
          <ValueChange
            value={data.collateral_usd - data.prev_collateral_usd}
            prefix="$"
          />
        </>
      ),
    },
    {
      title: (
        <span>
          Health Rate
          <Info className="ms-2" title="Health Rate">
            Calculated as LUP / (loan debt / loan collateral). If value is &lt;1, loan
            is undercollateralized and can be Kicked into auction.
          </Info>
        </span>
      ),
      value: (
        <>
          {data.in_liquidation ? (
            <Tag>In Liquidation</Tag>
          ) : (
            <>
              {data.health_rate ? (
                <Value value={data.health_rate} decimals={3} />
              ) : (
                <FontAwesomeIcon icon={faInfinity} />
              )}
            </>
          )}
        </>
      ),
    },
  ];

  return (
    <>
      <section className="flex items-center justify-between mb-10">
        <Breadcrumbs />
        <DisplaySwitch onChange={setDaysAgo} activeOption={daysAgo} />
      </section>

      <h1 className="text-xl md:text-1xl xl:text-2xl mb-5 flex gap-x-3">
        <PoolName
          collateralSymbol={data.collateral_token_symbol}
          quoteSymbol={data.quote_token_symbol}
          size="xl"
        />
        <div>
          Wallet <Address address={address} />
        </div>
      </h1>

      <Stats data={stats} className="mb-10" />

      <div className="flex flex-col-reverse md:flex-row md:gap-4">
        <CardBackground className="md:w-1/3 grid grid-cols-1 place-content-between mb-10">
          <div>
            <h3 className="text-sm font-bold text-gray-1 font-syncopate uppercase mb-3">
              Info
            </h3>
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
          <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
            <Kpi
              title="LUP"
              value={<Value value={data.lup} suffix={data.quote_token_symbol} />}
            />
            <Kpi
              title="Neutral Price"
              value={
                <Value
                  value={data.neutral_price}
                  suffix={data.quote_token_symbol}
                  dashIfZero
                />
              }
            />
            <Kpi
              title="Threshold Price"
              value={
                <Value value={data.threshold_price} suffix={data.quote_token_symbol} />
              }
            />
            <Kpi
              title="Deposit Share"
              value={<Value value={data.supply_share * 100} suffix="%" />}
            />
            <Kpi
              title="Debt Share"
              value={<Value value={data.debt_share * 100} suffix="%" dashIfZero />}
            />
          </div>
        </CardBackground>
        <CardBackground className="md:w-2/3 mb-10">
          <HistoricGraphs
            address={address}
            poolAddress={poolAddress}
            collateralTokenSymbol={data.collateral_token_symbol}
            quoteTokenSymbol={data.quote_token_symbol}
          />
        </CardBackground>
      </div>

      <div className="flex flex-col-reverse md:flex-row md:gap-4 items-baseline">
        <div className="md:w-1/3 grid grid-cols-1 mb-10">
          <Buckets
            address={address}
            poolAddress={poolAddress}
            quoteTokenSymbol={data.quote_token_symbol}
          />
        </div>
        <div className="md:w-2/3 grid grid-cols-1 mb-10">
          <Events address={address} poolAddress={poolAddress} />
        </div>
      </div>
    </>
  );
};

export default WalletPoolPosition;

import { useParams, useLocation } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import GenericPlaceholder from "@/components/GenericPlaceholder";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import CardBackground from "@/components/card/CardBackground";
import CopyToClipboard from "@/components/copyToClipboard/CopyToClipboard";
import CryptoIcon from "@/components/icon/CryptoIcon";
import EtherscanIcon from "@/components/icon/EtherscanIcon";
import Info from "@/components/info/Info";
import DisplaySwitch from "@/components/switch/DisplaySwitch";
import Tag from "@/components/tags/Tag";
import Value from "@/components/value/Value";
import CurrencyValue from "@/components/value/CurrencyValue";
import ValueChange from "@/components/value/ValueChange";
import Tabs from "@/components/tabs/Tabs";
import Address from "@/components/address/Address";
import { useFetch, usePageTitle, useQueryParams } from "@/hooks";
import { DateTime } from "luxon";
import BucketsGraph from "./BucketsGraph";
import HistoricGraphs from "./HistoricGraphs";
import HistoricRateGraphs from "./HistoricRateGraphs";
import PoolEvents from "./PoolEvents";
import PoolInfo from "./PoolInfo";
import TopDepositors from "./TopDepositors";
import TopBorrowers from "./TopBorrowers";
import AllowedTokenIds from "./AllowedTokenIds";
import Auctions from "./Auctions";
import ExternalLink from "@/components/externalLink/ExternalLink";
import { generateEtherscanUrl, smartLocationParts } from "@/utils/url";
import PoolName from "@/components/poolName/PoolName";
import Kpi from "@/components/kpis/Kpi";
import AtRiskGraphs from "./AtRiskGraphs";

const Pool = () => {
  const { address } = useParams();

  const location = useLocation();
  const { network } = smartLocationParts(location);
  const { queryParams, setQueryParams } = useQueryParams();
  const daysAgo = parseInt(queryParams.get("daysAgo")) || 1;
  const [activeWalletsTab, setActiveWalletsTab] = useState("depositors");

  const {
    data = {},
    error,
    isLoading,
  } = useFetch(`/pools/${address}/`, {
    days_ago: daysAgo,
  });

  const { results: pool } = data;

  usePageTitle(
    pool ? `${pool.collateral_token_symbol} / ${pool.quote_token_symbol}` : "Pool",
  );

  if (error) {
    return <p>Failed to load data</p>;
  }
  if (isLoading) {
    return <GenericPlaceholder />;
  }

  const onDisplaySwitchChange = (value) => {
    setQueryParams({ daysAgo: value });
  };

  const currentCollateralPrice = pool.quote_token_underlying_price
    ? pool.collateral_token_underlying_price / pool.quote_token_underlying_price
    : 0;

  const prevCollateralPrice = pool.prev_quote_token_price
    ? pool.prev_collateral_token_price / pool.prev_quote_token_price
    : 0;

  const walletsTabs = {
    depositors: {
      title: "Depositors",
      content: <TopDepositors address={address} daysAgo={daysAgo} />,
    },
    borrowers: {
      title: "Borrowers",
      content: <TopBorrowers address={address} daysAgo={daysAgo} />,
    },
  };

  return (
    <>
      <section className="flex items-center justify-center sm:justify-end md:justify-between mb-10">
        <Breadcrumbs />
        <DisplaySwitch
          onChange={onDisplaySwitchChange}
          activeOption={daysAgo}
          newOptions
        />
      </section>

      <div className="flex flex-col sm:flex-row justify-between">
        <div className="flex items-center mb-5">
          <PoolName
            collateralSymbol={pool.collateral_token_symbol}
            collateralAddress={pool.collateral_token_address}
            quoteSymbol={pool.quote_token_symbol}
            quoteAddress={pool.quote_token_address}
            size="xl"
            className="font-syncopate"
          />
          {pool.erc === "erc721" ? (
            <Tag size="md" className="ms-4">
              NFT {pool.allowed_token_ids?.length > 0 ? "Subset" : "Collection"} Pool
            </Tag>
          ) : null}
        </div>

        <div className="flex items-center mb-5">
          <Tag className="flex">
            <CryptoIcon
              address={pool.collateral_token_address}
              alt={pool.collateral_token_symbol}
              size="20"
              className="mr-2"
            />
            1 {pool.collateral_token_symbol}
            <span className="px-1">=</span>
            <CurrencyValue
              value={pool.lup}
              currencySymbol={pool.quote_token_symbol}
              currencyAddress={pool.quote_token_address}
            />
            <div>
              <Info className="ms-2" title="Token price">
                Token price is based on Lowest Utilized Price
              </Info>
            </div>
          </Tag>
        </div>
      </div>

      {pool.collateral_token_is_estimated_price ? (
        <div className="text-xs text-gray-13 text-end mb-5">
          USD prices are an estimation
          <Info className="ms-2" title="USD Prices">
            <p className="mb-2">
              Current USD prices are an estimation as we couldn&apos;t fetch the actual
              price.
            </p>
            <p className="mb-2">
              For stablecoins, we use $1 and for others we estimate the price based on
              the formula below from all the pools:
            </p>
            <code>MIN(HPB * &lt;quote token USD price&gt;)</code>
          </Info>
        </div>
      ) : null}

      <div>
        {pool.erc === "erc721" && pool.allowed_token_ids?.length > 0 ? (
          <AllowedTokenIds
            tokenIds={pool.allowed_token_ids}
            collateralTokenSymbol={pool.collateral_token_symbol}
            collateralTokenAddress={pool.collateral_token_address}
            className="mb-5"
          />
        ) : null}
      </div>

      <PoolInfo data={pool} className="mb-5" />

      <div className="flex flex-col-reverse lg:flex-row lg:gap-4">
        <CardBackground className="lg:w-1/3 grid grid-cols-1 place-content-between mb-5">
          <div>
            <h3 className="text-sm font-bold text-gray-1 font-syncopate uppercase mb-5">
              Total tokens locked
            </h3>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <span className="font-bold text-sm">
                  {pool.collateral_token_symbol}
                </span>
              </div>
              <div>
                <div className="flex space-x-2">
                  <Value
                    value={pool.collateral_usd}
                    small
                    prefix="$"
                    className="text-gray-10"
                  />
                  <CurrencyValue
                    value={pool.collateral}
                    currencySymbol={pool.collateral_token_symbol}
                    currencyAddress={pool.collateral_token_address}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <span className="font-bold text-sm">{pool.quote_token_symbol}</span>
              </div>
              <div className="flex space-x-2">
                <Value
                  value={pool.quote_token_balance_usd}
                  small
                  prefix="$"
                  className="text-gray-10"
                />
                <CurrencyValue
                  value={pool.quote_token_balance}
                  currencySymbol={pool.quote_token_symbol}
                  currencyAddress={pool.quote_token_address}
                />
              </div>
            </div>

            <div className="flex flex-col items-baseline mb-5">
              <div className="flex justify-between w-full items-center mb-1">
                <span className="text-sm flex items-center">
                  <CryptoIcon
                    alt={pool.collateral_token_symbol}
                    address={pool.collateral_token_address}
                    size={16}
                    className="mr-1"
                  />
                  {pool.collateral_token_symbol} address
                </span>
                <div className="flex items-center">
                  <ExternalLink
                    href={generateEtherscanUrl(network, pool.collateral_token_address)}
                    className="mr-3"
                  >
                    <EtherscanIcon network={network} size={16} />
                  </ExternalLink>
                  <CopyToClipboard
                    className="mr-3"
                    text={pool.collateral_token_address}
                  />
                  <Address address={pool.collateral_token_address} />
                </div>
              </div>
              <div className="flex justify-between w-full items-center">
                <span className="text-sm flex items-center">
                  <CryptoIcon
                    alt={pool.quote_token_symbol}
                    address={pool.quote_token_address}
                    size={16}
                    className="mr-1"
                  />
                  {pool.quote_token_symbol} address
                </span>
                <div className="flex items-center">
                  <ExternalLink
                    href={generateEtherscanUrl(network, pool.quote_token_address)}
                    className="mr-3"
                  >
                    <EtherscanIcon network={network} size={16} />
                  </ExternalLink>
                  <CopyToClipboard className="mr-3" text={pool.quote_token_address} />
                  <Address address={pool.quote_token_address} />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <Kpi
              title="TVL"
              value={
                <Value value={pool.tvl} prefix="$" className="text-xl" dashIfZero />
              }
              smallValue={<ValueChange value={pool.tvl - pool.prev_tvl} prefix="$" />}
            />
            <Kpi
              title={
                <span>
                  Volume (today)
                  <Info className="ms-2" title="Volume (today)">
                    Total volume on date {DateTime.now().toFormat("LLL dd, y")}
                  </Info>
                </span>
              }
              value={
                <Value
                  value={pool.volume ? pool.volume : 0}
                  className="text-xl"
                  prefix="$"
                />
              }
            />
            <Kpi
              title="Reserves"
              value={
                <CurrencyValue
                  value={pool.reserves ? pool.reserves : 0}
                  className="text-xl"
                  currencySymbol={pool.quote_token_symbol}
                  currencyAddress={pool.quote_token_address}
                />
              }
              smallValue={
                <CurrencyValue
                  value={pool.reserves - pool.prev_reserves}
                  currencySymbol={pool.quote_token_symbol}
                  currencyAddress={pool.quote_token_address}
                  trend
                />
              }
            />
            <Kpi
              title="Ajna Burned"
              value={
                <Value
                  value={pool.total_ajna_burned}
                  prefix={"🔥 "}
                  className="text-xl"
                />
              }
              smallValue={
                <ValueChange
                  value={pool.total_ajna_burned - pool.prev_total_ajna_burned}
                  prefix={"🔥 "}
                />
              }
            />
          </div>
        </CardBackground>

        <CardBackground className="lg:w-2/3 col-span-2 mb-5 grid grid-cols-1 place-content-between">
          <HistoricGraphs
            address={address}
            daysAgo={daysAgo}
            collateralSymbol={pool.collateral_token_symbol}
            collateralAddress={pool.collateral_token_address}
            quoteSymbol={pool.quote_token_symbol}
            quoteAddress={pool.quote_token_address}
          />
        </CardBackground>
      </div>

      <div className="flex flex-col lg:flex-row lg:gap-4">
        <CardBackground className="lg:w-2/3 col-span-2 mb-10 grid grid-cols-1 place-content-between mb-5">
          <HistoricRateGraphs
            address={address}
            daysAgo={daysAgo}
            collateralSymbol={pool.collateral_token_symbol}
            quoteSymbol={pool.quote_token_symbol}
          />
        </CardBackground>
        <CardBackground className="lg:w-1/3 grid grid-cols-1 place-content-between mb-5">
          <div>
            <h3 className="text-sm font-bold text-gray-1 font-syncopate uppercase mb-3">
              Pool info
            </h3>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm">Min. debt amount</span>
              <CurrencyValue
                value={pool.min_debt_amount}
                currencySymbol={pool.quote_token_symbol}
                currencyAddress={pool.quote_token_address}
              />
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm">Utilization</span>
              <Value value={pool.utilization * 100} suffix="%" dashIfZero />
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm">Collateralization</span>
              <Value value={pool.collateralization * 100} suffix="%" dashIfZero />
            </div>

            <div className="flex justify-between items-center mb-2">
              <span className="text-sm">Pool address</span>
              <div className="flex">
                <ExternalLink
                  href={generateEtherscanUrl(network, pool.address)}
                  className="mr-3"
                >
                  <EtherscanIcon network={network} size={16} />
                </ExternalLink>
                <CopyToClipboard className="mr-3" text={pool.address} />

                <Address address={pool.address} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <Kpi
              title="Lend APR"
              value={<Value value={pool.lend_rate * 100} suffix="%" />}
              smallValue={
                <ValueChange
                  value={(pool.lend_rate - pool.prev_lend_rate) * 100}
                  suffix="%"
                />
              }
            />
            <Kpi
              title="Borrow APR"
              value={<Value value={pool.borrow_rate * 100} suffix="%" />}
              smallValue={
                <ValueChange
                  value={(pool.borrow_rate - pool.prev_borrow_rate) * 100}
                  suffix="%"
                />
              }
            />

            <Kpi
              title={
                <>
                  MAU
                  <Info className="ms-2" title="Meaningful Actual Utilization (MAU)">
                    The ratio of the 12 hour EMA of debt to the 12 hour EMA of
                    meaningful deposit, where meaningful deposit is the amount of
                    deposit priced at or above the average threshold price of all loans,
                    weighted by their debt.
                  </Info>
                </>
              }
              value={
                <Value value={pool.actual_utilization * 100} suffix="%" dashIfZero />
              }
              smallValue={
                <ValueChange
                  value={(pool.actual_utilization - pool.prev_actual_utilization) * 100}
                  suffix="%"
                />
              }
            />

            <Kpi
              title={
                <>
                  TU
                  <Info className="ms-2" title="Target Utilization (TU)">
                    The ratio of the 3.5 day EMA of system debt to 3.5 day EMA of
                    LUP*totalCollateral. This may be sampled every half day to determine
                    whether an interest rate update is available.
                  </Info>
                </>
              }
              value={
                <Value value={pool.target_utilization * 100} suffix="%" dashIfZero />
              }
              smallValue={
                <ValueChange
                  value={(pool.target_utilization - pool.prev_target_utilization) * 100}
                  suffix="%"
                />
              }
            />
          </div>
        </CardBackground>
      </div>

      <div className="flex flex-col-reverse lg:flex-row lg:gap-4">
        <CardBackground className="lg:w-1/3 grid grid-cols-1 place-content-between mb-5">
          <div>
            <div className="flex justify-between">
              <h3 className="text-sm font-bold text-gray-1 font-syncopate uppercase mb-5">
                Buckets
              </h3>
              <div className="text-purple-6 hover:underline">
                <Link to={"buckets"}>View more</Link>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <span className="text-sm">Collateral in buckets</span>
                </div>
                <div>
                  <div className="flex space-x-2">
                    <Value
                      value={pool.collateral_usd - pool.pledged_collateral_usd}
                      small
                      prefix="$"
                      className="text-gray-10"
                    />
                    <CurrencyValue
                      value={pool.collateral - pool.pledged_collateral}
                      currencySymbol={pool.collateral_token_symbol}
                      currencyAddress={pool.collateral_token_address}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <Kpi
              title="Market Price"
              value={
                <div className="flex flex-col">
                  <CurrencyValue
                    value={currentCollateralPrice}
                    currencySymbol={pool.quote_token_symbol}
                    currencyAddress={pool.quote_token_address}
                    compact100k={true}
                    compact={false}
                    dashIfZero
                  />

                  <CurrencyValue
                    value={currentCollateralPrice - prevCollateralPrice}
                    currencySymbol={pool.quote_token_symbol}
                    currencyAddress={pool.quote_token_address}
                    compact100k={true}
                    compact={false}
                    className="text-sm"
                    trend
                  />
                </div>
              }
              smallValue={
                <Value
                  value={pool.collateral_token_underlying_price}
                  prefix="$"
                  compact100k={true}
                  compact={false}
                  hideIfZero
                />
              }
            />
            <Kpi
              title={
                <span>
                  LUP
                  <Info className="ms-2" title="Lowest Utilized Price (LUP)">
                    The LUP is the lowest price bucket where there is a utilized
                    deposit. It could also be seen as the price of the marginal (lowest
                    priced and therefore least aggressive) lender matched with a
                    borrower.
                  </Info>
                </span>
              }
              value={
                <div className="flex flex-col">
                  <CurrencyValue
                    value={pool.lup}
                    currencySymbol={pool.quote_token_symbol}
                    currencyAddress={pool.quote_token_address}
                    dashIfZero
                  />

                  <CurrencyValue
                    value={pool.lup - pool.prev_lup}
                    currencySymbol={pool.quote_token_symbol}
                    currencyAddress={pool.quote_token_address}
                    className="text-sm"
                    trend
                  />
                </div>
              }
              smallValue={<>Bucket #: {pool.lup_index ? pool.lup_index : "-"}</>}
            />
            <Kpi
              title={
                <span>
                  HTP
                  <Info className="ms-2" title="Highest Threshold Price (HTP)">
                    The threshold price of the least collateralized loan. Lender
                    deposits above the HTP earn interest.
                  </Info>
                </span>
              }
              value={
                <div className="flex flex-col">
                  <CurrencyValue
                    value={pool.htp}
                    currencySymbol={pool.quote_token_symbol}
                    currencyAddress={pool.quote_token_address}
                    dashIfZero
                  />

                  <CurrencyValue
                    value={pool.htp - pool.prev_htp}
                    currencySymbol={pool.quote_token_symbol}
                    currencyAddress={pool.quote_token_address}
                    className="text-sm"
                    trend
                  />
                </div>
              }
              smallValue={<>Bucket #: {pool.htp_index ? pool.htp_index : "-"}</>}
            />
            <Kpi
              title={
                <span>
                  HPB
                  <Info className="ms-2" title="Highest Price Bucket (HPB)">
                    The highest-priced bucket which contains a deposit, not counting
                    claimable collateral.
                  </Info>
                </span>
              }
              value={
                <div className="flex flex-col">
                  <CurrencyValue
                    value={pool.hpb}
                    currencySymbol={pool.quote_token_symbol}
                    currencyAddress={pool.quote_token_address}
                    dashIfZero
                  />

                  <CurrencyValue
                    CurrencyValue={pool.hpb - pool.prev_hpb}
                    currencySymbol={pool.quote_token_symbol}
                    currencyAddress={pool.quote_token_address}
                    className="text-sm"
                    trend
                  />
                </div>
              }
              smallValue={<>Bucket #: {pool.hpb_index ? pool.hpb_index : "-"}</>}
            />
          </div>
        </CardBackground>
        <CardBackground className="lg:w-2/3 col-span-2 mb-5 grid grid-cols-1 place-content-between">
          <BucketsGraph
            address={address}
            lupIndex={pool.lup_index}
            htpIndex={pool.htp_index}
          />
        </CardBackground>
      </div>

      <div className="flex flex flex-col lg:flex-row lg:gap-4 mt-5">
        <div className="lg:w-1/3 mb-5">
          <div className="mb-5">
            <h1 className="text-xl md:text-1xl xl:text-2xl">Positions</h1>
          </div>
          <Tabs
            tabs={walletsTabs}
            activeTab={activeWalletsTab}
            onTabChange={(value) => setActiveWalletsTab(value)}
          />
        </div>
        <PoolEvents address={address} className="lg:w-2/3 mb-10" />
      </div>
      <div className="mb-10">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-xl lg:text-1xl xl:text-2xl">Auctions</h1>
        </div>
        <Auctions poolAddress={address} />
      </div>

      <AtRiskGraphs
        poolAddress={address}
        collateralSymbol={pool.collateral_token_symbol}
        collateralAddress={pool.collateral_token_address}
      />
    </>
  );
};

export default Pool;

import { useParams, useLocation } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import GenericPlaceholder from "@/components/GenericPlaceholder";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import CardBackground from "@/components/card/CardBackground";
import CopyToClipboard from "@/components/copyToClipboard/CopyToClipboard";
import CryptoIcon from "@/components/icon/CryptoIcon";
import Info from "@/components/info/Info";
import DisplaySwitch from "@/components/switch/DisplaySwitch";
import Tag from "@/components/tags/Tag";
import Value from "@/components/value/Value";
import ValueChange from "@/components/value/ValueChange";
import TabCard from "@/components/tabs/TabCard";
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
import ExternalLink from "@/components/externalLink/ExternalLink";
import { generateEtherscanUrl, smartLocationParts } from "@/utils/url";
import PoolName from "@/components/poolName/PoolName";
import Kpi from "@/components/kpis/Kpi";

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
    pool ? `${pool.collateral_token_symbol} / ${pool.quote_token_symbol}` : "Pool"
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
        <DisplaySwitch onChange={onDisplaySwitchChange} activeOption={daysAgo} />
      </section>

      <div className="flex justify-between mb-5">
        <div className="flex items-center">
          <PoolName
            collateralSymbol={pool.collateral_token_symbol}
            quoteSymbol={pool.quote_token_symbol}
            size="xl"
            className="font-syncopate"
          />
          {pool.erc === "erc721" ? (
            <Tag size="md" className="ms-4">
              NFT {pool.allowed_token_ids?.length > 0 ? "Subset" : "Collection"} Pool
            </Tag>
          ) : null}
        </div>

        <div>
          <Tag className="flex">
            <CryptoIcon
              name={pool.collateral_token_symbol}
              size="20"
              className="mr-1"
            />
            1 {pool.collateral_token_symbol}
            <span className="px-1">=</span>
            <Value value={pool.lup} suffix={pool.quote_token_symbol} icon={false} />
            <div>
              <Info className="ms-2" title="Token price">
                Token price is based on Lowest Utilized Price
              </Info>
            </div>
          </Tag>
        </div>
      </div>

      <div>
        {pool.erc === "erc721" && pool.allowed_token_ids?.length > 0 ? (
          <AllowedTokenIds
            tokenIds={pool.allowed_token_ids}
            collateralTokenSymbol={pool.collateral_token_symbol}
            className="mb-5"
          />
        ) : null}
      </div>

      <PoolInfo data={pool} className="mb-10" />
      <div className="flex flex-col-reverse md:flex-row md:gap-4">
        <CardBackground className="md:w-1/3 grid grid-cols-1 place-content-between mb-10">
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
                    value={pool.pledged_collateral_usd}
                    small
                    prefix="$"
                    className="text-gray-10"
                  />
                  <Value
                    value={pool.pledged_collateral}
                    suffix={pool.collateral_token_symbol}
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
                <Value
                  value={pool.quote_token_balance}
                  suffix={pool.quote_token_symbol}
                />
              </div>
            </div>

            <div className="flex flex-col items-baseline mb-5">
              <div className="flex justify-between w-full items-center mb-1">
                <span className="text-sm flex items-center">
                  <CryptoIcon
                    name={pool.collateral_token_symbol}
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
                    <CryptoIcon name="etherscan" size={16} />
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
                    name={pool.quote_token_symbol}
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
                    <CryptoIcon name="etherscan" size={16} />
                  </ExternalLink>
                  <CopyToClipboard className="mr-3" text={pool.quote_token_address} />
                  <Address address={pool.quote_token_address} />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
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
                <Value
                  value={pool.reserves ? pool.reserves : 0}
                  className="text-xl"
                  suffix={pool.quote_token_symbol}
                />
              }
              smallValue={
                <ValueChange
                  value={pool.reserves - pool.prev_reserves}
                  suffix={pool.quote_token_symbol}
                />
              }
            />
            <Kpi
              title="Ajna Burned"
              value={
                <Value
                  value={pool.total_ajna_burned}
                  prefix={"🔥 "}
                  icon={false}
                  className="text-xl"
                />
              }
              smallValue={
                <ValueChange
                  value={pool.total_ajna_burned - pool.prev_total_ajna_burned}
                  prefix={"🔥 "}
                  icon={false}
                />
              }
            />
          </div>
        </CardBackground>

        <CardBackground className="md:w-2/3 col-span-2 mb-10 grid grid-cols-1 place-content-between">
          <HistoricGraphs
            address={address}
            daysAgo={daysAgo}
            collateralSymbol={pool.collateral_token_symbol}
            quoteSymbol={pool.quote_token_symbol}
          />
        </CardBackground>
      </div>

      <div className="flex flex-col md:flex-row md:gap-4">
        <CardBackground className="md:w-2/3 col-span-2 mb-10 grid grid-cols-1 place-content-between">
          <HistoricRateGraphs
            address={address}
            daysAgo={daysAgo}
            collateralSymbol={pool.collateral_token_symbol}
            quoteSymbol={pool.quote_token_symbol}
          />
        </CardBackground>
        <CardBackground className="md:w-1/3 grid grid-cols-1 place-content-between mb-10">
          <div>
            <h3 className="text-sm font-bold text-gray-1 font-syncopate uppercase mb-3">
              Pool info
            </h3>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm">Min. debt amount</span>
              <Value value={pool.min_debt_amount} suffix={pool.quote_token_symbol} />
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
                  <CryptoIcon name="etherscan" size={16} />
                </ExternalLink>
                <CopyToClipboard className="mr-3" text={pool.address} />

                <Address address={pool.address} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
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

      <div className="flex flex-col-reverse md:flex-row md:gap-4">
        <CardBackground className="md:w-1/3 grid grid-cols-1 place-content-between mb-10">
          <div className="flex justify-between">
            <h3 className="text-sm font-bold text-gray-1 font-syncopate uppercase mb-5">
              Buckets
            </h3>
            <div className="text-purple-6 hover:underline">
              <Link to={"buckets"}>View more</Link>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
            <Kpi
              title="Market Price"
              value={
                <div className="flex flex-col">
                  <Value
                    value={currentCollateralPrice}
                    suffix={pool.quote_token_symbol}
                    compact100k={true}
                    compact={false}
                    dashIfZero
                  />

                  <ValueChange
                    value={currentCollateralPrice - prevCollateralPrice}
                    suffix={pool.quote_token_symbol}
                    compact100k={true}
                    compact={false}
                    className="text-sm"
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
                  <Value value={pool.lup} suffix={pool.quote_token_symbol} dashIfZero />

                  <ValueChange
                    value={pool.lup - pool.prev_lup}
                    suffix={pool.quote_token_symbol}
                    className="text-sm"
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
                  <Value value={pool.htp} suffix={pool.quote_token_symbol} dashIfZero />

                  <ValueChange
                    value={pool.htp - pool.prev_htp}
                    suffix={pool.quote_token_symbol}
                    className="text-sm"
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
                  <Value value={pool.hpb} suffix={pool.quote_token_symbol} dashIfZero />

                  <ValueChange
                    value={pool.hpb - pool.prev_hpb}
                    suffix={pool.quote_token_symbol}
                    className="text-sm"
                  />
                </div>
              }
              smallValue={<>Bucket #: {pool.hpb_index ? pool.hpb_index : "-"}</>}
            />
          </div>
        </CardBackground>
        <CardBackground className="md:w-2/3 col-span-2 mb-10 grid grid-cols-1 place-content-between">
          <BucketsGraph
            address={address}
            lupIndex={pool.lup_index}
            htpIndex={pool.htp_index}
          />
        </CardBackground>
      </div>

      <div className="flex flex md:gap-4">
        <div className="w-1/3">
          <div className="flex justify-between items-center mb-5">
            <h1 className="text-xl md:text-1xl xl:text-2xl">Positions</h1>
          </div>
          <TabCard
            tabs={walletsTabs}
            activeTab={activeWalletsTab}
            onTabChange={(value) => setActiveWalletsTab(value)}
          />
        </div>
        <PoolEvents address={address} className="mb-10 w-2/3" />
      </div>
    </>
  );
};

export default Pool;

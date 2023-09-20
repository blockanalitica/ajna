import { useParams, useLocation } from "react-router-dom";
import GenericPlaceholder from "@/components/GenericPlaceholder";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import CardBackground from "@/components/card/CardBackground";
import CardOpaque from "@/components/card/CardOpaque";
import CopyToClipboard from "@/components/copyToClipboard/CopyToClipboard";
import CryptoIcon from "@/components/icon/CryptoIcon";
import Info from "@/components/info/Info";
import DisplaySwitch from "@/components/switch/DisplaySwitch";
import Tag from "@/components/tags/Tag";
import Value from "@/components/value/Value";
import ValueChange from "@/components/value/ValueChange";
import { useFetch, usePageTitle, useQueryParams } from "@/hooks";
import { shorten } from "@/utils/address";
import { generateEtherscanUrl, smartLocationParts } from "@/utils/url";
import ExternalLink from "@/components/externalLink/ExternalLink";
import { DateTime } from "luxon";
import BucketsGraph from "./BucketsGraph";
import HistoricGraphs from "./HistoricGraphs";
import PoolBuckets from "./PoolBuckets";
import PoolEvents from "./PoolEvents";
import PoolInfo from "./PoolInfo";

const Pool = () => {
  const { address } = useParams();
  const location = useLocation();
  const { network } = smartLocationParts(location);

  const { queryParams, setQueryParams } = useQueryParams();
  const daysAgo = parseInt(queryParams.get("daysAgo")) || 1;

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

  return (
    <>
      <section className="flex items-center justify-center sm:justify-end md:justify-between mb-10">
        <Breadcrumbs />
        <DisplaySwitch onChange={onDisplaySwitchChange} activeOption={daysAgo} />
      </section>
      <div className="flex justify-between mb-5">
        <div className="flex items-center">
          <span className="relative flex">
            <CryptoIcon name={pool.collateral_token_symbol} className="z-10" />
            <CryptoIcon
              name={pool.quote_token_symbol}
              className="relative left-[-10px] z-0"
            />
          </span>

          <h1 className="pl-4 text-2xl">
            {pool.collateral_token_symbol} / {pool.quote_token_symbol}
          </h1>
        </div>
        <div className="flex items-baseline mb-5">
          <span className="text-gray-10 text-sm mr-4">Pool Address:</span>
          <span>{shorten(pool.address)}</span>
          <CopyToClipboard className="ml-3" text={pool.address} />
          <ExternalLink
            href={generateEtherscanUrl(network, pool.address)}
            className="ml-3"
          >
            <CryptoIcon name="etherscan" size={16} />
          </ExternalLink>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <Tag className="flex mb-5">
          <CryptoIcon name={pool.collateral_token_symbol} size="20" className="mr-1" />1{" "}
          {pool.collateral_token_symbol}
          <span className="px-1">=</span>
          <Value value={pool.lup} suffix={` ${pool.quote_token_symbol}`} icon={false} />
        </Tag>
        <div className="flex flex-col items-baseline mb-5">
          <div className="flex justify-between w-full items-center mb-1">
            <span className="text-gray-10 text-sm mr-4">
              <CryptoIcon
                name={pool.collateral_token_symbol}
                size="20"
                className="mr-1"
              />
            </span>
            <div className="flex items-center">
              <span>{shorten(pool.collateral_token_address)}</span>
              <CopyToClipboard className="ml-3" text={pool.collateral_token_address} />
              <ExternalLink
                href={generateEtherscanUrl(network, pool.collateral_token_address)}
                className="ml-3"
              >
                <CryptoIcon name="etherscan" size={16} />
              </ExternalLink>
            </div>
          </div>
          <div className="flex justify-between w-full items-center">
            <span className="text-gray-10 text-sm mr-4">
              <CryptoIcon name={pool.quote_token_symbol} size="20" className="mr-1" />
            </span>
            <div className="flex items-center">
              <span>{shorten(pool.quote_token_address)}</span>
              <CopyToClipboard className="ml-3" text={pool.quote_token_address} />
              <ExternalLink
                href={generateEtherscanUrl(network, pool.quote_token_address)}
                className="ml-3"
              >
                <CryptoIcon name="etherscan" size={16} />
              </ExternalLink>
            </div>
          </div>
        </div>
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
                    prefix={"$"}
                    className="text-gray-10"
                  />
                  <Value
                    value={pool.pledged_collateral}
                    suffix={pool.collateral_token_symbol}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="font-bold text-sm">{pool.quote_token_symbol}</span>
              </div>
              <div className="flex space-x-2">
                <Value
                  value={pool.quote_token_balance_usd}
                  small
                  prefix={"$"}
                  className="text-gray-10"
                />
                <Value
                  value={pool.quote_token_balance}
                  suffix={pool.quote_token_symbol}
                />
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-1 font-syncopate uppercase mt-5 mb-3">
              Pool info
            </h3>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <span className="text-sm">Lend APR</span>
              </div>
              <div>
                <Value value={pool.lend_rate * 100} suffix="%" />
              </div>
            </div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <span className="text-sm">Borrow APR</span>
              </div>
              <div>
                <Value value={pool.borrow_rate * 100} suffix="%" />
              </div>
            </div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <span className="text-sm">Min. debt amount</span>
              </div>
              <div>
                <Value value={pool.min_debt_amount} suffix={pool.quote_token_symbol} />
              </div>
            </div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <span className="text-sm">Utilization</span>
              </div>
              <div>
                <Value value={pool.utilization * 100} suffix="%" dashIfZero />
              </div>
            </div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <span className="text-sm">
                  Meaningful Actual Utilization
                  <Info className="ms-2" title="Meaningful Actual Utilization (MAU)">
                    The ratio of the 12 hour EMA of debt to the 12 hour EMA of
                    meaningful deposit, where meaningful deposit is the amount of
                    deposit priced at or above the average threshold price of all loans,
                    weighted by their debt.
                  </Info>
                </span>
              </div>
              <div>
                <Value value={pool.actual_utilization * 100} suffix="%" dashIfZero />
              </div>
            </div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <span className="text-sm">
                  Target Utilization
                  <Info className="ms-2" title="Target Utilization (TU)">
                    The ratio of the 3.5 day EMA of system debt to 3.5 day EMA of
                    LUP*totalCollateral. This may be sampled every half day to determine
                    whether an interest rate update is available.
                  </Info>
                </span>
              </div>
              <div>
                <Value value={pool.target_utilization * 100} suffix="%" dashIfZero />
              </div>
            </div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <span className=" text-sm">Collateralization</span>
              </div>
              <div>
                <Value value={pool.collateralization * 100} suffix="%" dashIfZero />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
            <CardOpaque title="TVL">
              <Value value={pool.tvl} prefix="$" className="text-xl" dashIfZero />
              <ValueChange value={pool.tvl - pool.prev_tvl} prefix="$" />
            </CardOpaque>
            <CardOpaque
              title={
                <span>
                  Volume (today)
                  <Info className="ms-2" title="Volume (today)">
                    Total volume on date {DateTime.now().toFormat("LLL dd, y")}
                  </Info>
                </span>
              }
            >
              <Value
                value={pool.volume ? pool.volume : 0}
                className="text-xl"
                prefix="$"
              />
            </CardOpaque>
            <CardOpaque title="Reserves">
              <Value
                value={pool.reserves ? pool.reserves : 0}
                className="text-xl"
                suffix={pool.quote_token_symbol}
                decimals={pool.reserves < 1 ? 5 : 2}
              />
              <ValueChange
                value={pool.reserves - pool.prev_reserves}
                suffix={pool.quote_token_symbol}
              />
            </CardOpaque>
            <CardOpaque title="Ajna Burned">
              <Value
                value={pool.total_ajna_burned}
                prefix={"🔥 "}
                icon={false}
                className="text-xl"
              />
              <ValueChange
                value={pool.total_ajna_burned - pool.prev_total_ajna_burned}
                prefix={"🔥 "}
                icon={false}
              />
            </CardOpaque>
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

      <div className="flex flex-col-reverse md:flex-row md:gap-4">
        <CardBackground className="md:w-2/3 col-span-2 mb-10 grid grid-cols-1 place-content-between">
          <BucketsGraph
            address={address}
            lupIndex={pool.lup_index}
            htpIndex={pool.htp_index}
          />
        </CardBackground>

        <CardBackground className="md:w-1/3 grid grid-cols-1 place-content-between mb-10">
          <div>
            <h3 className="text-sm font-bold text-gray-1 font-syncopate uppercase mb-5">
              Buckets
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
            <CardOpaque title="Market Price">
              <Value
                value={currentCollateralPrice}
                suffix={pool.quote_token_symbol}
                compact100k={true}
                compact={false}
                className="text-xl"
                dashIfZero
                decimals={currentCollateralPrice < 1.1 ? 5 : 2}
              />
              <div className="h-6">
                <ValueChange
                  value={currentCollateralPrice - prevCollateralPrice}
                  suffix={pool.quote_token_symbol}
                  compact100k={true}
                  compact={false}
                  decimals={
                    Math.abs(currentCollateralPrice - prevCollateralPrice) < 1.1 ? 5 : 2
                  }
                />
              </div>
              <span className="text-sm text-gray-10">
                <Value
                  value={pool.collateral_token_underlying_price}
                  prefix="$"
                  compact100k={true}
                  compact={false}
                  hideIfZero
                  decimals={pool.collateral_token_underlying_price < 1.1 ? 5 : 2}
                />
              </span>
            </CardOpaque>
            <CardOpaque
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
            >
              <Value
                value={pool.lup}
                suffix={pool.quote_token_symbol}
                className="text-xl"
                dashIfZero
                decimals={pool.lup < 1.1 ? 5 : 2}
              />
              <div className="h-6">
                <ValueChange
                  value={pool.lup - pool.prev_lup}
                  suffix={pool.quote_token_symbol}
                  decimals={Math.abs(pool.lup - pool.prev_lup) < 1.1 ? 5 : 2}
                />
              </div>
              <span className="text-sm text-gray-10">
                Bucket #: {pool.lup_index ? pool.lup_index : "-"}
              </span>
            </CardOpaque>
            <CardOpaque
              title={
                <span>
                  HTP
                  <Info className="ms-2" title="Highest Threshold Price (HTP)">
                    The threshold price of the least collateralized loan. Lender
                    deposits above the HTP earn interest.
                  </Info>
                </span>
              }
            >
              <Value
                value={pool.htp}
                suffix={pool.quote_token_symbol}
                className="text-xl"
                dashIfZero
                decimals={pool.htp < 1.1 ? 5 : 2}
              />
              <div className="h-6">
                <ValueChange
                  value={pool.htp - pool.prev_htp}
                  suffix={pool.quote_token_symbol}
                  decimals={Math.abs(pool.htp - pool.prev_htp) < 1.1 ? 5 : 2}
                />
              </div>
              <span className="text-sm text-gray-10">
                Bucket #: {pool.htp_index ? pool.htp_index : "-"}
              </span>
            </CardOpaque>
            <CardOpaque
              title={
                <span>
                  HPB
                  <Info className="ms-2" title="Highest Price Bucket (HPB)">
                    The highest-priced bucket which contains a deposit, not counting
                    claimable collateral.
                  </Info>
                </span>
              }
            >
              <Value
                value={pool.hpb}
                suffix={pool.quote_token_symbol}
                className="text-xl"
                dashIfZero
                decimals={pool.hpb < 1.1 ? 5 : 2}
              />
              <div className="h-6">
                <ValueChange
                  value={pool.hpb - pool.prev_hpb}
                  suffix={pool.quote_token_symbol}
                  decimals={Math.abs(pool.hpb - pool.prev_hpb) < 1.1 ? 5 : 2}
                />
              </div>
              <span className="text-sm text-gray-10">
                Bucket #: {pool.hpb_index ? pool.hpb_index : "-"}
              </span>
            </CardOpaque>
          </div>
        </CardBackground>
      </div>
      <PoolBuckets address={address} className="mb-10" />
      <PoolEvents address={address} />
    </>
  );
};

export default Pool;

"use client";

import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import CardBackground from "@/components/card/CardBackground";
import CardOpaque from "@/components/card/CardOpaque";
import CopyToClipboard from "@/components/copyToClipboard/CopyToClipboard";
import CryptoIcon from "@/components/icon/CryptoIcon";
import DisplaySwitch from "@/components/switch/DisplaySwitch";
import Tag from "@/components/tags/Tag";
import Value from "@/components/value/Value";
import ValueChange from "@/components/value/ValueChange";
import { useFetch, useQueryParams } from "@/hooks";
import { shorten } from "@/utils/address";
import HistoricGraphs from "./HistoricGraphs";
import PoolEvents from "./PoolEvents";
import PoolInfo from "./PoolInfo";
import PriceInfo from "./PriceInfo";

const PoolPage = ({ params }) => {
  const { address } = params;
  const { queryParams, setQueryParams } = useQueryParams();
  const daysAgo = parseInt(queryParams.get("daysAgo")) || 1;

  const { data, error, isLoading } = useFetch(`/pools/${address}/`, {
    days_ago: daysAgo,
  });

  if (error) {
    return <p>Failed to load data</p>;
  }
  if (isLoading) {
    return <p>Loading....</p>;
  }

  const onDisplaySwitchChange = (value) => {
    setQueryParams({ daysAgo: value });
  };

  const { results: pool } = data;

  return (
    <>
      <section className="flex items-center justify-between mb-10">
        <Breadcrumbs />
        <DisplaySwitch onChange={onDisplaySwitchChange} activeOption={daysAgo} />
      </section>
      <div className="flex mb-5">
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
      <div className="flex mb-7 items-center justify-between">
        <Tag className="flex">
          <CryptoIcon name={pool.collateral_token_symbol} size="20" className="mr-1" />1{" "}
          {pool.collateral_token_symbol}
          <span className="px-1">=</span>
          <Value value={pool.hpb} suffix={` ${pool.quote_token_symbol}`} icon={false} />
        </Tag>
        <div className="flex items-baseline">
          <span className="text-gray-10 text-sm mr-5">Pool Address</span>
          <span>{shorten(pool.address)}</span>
          <CopyToClipboard className="ml-3" text={pool.address} />
        </div>
      </div>

      <PoolInfo data={pool} className="mb-10" />

      <div className="grid grid-cols-3 gap-4 mb-10">
        <CardBackground className="grid grid-cols-1 place-content-between">
          <div>
            <h3 className="text-sm font-bold text-gray-1 font-syncopate uppercase mb-5">
              Total tokens locked
            </h3>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <CryptoIcon
                  name={pool.collateral_token_symbol}
                  size="20"
                  className="mr-2"
                />
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
                  <Value value={pool.pledged_collateral} />
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <CryptoIcon name={pool.quote_token_symbol} size={20} className="mr-2" />
                <span className="font-bold text-sm">{pool.quote_token_symbol}</span>
              </div>

              <div className="flex space-x-2">
                <Value
                  value={pool.pool_size_usd - pool.debt_usd}
                  small
                  prefix={"$"}
                  className="text-gray-10"
                />
                <Value value={pool.pool_size - pool.debt} />
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-1 font-syncopate uppercase mb-5">
              APR
            </h3>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <span className="font-bold text-sm">Lend</span>
              </div>
              <div>
                <Value value={pool.lend_rate * 100} suffix={"%"} />
              </div>
            </div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <span className="font-bold text-sm">Borrow</span>
              </div>
              <div>
                <Value value={pool.borrow_rate * 100} suffix={"%"} />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <CardOpaque title="TVL">
              <Value value={pool.tvl} prefix="$" className="text-xl" />
              <ValueChange
                value={pool.prev_tvl ? pool.tvl - pool.prev_tvl : 0}
                prefix="$"
              />
            </CardOpaque>
            <CardOpaque title="Volume">
              <Value value={0} className="text-xl" prefix="$" />
              <ValueChange value={0} suffix="%" />
            </CardOpaque>
            <CardOpaque title="Fees">
              <Value value={0} prefix="$" className="text-xl" />
              <ValueChange value={0} suffix="%" />
            </CardOpaque>
            <CardOpaque title="Ajna Burned">
              <Value
                value={pool.total_ajna_burned}
                prefix={"🔥 "}
                icon={false}
                className="text-xl"
              />
              <ValueChange
                value={
                  pool.prev_total_ajna_burned
                    ? pool.total_ajna_burned - pool.prev_total_ajna_burned
                    : 0
                }
                prefix={"🔥 "}
                icon={false}
              />
            </CardOpaque>
          </div>
        </CardBackground>

        <div className="col-span-2">
          <HistoricGraphs
            address={address}
            daysAgo={daysAgo}
            collateralSymbol={pool.collateral_token_symbol}
            quoteSymbol={pool.quote_token_symbol}
          />
        </div>
      </div>
      <PriceInfo data={pool} className="mb-10" />
      <PoolEvents address={address} />
    </>
  );
};

export default PoolPage;

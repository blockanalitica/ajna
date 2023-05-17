"use client";

import { useFetch } from "@/hooks.js";
import CryptoIcon from "@/components/icon/CryptoIcon";
import DisplaySwitch from "@/components/switch/DisplaySwitch";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import PoolInfo from "./PoolInfo";
import { BucketsSection } from "@/sections";
import CardBackground from "@/components/card/CardBackground";
import InfoPlusAnalyticsCard from "@/components/card/InfoPlusAnalyticsCard";
import MainBarGraph from "@/components/graph/MainBarGraph";
import Value from "@/components/value/Value";
import ValueChange from "@/components/value/ValueChange";
import CardOpaque from "@/components/card/CardOpaque";

const PoolPage = ({ params }) => {
  const { address } = params;

  const { data, error, isLoading } = useFetch(`/pools/${address}/`);
  if (error) {
    return <p>Failed to load data</p>;
  }
  if (isLoading) {
    return <p>Loading....</p>;
  }
  const { results: pool } = data;

  return (
    <>
      <section className="flex items-center justify-between">
        <Breadcrumbs />
        <div>{/* <SearchBar /> */}</div>
        <DisplaySwitch />
      </section>
      <div className="flex mt-5">
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

      <PoolInfo data={pool} />

      <div className="grid grid-cols-3 gap-4 my-5">
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
              <Value value={pool.pledged_collateral} decimals={2} compact />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <CryptoIcon name={pool.quote_token_symbol} size={20} className="mr-2" />
                <span className="font-bold text-sm">{pool.quote_token_symbol}</span>
              </div>
              <Value value={pool.pool_size - pool.current_debt} decimals={2} compact />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <CardOpaque title="TVL">
              <Value
                value={pool.tvl}
                decimals={2}
                compact
                prefix="$"
                className="text-xl"
              />
              <ValueChange value={0.18} decimals={2} compact suffix="%" />
            </CardOpaque>
            <CardOpaque title="Volume">
              <Value value={0} decimals={2} compact prefix="$" className="text-xl" />
              <ValueChange value={0.18} decimals={2} compact suffix="%" />
            </CardOpaque>
            <CardOpaque title="Fees">
              <Value value={0} decimals={2} compact prefix="$" className="text-xl" />
              <ValueChange value={0.18} decimals={2} compact suffix="%" />
            </CardOpaque>
            <CardOpaque title="Ajna Burned">
              <Value
                value={pool.total_ajna_burned}
                decimals={2}
                compact
                prefix={"🔥 "}
                icon={false}
                className="text-xl"
              />
              <ValueChange value={-0.18} decimals={2} compact suffix="%" />
            </CardOpaque>
          </div>
        </CardBackground>

        <div className="col-span-2">
          <CardBackground>Graph goes here</CardBackground>
        </div>
      </div>

      <CardBackground>Pool buckets table goes here</CardBackground>
    </>
  );
};

export default PoolPage;

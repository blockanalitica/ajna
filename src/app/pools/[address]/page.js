"use client";

import { useFetch } from "@/hooks.js";
import CryptoIcon from "@/components/icon/CryptoIcon";
import DisplaySwitch from "@/components/switch/DisplaySwitch";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import PoolInfo from "./PoolInfo";
import { BucketsSection, GraphSection } from "@/sections";

const Poolage = ({ params }) => {
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

      {/*  Move over to app folder the sections below */}
      <GraphSection data={pool} />
      <BucketsSection address={pool} />
    </>
  );
};

export default Poolage;

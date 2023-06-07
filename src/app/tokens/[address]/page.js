"use client";

import { useState } from "react";
import { useFetch } from "@/hooks";
import CryptoIcon from "@/components/icon/CryptoIcon";
import DisplaySwitch from "@/components/switch/DisplaySwitch";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import TokenInfo from "./TokenInfo";
import TokenArbitragePools from "./TokenArbitragePools";
import TokenPools from "./TokenPools";

const TokenPage = ({ params }) => {
  const { address } = params;
  const [daysAgo, setDaysAgo] = useState(1);

  const { data, error, isLoading } = useFetch(`/tokens/${address}/`);
  if (error) {
    return <p>Failed to load data</p>;
  }
  if (isLoading) {
    return <p>Loading....</p>;
  }
  const { results: token } = data;

  return (
    <>
      <section className="flex items-center justify-between mb-10">
        <Breadcrumbs />
        <DisplaySwitch onChange={setDaysAgo} activeOption={daysAgo} />
      </section>
      <div className="flex mb-10">
        <CryptoIcon name={token.symbol} size="30" />
        <h1 className="ml-4 text-2xl">{token.symbol}</h1>
      </div>

      <TokenInfo address={address} daysAgo={daysAgo} className="mb-10" />
      <TokenPools address={address} daysAgo={daysAgo} className="mb-10" />
      <TokenArbitragePools address={address} daysAgo={daysAgo} />
    </>
  );
};

export default TokenPage;

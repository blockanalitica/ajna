"use client";

import { useFetch, useQueryParams, usePageTitle } from "@/hooks";
import CryptoIcon from "@/components/icon/CryptoIcon";
import DisplaySwitch from "@/components/switch/DisplaySwitch";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import TokenInfo from "./TokenInfo";
import TokenArbitragePools from "./TokenArbitragePools";
import TokenPools from "./TokenPools";

const TokenPage = ({ params }) => {
  const { address } = params;

  const { queryParams, setQueryParams } = useQueryParams();
  const daysAgo = parseInt(queryParams.get("daysAgo")) || 1;

  const { data = {}, error, isLoading } = useFetch(`/tokens/${address}/`);

  const { results: token } = data;

  usePageTitle(token ? token.symbol : "Token");

  if (error) {
    return <p>Failed to load data</p>;
  }
  if (isLoading) {
    return <p>Loading....</p>;
  }

  const onDisplaySwitchChange = (value) => {
    setQueryParams({ daysAgo: value });
  };

  return (
    <>
      <section className="flex items-center justify-center sm:justify-end md:justify-between mb-10">
        <Breadcrumbs />
        <DisplaySwitch onChange={onDisplaySwitchChange} activeOption={daysAgo} />
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

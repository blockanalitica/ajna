import { useParams, useLocation } from "react-router-dom";
import { useState } from "react";
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
import TabCard from "@/components/tabs/TabCard";
import { useFetch, usePageTitle, useQueryParams } from "@/hooks";
import { shorten } from "@/utils/address";
import { DateTime } from "luxon";
import ExternalLink from "@/components/externalLink/ExternalLink";
import { generateEtherscanUrl, smartLocationParts } from "@/utils/url";
import BucketsTable from "./BucketsTable";
import BucketsGraph from "../BucketsGraph";

const Buckets = () => {
  const { address } = useParams();
  const { data = {}, error, isLoading } = useFetch(`/pools/${address}/buckets/`);

  if (error) {
    return <p>Failed to load data</p>;
  }

  if (isLoading) {
    return <GenericPlaceholder />;
  }

  const {
    collateral_token_symbol: collateralTokenSymbol,
    quote_token_symbol: quoteTokenSymbol,
  } = data;

  return (
    <>
      <section className="flex items-center justify-center sm:justify-end md:justify-between mb-10">
        <Breadcrumbs />
        {/* <DisplaySwitch onChange={onDisplaySwitchChange} activeOption={daysAgo} /> */}
      </section>

      <div className="flex justify-between mb-5">
        <div className="flex items-center">
          <span className="relative flex">
            <CryptoIcon name={collateralTokenSymbol} className="z-10" />
            <CryptoIcon name={quoteTokenSymbol} className="relative left-[-10px] z-0" />
          </span>

          <h1 className="pl-4 text-2xl">
            {collateralTokenSymbol} / {quoteTokenSymbol} Buckets
          </h1>
        </div>
      </div>

      <BucketsTable address={address} />
    </>
  );
};

export default Buckets;

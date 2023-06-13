"use client";

import { useQueryParams } from "@/hooks";
import DisplaySwitch from "@/components/switch/DisplaySwitch";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import Tokens from "./Tokens";

const TokensPage = () => {
  const { queryParams, setQueryParams } = useQueryParams();
  const daysAgo = parseInt(queryParams.get("daysAgo")) || 1;

  const onDisplaySwitchChange = (value) => {
    setQueryParams({ daysAgo: value });
  };

  return (
    <>
      <section className="flex items-center justify-between mb-10">
        <Breadcrumbs />
        <DisplaySwitch onChange={onDisplaySwitchChange} activeOption={daysAgo} />
      </section>

      <div className="flex flex-row justify-between items-center mb-5">
        <h1 className="text-xl md:text-1xl xl:text-2xl">Tokens</h1>
      </div>

      <Tokens daysAgo={daysAgo} />
    </>
  );
};

export default TokensPage;

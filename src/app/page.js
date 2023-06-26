"use client";

import { useQueryParams } from "@/hooks";
import TotalStats from "./TotalStats";
import TopPools from "./TopPools";
import TopTokens from "./TopTokens";
import DisplaySwitch from "@/components/switch/DisplaySwitch";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import Button from "@/components/button/Button";

const Page = () => {
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

      <TotalStats className="mb-10" daysAgo={daysAgo} />

      <div className="flex flex-row justify-between items-center mb-5">
        <h1 className="text-xl md:text-1xl xl:text-2xl">Top Pools</h1>
        <Button text="View all" href="/pools" />
      </div>

      <div className="mb-10">
        <TopPools daysAgo={daysAgo} />
      </div>

      <div className="flex flex-row justify-between items-center mb-5">
        <h1 className="text-xl md:text-1xl xl:text-2xl">Top Tokens</h1>
        <Button text="View all" href="/tokens" />
      </div>

      <TopTokens daysAgo={daysAgo} />
    </>
  );
};

export default Page;

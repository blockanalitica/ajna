import { Suspense } from "react";
import TotalStats from "./TotalStats";
import TopPools from "./TopPools";
import TopTokens from "./TopTokens";
import Search from "@/components/search/Search";
import DisplaySwitch from "@/components/switch/DisplaySwitch";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import TablePlaceholder from "@/components/table/TablePlaceholder";
import StatsPlaceholder from "@/components/stats/StatsPlaceholder";
import Button from "@/components/button/Button";

const Page = () => {
  return (
    <>
      <section className="flex items-center justify-between mb-10">
        <Breadcrumbs />
        <Search />
        <DisplaySwitch />
      </section>
      <Suspense
        fallback={<StatsPlaceholder className="mb-10" numStats={5} size="lg" />}
      >
        <TotalStats className="mb-10" />
      </Suspense>

      <div className="flex flex-row justify-between items-center mb-5">
        <h1 className="text-xl md:text-1xl xl:text-2xl">Top Pools</h1>
        <Button text="View all" href="/pools" />
      </div>
      <div className="mb-10">
        <Suspense fallback={<TablePlaceholder />}>
          <TopPools />
        </Suspense>
      </div>

      <div className="flex flex-row justify-between items-center mb-5">
        <h1 className="text-xl md:text-1xl xl:text-2xl">Top Tokens</h1>
        <Button text="View all" href="/tokens" />
      </div>
      <Suspense fallback={<TablePlaceholder />}>
        <TopTokens />
      </Suspense>
    </>
  );
};

export default Page;

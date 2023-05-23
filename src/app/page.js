import { Suspense } from "react";
import TotalStats from "./TotalStats";
import TopPools from "./TopPools";
import TopTokens from "./TopTokens";
import Search from "@/components/search/Search";
import DisplaySwitch from "@/components/switch/DisplaySwitch";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import CardBackground from "@/components/card/CardBackground";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedium, faTwitter } from "@fortawesome/free-brands-svg-icons";
import Button from "@/components/button/Button";

const Page = () => {
  return (
    <>
      <section className="flex items-center justify-between mb-10">
        <Breadcrumbs />
        <Search />
        <DisplaySwitch />
      </section>
      <TotalStats className="mb-10" />

      <div className="flex flex-row justify-between items-center mb-5">
        <h1 className="text-xl md:text-1xl xl:text-2xl">Top Pools</h1>
        <Button text="View all" href="/pools" />
      </div>
      <div className="mb-10">
        <Suspense fallback={<CardBackground>Loading pools...</CardBackground>}>
          <TopPools />
        </Suspense>
      </div>

      <div className="flex flex-row justify-between items-center mb-5">
        <h1 className="text-xl md:text-1xl xl:text-2xl">Top Tokens</h1>
        <Button text="View all" href="/tokens" />
      </div>
      <Suspense fallback={<CardBackground>Loading tokens...</CardBackground>}>
        <TopTokens />
      </Suspense>
    </>
  );
};

export default Page;

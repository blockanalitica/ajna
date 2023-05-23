import { Suspense } from "react";
import Search from "@/components/search/Search";
import DisplaySwitch from "@/components/switch/DisplaySwitch";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import CardBackground from "@/components/card/CardBackground";
import Tokens from "./Tokens";

const TokensPage = () => {
  return (
    <>
      <section className="flex items-center justify-between mb-10">
        <Breadcrumbs />
        <Search />
        <DisplaySwitch />
      </section>

      <div className="flex flex-row justify-between items-center mb-5">
        <h1 className="text-xl md:text-1xl xl:text-2xl">Tokens</h1>
      </div>

      <Suspense fallback={<CardBackground>Loading pools...</CardBackground>}>
        <Tokens />
      </Suspense>
    </>
  );
};

export default TokensPage;

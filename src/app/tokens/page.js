import Search from "@/components/search/Search";
import DisplaySwitch from "@/components/switch/DisplaySwitch";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
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

      <Tokens />
    </>
  );
};

export default TokensPage;

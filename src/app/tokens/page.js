import DisplaySwitch from "@/components/switch/DisplaySwitch";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";

// TODO: don't reuse top tokens here, use own component
import TopTokens from "../TopTokens";

const TokensPage = () => {
  return (
    <>
      <section className="flex items-center justify-between mb-10">
        <Breadcrumbs />
        <div>{/* <SearchBar /> */}</div>
        <DisplaySwitch />
      </section>
      <TopTokens className="mb-10" />
    </>
  );
};

export default TokensPage;

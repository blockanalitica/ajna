import Search from "@/components/search/Search";
import DisplaySwitch from "@/components/switch/DisplaySwitch";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";

// TODO: don't reuse top pools here, use own component
import TopPools from "../TopPools";

const PoolsPage = () => {
  return (
    <>
      <section className="flex items-center justify-between mb-10">
        <Breadcrumbs />
        <Search />
        <DisplaySwitch />
      </section>
      <TopPools className="mb-10" />
    </>
  );
};

export default PoolsPage;

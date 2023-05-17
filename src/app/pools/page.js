import DisplaySwitch from "@/components/switch/DisplaySwitch";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";

// TODO: don't reuse top pools here, use own component
import TopPools from "../TopPools";

const PoolsPage = () => {
  return (
    <>
      <section className="flex items-center justify-between">
        <Breadcrumbs />
        <div>{/* <SearchBar /> */}</div>
        <DisplaySwitch />
      </section>
      <TopPools />
    </>
  );
};

export default PoolsPage;

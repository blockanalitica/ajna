import { Suspense } from "react";
import TotalStats from "./TotalStats";
import TopPools from "./TopPools";
// import SearchBar from "@/components/SearchInput/SearchInput";
import DisplaySwitch from "@/components/switch/DisplaySwitch";

const Page = async () => {
  return (
    <>
      <section className="flex items-center justify-between">
        <div className="flex flex-row">Home &gt; Pools</div>
        <div>{/* <SearchBar /> */}</div>
        <DisplaySwitch />
      </section>

      <Suspense fallback={<p>Loading ...</p>}>
        <TotalStats />
      </Suspense>
      <TopPools />
    </>
  );
};

export default Page;

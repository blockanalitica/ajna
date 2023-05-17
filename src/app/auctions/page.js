import DisplaySwitch from "@/components/switch/DisplaySwitch";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import TestGraphs from "./TestGraphs";

const AuctionsPage = async () => {
  return (
    <>
      <section className="flex items-center justify-between">
        <Breadcrumbs />

        <div>{/* <SearchBar /> */}</div>
        <DisplaySwitch />
      </section>

      <TestGraphs />
    </>
  );
};

export default AuctionsPage;

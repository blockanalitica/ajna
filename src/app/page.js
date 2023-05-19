import TotalStats from "./TotalStats";
import TopPools from "./TopPools";
import TopTokens from "./TopTokens";
import Search from "@/components/search/Search";
import DisplaySwitch from "@/components/switch/DisplaySwitch";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedium, faTwitter } from "@fortawesome/free-brands-svg-icons";

const Page = async () => {
  return (
    <>
      <section className="flex items-center justify-between mb-10">
        <Breadcrumbs />

        <Search />
        <DisplaySwitch />
      </section>
      <TotalStats className="mb-10" />
      <TopPools className="mb-10" />
      <TopTokens />
    </>
  );
};

export default Page;

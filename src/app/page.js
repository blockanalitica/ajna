import TotalStats from "./TotalStats";
import TopPools from "./TopPools";
import TopTokens from "./TopTokens";
// import SearchBar from "@/components/SearchInput/SearchInput";
import DisplaySwitch from "@/components/switch/DisplaySwitch";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedium, faTwitter } from "@fortawesome/free-brands-svg-icons";

const Page = async () => {
  return (
    <>
      <section className="flex items-center justify-between">
        <Breadcrumbs />

        <div>{/* <SearchBar /> */}</div>
        <DisplaySwitch />
      </section>
      <TotalStats />
      <TopPools />
      <TopTokens />
    </>
  );
};

export default Page;

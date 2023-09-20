import { useQueryParams } from "@/hooks";
import TotalStats from "./TotalStats";
import TopPools from "./TopPools";
import TopTokens from "./TopTokens";
import DisplaySwitch from "@/components/switch/DisplaySwitch";

const Homepage = () => {
  const { queryParams, setQueryParams } = useQueryParams();
  const daysAgo = parseInt(queryParams.get("daysAgo")) || 1;

  const onDisplaySwitchChange = (value) => {
    setQueryParams({ daysAgo: value });
  };

  return (
    <>
      <section className="flex items-center justify-center sm:justify-end mb-10">
        <DisplaySwitch onChange={onDisplaySwitchChange} activeOption={daysAgo} />
      </section>

      <TotalStats className="mb-10" daysAgo={daysAgo} />

      <div className="mb-10">
        <TopPools daysAgo={daysAgo} />
      </div>

      <TopTokens daysAgo={daysAgo} />
    </>
  );
};

export default Homepage;

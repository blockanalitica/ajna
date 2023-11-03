import { useQueryParams } from "@/hooks";
import TotalStats from "./TotalStats";
import TopPools from "./TopPools";
import TopTokens from "./TopTokens";
import HistoryStatsGraph from "./HistoryStatsGraph";
import HistoryVolumeGraph from "./HistoryVolumeGraph";
import DisplaySwitch from "@/components/switch/DisplaySwitch";
import CardBackground from "@/components/card/CardBackground";

const Page = () => {
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

      <div className="flex flex-col-reverse md:flex-row md:gap-4">
        <CardBackground className="md:w-1/2 mb-10">
          <HistoryStatsGraph />
        </CardBackground>
        <CardBackground className="md:w-1/2 mb-10">
          <HistoryVolumeGraph />
        </CardBackground>
      </div>

      <div className="mb-10">
        <TopPools daysAgo={daysAgo} />
      </div>

      <TopTokens daysAgo={daysAgo} />
    </>
  );
};

export default Page;

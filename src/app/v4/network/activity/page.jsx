import { useQueryParams, usePageTitle } from "@/hooks";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import DisplaySwitch from "@/components/switch/DisplaySwitch";
import CardBackground from "@/components/card/CardBackground";
import ActivityStats from "./ActivityStats";
import HistoricGraphs from "./HistoricGraphs";

const ActivityPage = () => {
  usePageTitle("Activity");
  const { queryParams, setQueryParams } = useQueryParams();
  const daysAgo = parseInt(queryParams.get("daysAgo")) || 1;

  const onDisplaySwitchChange = (value) => {
    setQueryParams({ daysAgo: value });
  };

  return (
    <>
      <section className="flex items-center justify-between mb-10">
        <Breadcrumbs />
        <DisplaySwitch
          onChange={onDisplaySwitchChange}
          activeOption={daysAgo}
          newOptions
        />
      </section>
      <h1 className="text-xl md:text-1xl xl:text-2xl mb-10">Wallet Activity</h1>

      <div className="flex flex-col lg:flex-row lg:gap-4">
        <CardBackground className="lg:w-2/3 col-span-2 mb-10 grid grid-cols-1 place-content-between mb-5">
          <HistoricGraphs daysAgo={daysAgo} />
        </CardBackground>
        <CardBackground className="lg:w-1/3 grid grid-cols-1 place-content-between mb-5">
          <ActivityStats daysAgo={daysAgo} />
        </CardBackground>
      </div>
    </>
  );
};

export default ActivityPage;

import { useQueryParams, usePageTitle } from "@/hooks";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import DisplaySwitch from "@/components/switch/DisplaySwitch";
import CardBackground from "@/components/card/CardBackground";
import ActivityStats from "./ActivityStats";
import ActivityHistoricGraphs from "./ActivityHistoricGraphs";

const ActivityPage = () => {
  usePageTitle("Activity");
  const { queryParams, setQueryParams } = useQueryParams();
  const daysAgo = parseInt(queryParams.get("daysAgo")) || 1;

  const onDisplaySwitchChange = (value) => {
    setQueryParams({ daysAgo: value });
  };

  return (
    <>
      <div className="flex gap-x-3 items-center mb-10 justify-end">
        <DisplaySwitch
          onChange={onDisplaySwitchChange}
          activeOption={daysAgo}
          newOptions
        />
      </div>

      <div className="flex flex-col lg:flex-row lg:gap-4">
        <CardBackground className="lg:w-2/3 col-span-2 mb-10 grid grid-cols-1 place-content-between mb-5">
          <ActivityHistoricGraphs daysAgo={daysAgo} />
        </CardBackground>
        <CardBackground className="lg:w-1/3 grid grid-cols-1 place-content-between mb-5">
          <ActivityStats daysAgo={daysAgo} />
        </CardBackground>
      </div>
    </>
  );
};

export default ActivityPage;

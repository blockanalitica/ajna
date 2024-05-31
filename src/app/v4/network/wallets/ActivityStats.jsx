import Value from "@/components/value/Value";
import ValueChange from "@/components/value/ValueChange";
import Kpi from "@/components/kpis/Kpi";
import { useFetch } from "@/hooks";

const ActivityStats = ({ daysAgo }) => {
  const {
    data = {},
    error,
    isLoading,
  } = useFetch(`/activity/`, {
    days_ago: daysAgo,
  });

  if (error) {
    return <p>Failed to load data</p>;
  }
  if (isLoading) {
    return (
      <div className="flex items-center flex-col animate-pulse">
        <div className="w-20 h-20 mt-20 mb-4 bg-gray-22 rounded-full p-4 flex items-center justify-center"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 mt-4">
      <Kpi
        title="Total Wallets"
        value={
          <>
            <Value value={data.total_wallets} className="text-xl" dashIfZero />
            <ValueChange
              value={data.total_wallets - data.prev_total_wallets}
              className="ms-2 text-sm"
            />
          </>
        }
      />
      <div></div>
      <Kpi title="Active Today" value={<Value value={data.active_wallets} />} />
      <Kpi title="Active this Month" value={<Value value={data.active_this_month} />} />
      <Kpi title="New Today" value={<Value value={data.new_wallets} />} />
      <Kpi title="New this Month" value={<Value value={data.new_this_month} />} />
    </div>
  );
};

export default ActivityStats;

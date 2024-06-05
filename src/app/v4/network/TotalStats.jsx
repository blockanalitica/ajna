import Stats from "@/components/stats/Stats";
import StatsPlaceholder from "@/components/stats/StatsPlaceholder";
import Value from "@/components/value/Value";
import ValueChange from "@/components/value/ValueChange";
import { useFetch } from "@/hooks";

const TotalStats = ({ daysAgo, className, ...rest }) => {
  const {
    data = {},
    error,
    isLoading,
  } = useFetch("/stats/overview/", {
    p_size: 5,
    order: "-tvl",
    days_ago: daysAgo,
  });
  if (error) {
    return <p>Failed to load data</p>;
  }
  if (isLoading) {
    return <StatsPlaceholder className={className} numStats={5} />;
  }

  const { results } = data;

  const stats = [
    {
      title: "Total deposited",
      value: <Value value={results.total_pool_size || 0} prefix="$" />,
      smallValue: (
        <ValueChange
          value={results.total_pool_size - results.prev_total_pool_size}
          prefix="$"
        />
      ),
    },
    {
      title: "Total borrowed",
      value: <Value value={results.total_current_debt || 0} prefix="$" />,
      smallValue: (
        <ValueChange
          value={results.total_current_debt - results.prev_total_current_debt}
          prefix="$"
        />
      ),
    },
    {
      title: "Total collateral",
      value: <Value value={results.total_collateral || 0} prefix="$" />,
      smallValue: (
        <ValueChange
          value={results.total_collateral - results.prev_total_collateral}
          prefix="$"
        />
      ),
    },
  ];
  const statsBottom = [
    {
      title: "TVL",
      value: <Value value={results.total_tvl || 0} prefix="$" />,
      smallValue: (
        <ValueChange value={results.total_tvl - results.prev_total_tvl} prefix="$" />
      ),
    },
    {
      title: "Total reserves",
      value: <Value value={results.total_reserves || 0} prefix="$" />,
      smallValue: (
        <ValueChange
          value={results.total_reserves - results.prev_reserves_usd}
          prefix="$"
        />
      ),
    },
    {
      title: "Ajna burned 🔥",
      value: <Value value={results.total_ajna_burned || 0} />,
      smallValue: (
        <ValueChange
          value={results.total_ajna_burned - results.prev_total_ajna_burned}
        />
      ),
    },
  ];

  return (
    <div className={className}>
      <Stats data={stats} className="mb-4" {...rest} />
      <Stats data={statsBottom} className="" {...rest} />
    </div>
  );
};

export default TotalStats;

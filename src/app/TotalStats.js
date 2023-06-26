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
    return <StatsPlaceholder className={className} numStats={5} size="lg" />;
  }

  const { results } = data;

  const stats = [
    {
      title: "Total lended",
      value: <Value value={results.total_pool_size || 0} prefix="$" />,
      smallValue: (
        <ValueChange
          value={results.total_pool_size - results.prev_total_pool_size}
          prefix="$"
        />
      ),
    },
    {
      title: "Total borowed",
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
      value: <Value value={results.total_pledged_collateral || 0} prefix="$" />,
      smallValue: (
        <ValueChange
          value={
            results.total_pledged_collateral - results.prev_total_pledged_collateral
          }
          prefix="$"
        />
      ),
    },
    {
      title: "TVL",
      value: <Value value={results.total_tvl || 0} prefix="$" />,
      smallValue: (
        <ValueChange value={results.total_tvl - results.prev_total_tvl} prefix="$" />
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

  return <Stats data={stats} className={className} {...rest} />;
};

export default TotalStats;

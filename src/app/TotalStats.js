import Value from "@/components/value/Value";
import ValueChange from "@/components/value/ValueChange";
import Stats from "@/components/stats/Stats";
import StatsPlaceholder from "@/components/stats/StatsPlaceholder";
import { useFetch } from "@/hooks.js";

const TotalStats = ({ className, ...rest }) => {
  const {
    data = {},
    error,
    isLoading,
  } = useFetch("/stats/overview/", {
    p_size: 5,
    order: "-tvl",
    // days_ago: daysAgo,
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
      value: <Value value={results.total_pool_size} decimals={2} compact prefix="$" />,
      smallValue: <ValueChange value={0} decimals={2} compact prefix="$" />,
    },
    {
      title: "Total borowed",
      value: (
        <Value value={results.total_current_debt} decimals={2} compact prefix="$" />
      ),
      smallValue: <ValueChange value={0} decimals={2} compact prefix="$" />,
    },
    {
      title: "Total collateral",
      value: (
        <Value
          value={results.total_pledged_collateral}
          decimals={2}
          prefix="$"
          compact
        />
      ),
      smallValue: <ValueChange value={0} decimals={2} compact prefix="$" />,
    },
    {
      title: "TVL",
      value: <Value value={results.total_tvl} decimals={2} compact prefix="$" />,
      smallValue: <ValueChange value={0} decimals={2} compact prefix="$" />,
    },
    {
      title: "Ajna burned 🔥",
      value: <Value value={results.total_ajna_burned} decimals={2} compact />,
      smallValue: <ValueChange value={0} decimals={2} compact />,
    },
  ];

  return <Stats data={stats} className={className} {...rest} />;
};

export default TotalStats;

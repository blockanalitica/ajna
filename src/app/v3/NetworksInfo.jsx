import Stats from "@/components/stats/Stats";
import StatsPlaceholder from "@/components/stats/StatsPlaceholder";
import Value from "@/components/value/Value";
import ValueChange from "@/components/value/ValueChange";

const NetworksInfo = ({ data, isLoading, className }) => {
  if (isLoading) {
    return <StatsPlaceholder className={className} numStats={4} size="lg" />;
  }

  const stats = [
    {
      title: "Total Deposited",
      value: <Value value={data.supply_usd} prefix="$" />,
      smallValue: (
        <ValueChange value={data.supply_usd - data.prev_supply_usd} prefix="$" />
      ),
    },
    {
      title: "Total Borrowed",
      value: <Value value={data.debt_usd} prefix="$" />,
      smallValue: <ValueChange value={data.debt_usd - data.prev_debt_usd} prefix="$" />,
    },
    {
      title: "Total Collateral",
      value: <Value value={data.collateral_usd} prefix="$" />,
      smallValue: (
        <ValueChange
          value={data.collateral_usd - data.prev_collateral_usd}
          prefix="$"
        />
      ),
    },
    {
      title: "TVL",
      value: <Value value={data.tvl} prefix="$" />,
      smallValue: <ValueChange value={data.tvl - data.prev_tvl} prefix="$" />,
    },
  ];

  return <Stats data={stats} className={className} />;
};

export default NetworksInfo;

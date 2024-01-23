import Stats from "@/components/stats/Stats";
import StatsPlaceholder from "@/components/stats/StatsPlaceholder";
import Value from "@/components/value/Value";
import ValueChange from "@/components/value/ValueChange";

const NetworksInfo = ({ data, isLoading, className }) => {
  if (isLoading) {
    return <StatsPlaceholder className={className} numStats={4} size="lg" />;
  }

  const statsRow1 = [
    {
      title: "TVL",
      value: <Value value={data.tvl} prefix="$" />,
      smallValue: <ValueChange value={data.tvl - data.prev_tvl} prefix="$" />,
    },
    {
      title: "🔥 Total Ajna Burned 🔥",
      value: <Value value={data.total_ajna_burned} suffix="AJNA" />,
      smallValue: (
        <>
          {data.prev_total_ajna_burned ? (
            <ValueChange
              value={data.total_ajna_burned - data.prev_total_ajna_burned}
              suffix="AJNA"
            />
          ) : null}
        </>
      ),
    },
  ];

  const statsRow2 = [
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
  ];

  return (
    <div className={className}>
      <Stats data={statsRow1} className="mb-5" />
      <Stats data={statsRow2} />
    </div>
  );
};

export default NetworksInfo;

import Stats from "@/components/stats/Stats";
import Value from "@/components/value/Value";
import ValueChange from "@/components/value/ValueChange";

const WalletInfo = ({ data, ...rest }) => {
  const stats = [
    {
      title: "Deposited",
      value: <Value value={data.supply_usd} prefix="$" />,
      smallValue: (
        <ValueChange value={data.supply_usd - data.prev_supply_usd} prefix="$" />
      ),
    },
    {
      title: "Borrowed",
      value: <Value value={data.debt_usd} prefix="$" />,
      smallValue: <ValueChange value={data.debt_usd - data.prev_debt_usd} prefix="$" />,
    },
    {
      title: "Collateral",
      value: <Value value={data.collateral_usd} prefix="$" />,
      smallValue: (
        <ValueChange
          value={data.collateral_usd - data.prev_collateral_usd}
          prefix="$"
        />
      ),
    },
  ];

  return <Stats data={stats} {...rest} />;
};

export default WalletInfo;

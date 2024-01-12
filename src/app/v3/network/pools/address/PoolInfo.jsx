import Stats from "@/components/stats/Stats";
import Value from "@/components/value/Value";
import ValueChange from "@/components/value/ValueChange";

const PoolInfo = ({ data, ...rest }) => {
  const stats = [
    {
      title: "Deposited",
      value: (
        <>
          <Value value={data.pool_size} suffix={data.quote_token_symbol} big />
          <ValueChange
            value={data.pool_size - data.prev_pool_size}
            suffix={data.quote_token_symbol}
            className="text-lg ms-2"
          />
        </>
      ),
      smallValue: (
        <>
          <Value value={data.pool_size_usd} prefix="$" />
          <ValueChange
            value={data.pool_size_usd - data.prev_pool_size_usd}
            prefix="$"
            className="ms-2"
          />
        </>
      ),
    },
    {
      title: "Borrowed",
      value: (
        <>
          <Value value={data.debt} suffix={data.quote_token_symbol} big />
          <ValueChange
            value={data.debt - data.prev_debt}
            suffix={data.quote_token_symbol}
            className="text-lg ms-2"
          />
        </>
      ),
      smallValue: (
        <>
          <Value value={data.debt_usd} prefix="$" />
          <ValueChange
            value={data.debt_usd - data.prev_debt_usd}
            prefix="$"
            className="ms-2"
          />
        </>
      ),
    },
    {
      title: "Collateral",
      value: (
        <>
          <Value
            value={data.pledged_collateral}
            suffix={data.collateral_token_symbol}
            big
          />
          <ValueChange
            value={data.pledged_collateral - data.prev_pledged_collateral}
            suffix={data.collateral_token_symbol}
            className="text-lg ms-2"
          />
        </>
      ),
      smallValue: (
        <>
          <Value value={data.pledged_collateral_usd} prefix="$" />
          <ValueChange
            value={data.pledged_collateral_usd - data.prev_pledged_collateral_usd}
            prefix="$"
            className="ms-2"
          />
        </>
      ),
    },
  ];

  return <Stats data={stats} {...rest} />;
};

export default PoolInfo;

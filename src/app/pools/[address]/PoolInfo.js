"use client";

import Stats from "@/components/stats/Stats";
import Value from "@/components/value/Value";
import ValueChange from "@/components/value/ValueChange";

const PoolInfo = ({ data, ...rest }) => {
  const stats = [
    {
      title: "Lended",
      value: (
        <>
          <Value value={data.pool_size} suffix={data.quote_token_symbol} big />
          <ValueChange
            value={data.pool_size - data.prev_pool_size}
            suffix={data.quote_token_symbol}
            big
          />
        </>
      ),
      smallValue: (
        <>
          <Value value={data.pool_size_usd} prefix="$" />
          <ValueChange
            value={data.pool_size_usd - data.prev_pool_size_usd}
            prefix="$"
          />
        </>
      ),
    },
    {
      title: "Borowed",
      value: (
        <>
          <Value value={data.debt} suffix={data.quote_token_symbol} big />
          <ValueChange
            value={data.debt - data.prev_debt}
            suffix={data.quote_token_symbol}
            big
          />
        </>
      ),
      smallValue: (
        <>
          <Value value={data.debt_usd} prefix="$" />
          <ValueChange value={data.debt_usd - data.prev_debt_usd} prefix="$" />
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
            big
          />
        </>
      ),
      smallValue: (
        <>
          <Value value={data.pledged_collateral_usd} prefix="$" />
          <ValueChange
            value={data.pledged_collateral_usd - data.prev_pledged_collateral_usd}
            prefix="$"
          />
        </>
      ),
    },
    {
      title: "LUP",
      value: <Value value={data.lup} suffix={data.quote_token_symbol} big />,
      smallValue: <ValueChange value={data.lup - data.prev_lup} />,
    },
    {
      title: "HTP",
      value: <Value value={data.htp} suffix={data.quote_token_symbol} big />,
      smallValue: <ValueChange value={data.htp - data.prev_htp} />,
    },
  ];

  return <Stats data={stats} {...rest} />;
};

export default PoolInfo;

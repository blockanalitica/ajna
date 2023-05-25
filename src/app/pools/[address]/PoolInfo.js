"use client";

import Value from "@/components/value/Value";
import Stats from "@/components/stats/Stats";

const PoolInfo = ({ data, ...rest }) => {
  const stats = [
    {
      title: "Lended",
      value: (
        <Value
          value={data.pool_size}
          decimals={2}
          compact
          suffix={data.quote_token_symbol}
          big
        />
      ),
      smallValue: (
        <Value
          value={data.pool_size * data.quote_token_underlying_price}
          decimals={2}
          compact
          prefix="$"
        />
      ),
    },
    {
      title: "Borowed",
      value: (
        <Value
          value={data.current_debt}
          decimals={2}
          compact
          suffix={data.quote_token_symbol}
          big
        />
      ),
      smallValue: (
        <Value
          value={data.current_debt * data.quote_token_underlying_price}
          decimals={2}
          compact
          prefix="$"
        />
      ),
    },
    {
      title: "Collateral",
      value: (
        <Value
          value={data.pledged_collateral}
          decimals={2}
          compact
          suffix={data.collateral_token_symbol}
          big
        />
      ),
      smallValue: (
        <Value
          value={data.pledged_collateral * data.collateral_token_underlying_price}
          decimals={2}
          compact
          prefix="$"
        />
      ),
    },
    {
      title: "LUP",
      value: <Value value={data.lup} decimals={2} compact prefix="$" />,
    },
    {
      title: "HTP",
      value: <Value value={data.htp} decimals={2} compact />,
    },
  ];

  return <Stats data={stats} {...rest} />;
};

export default PoolInfo;

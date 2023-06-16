"use client";

import Stats from "@/components/stats/Stats";
import Value from "@/components/value/Value";
import ValueChange from "@/components/value/ValueChange";

const PriceInfo = ({ data, ...rest }) => {
  const stats = [
    {
      title: "Market Price",
      value: (
        <>
          <Value value={data.collateral_token_underlying_price} prefix={"$"} big />
          <ValueChange
            value={
              data.collateral_token_underlying_price - data.prev_collateral_token_price
            }
            className="text-lg"
            prefix={"$"}
          />
        </>
      ),
    },
    {
      title: "LUP", // Liquidation Upper Price
      value: (
        <>
          <Value value={data.lup} suffix={data.quote_token_symbol} big />
          <ValueChange
            value={data.lup - data.prev_lup}
            suffix={data.quote_token_symbol}
            className="text-lg"
          />
        </>
      ),
    },
    {
      title: "HTP", // Highest Threshold Price
      value: (
        <>
          <Value value={data.htp} suffix={data.quote_token_symbol} big />
          <ValueChange
            value={data.htp - data.prev_htp}
            suffix={data.quote_token_symbol}
            className="text-lg"
          />
        </>
      ),
    },
    {
      title: "HPB", // Highest Price Bucket
      value: (
        <>
          <Value value={data.hpb} suffix={data.quote_token_symbol} big />
          <ValueChange
            value={data.hpb - data.prev_hpb}
            suffix={data.quote_token_symbol}
            className="text-lg"
          />
        </>
      ),
    },
  ];

  return <Stats data={stats} {...rest} />;
};

export default PriceInfo;

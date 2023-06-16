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
          <Value
            value={data.collateral_token_underlying_price}
            prefix={"$"}
            big
            compact100k={true}
            compact={false}
          />
          <ValueChange
            value={
              data.prev_collateral_token_price
                ? data.collateral_token_underlying_price -
                  data.prev_collateral_token_price
                : 0
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
            value={data.prev_lup ? data.lup - data.prev_lup : 0}
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
            value={data.prev_htp ? data.htp - data.prev_htp : 0}
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
            value={data.prev_hpb ? data.hpb - data.prev_hpb : 0}
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

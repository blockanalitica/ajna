import Value from "@/components/value/Value";
import Stats from "@/components/stats/Stats";

const ReserveAuctionStats = ({ data, ...rest }) => {
  const stats = [
    {
      title: `${
        !data.type === "active"
          ? "Remaining / Claimable Reserves"
          : "Claimable Reserves"
      }`,
      value: (
        <>
          {!data.type === "active" ? (
            <>
              <Value
                value={data.claimable_reserves_remaining}
                suffix={data.quote_token_symbol}
                big
              />
              <span className="px-1">/</span>
            </>
          ) : null}

          <Value value={data.claimable_reserves} suffix={data.quote_token_symbol} big />
        </>
      ),
    },
    {
      title: "🔥 Ajna Burned 🔥",
      value: <Value value={data.ajna_burned} suffix="AJNA" big />,
    },
    {
      title: "# Takes",
      value: <>{data.take_count}</>,
    },
  ];

  return <Stats data={stats} {...rest} />;
};

export default ReserveAuctionStats;

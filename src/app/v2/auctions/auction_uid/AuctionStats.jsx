import Value from "@/components/value/Value";
import Stats from "@/components/stats/Stats";

const AuctionStats = ({ data, ...rest }) => {
  const stats = [
    {
      title: `${!data.settled ? "Remaining /" : ""} Collateral`,
      value: (
        <>
          {!data.settled ? (
            <>
              <Value
                value={data.collateral_remaining}
                suffix={data.collateral_token_symbol}
              />
              <span className="px-1">/</span>
            </>
          ) : null}

          <Value value={data.collateral} suffix={data.collateral_token_symbol} big />
        </>
      ),
      smallValue: (
        <>
          {!data.settled ? (
            <>
              <Value value={data.collateral_remaining_usd} prefix="$" />*
              <span className="px-1">/</span>
            </>
          ) : null}
          <Value value={data.collateral_usd} prefix="$" />*
        </>
      ),
    },
    {
      title: `${!data.settled ? "Remaining /" : ""} Debt`,
      value: (
        <>
          {!data.settled ? (
            <>
              <Value value={data.debt_remaining} suffix={data.quote_token_symbol} />
              <span className="px-1">/</span>
            </>
          ) : null}
          <Value value={data.debt} suffix={data.quote_token_symbol} />
        </>
      ),
      smallValue: (
        <>
          {!data.settled ? (
            <>
              <Value value={data.debt_remaining_usd} prefix="$" />*
              <span className="px-1">/</span>
            </>
          ) : null}
          <Value value={data.debt_usd} prefix="$" />*
        </>
      ),
    },
    {
      title: "Bond",
      value: <Value value={data.bond} suffix={data.quote_token_symbol} big />,
      smallValue: (
        <>
          <Value value={data.bond_usd} prefix="$" />*
        </>
      ),
    },
  ];

  return <Stats data={stats} {...rest} />;
};

export default AuctionStats;

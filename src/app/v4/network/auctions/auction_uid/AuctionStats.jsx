import Value from "@/components/value/Value";
import CurrencyValue from "@/components/value/CurrencyValue";
import Stats from "@/components/stats/Stats";

const AuctionStats = ({ data, ...rest }) => {
  const stats = [
    {
      title: `${!data.settled ? "Remaining /" : ""} Collateral`,
      value: (
        <div className="flex flex-row md:flex-col lg:flex-row">
          {!data.settled ? (
            <div>
              <CurrencyValue
                value={data.collateral_remaining}
                currencySymbol={data.collateral_token_symbol}
                currencyAddress={data.collateral_token_address}
                big
              />
              <span className="px-1">/</span>
            </div>
          ) : null}

          <CurrencyValue
            value={data.collateral}
            currencySymbol={data.collateral_token_symbol}
            currencyAddress={data.collateral_token_address}
            big
          />
        </div>
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
        <div className="flex flex-row md:flex-col lg:flex-row">
          {!data.settled ? (
            <div>
              <CurrencyValue
                value={data.debt_remaining}
                currencySymbol={data.quote_token_symbol}
                currencyAddress={data.quote_token_address}
                big
              />
              <span className="px-1">/</span>
            </div>
          ) : null}
          <CurrencyValue
            value={data.debt}
            currencySymbol={data.quote_token_symbol}
            currencyAddress={data.quote_token_address}
            big
          />
        </div>
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
      value: (
        <CurrencyValue
          value={data.bond}
          currencySymbol={data.quote_token_symbol}
          currencyAddress={data.quote_token_address}
          big
        />
      ),
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

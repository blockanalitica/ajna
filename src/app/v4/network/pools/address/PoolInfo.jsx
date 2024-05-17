import Stats from "@/components/stats/Stats";
import Value from "@/components/value/Value";
import CurrencyValue from "@/components/value/CurrencyValue";
import ValueChange from "@/components/value/ValueChange";

const PoolInfo = ({ data, ...rest }) => {
  const stats = [
    {
      title: "Deposited",
      value: (
        <>
          <CurrencyValue
            value={data.pool_size}
            currencySymbol={data.quote_token_symbol}
            currencyAddress={data.quote_token_address}
            big
          />
          <CurrencyValue
            value={data.pool_size - data.prev_pool_size}
            currencySymbol={data.quote_token_symbol}
            currencyAddress={data.quote_token_address}
            className="text-lg ms-2"
            trend
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
          <CurrencyValue
            value={data.debt}
            currencySymbol={data.quote_token_symbol}
            currencyAddress={data.quote_token_address}
            big
          />
          <CurrencyValue
            value={data.debt - data.prev_debt}
            currencySymbol={data.quote_token_symbol}
            currencyAddress={data.quote_token_address}
            className="text-lg ms-2"
            trend
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
          <CurrencyValue
            value={data.pledged_collateral}
            currencySymbol={data.collateral_token_symbol}
            currencyAddress={data.collateral_token_address}
            big
          />
          <CurrencyValue
            value={data.pledged_collateral - data.prev_pledged_collateral}
            currencySymbol={data.collateral_token_symbol}
            currencyAddress={data.collateral_token_address}
            className="text-lg ms-2"
            trend
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

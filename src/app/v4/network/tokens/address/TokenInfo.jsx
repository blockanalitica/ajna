import Stats from "@/components/stats/Stats";
import StatsPlaceholder from "@/components/stats/StatsPlaceholder";
import Value from "@/components/value/Value";
import CurrencyValue from "@/components/value/CurrencyValue";
import ValueChange from "@/components/value/ValueChange";
import { useFetch } from "@/hooks";

const TokenInfo = ({ address, daysAgo, className, ...rest }) => {
  const { data, error, isLoading } = useFetch(`/tokens/${address}/overview/`, {
    days_ago: daysAgo,
  });
  if (error) {
    return <p>Failed to load data</p>;
  }

  if (isLoading) {
    return <StatsPlaceholder className={className} numStats={5} size="lg" />;
  }

  const { results } = data;

  const statsRow1 = [
    {
      title: "Deposited",
      value: (
        <>
          <CurrencyValue
            value={results.lended_amount}
            currencySymbol={results.symbol}
            currencyAddress={results.underlying_address}
            big
          />
          <CurrencyValue
            value={results.lended_amount - results.prev_lended_amount}
            currencySymbol={results.symbol}
            currencyAddress={results.underlying_address}
            className="text-lg ms-2"
            trend
          />
        </>
      ),
      smallValue: (
        <>
          <Value value={results.lended_amount_usd} prefix="$" />
          <ValueChange
            value={results.lended_amount_usd - results.prev_lended_amount_usd}
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
            value={results.borrowed_amount}
            currencySymbol={results.symbol}
            currencyAddress={results.underlying_address}
            big
          />
          <CurrencyValue
            value={results.borrowed_amount - results.prev_borrowed_amount}
            currencySymbol={results.symbol}
            currencyAddress={results.underlying_address}
            className="text-lg ms-2"
            trend
          />
        </>
      ),
      smallValue: (
        <>
          <Value value={results.borrowed_amount_usd} prefix="$" />
          <ValueChange
            value={results.borrowed_amount_usd - results.prev_borrowed_amount_usd}
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
            value={results.collateral_amount}
            currencySymbol={results.symbol}
            currencyAddress={results.underlying_address}
            big
          />
          <CurrencyValue
            value={results.collateral_amount - results.prev_collateral_amount}
            currencySymbol={results.symbol}
            currencyAddress={results.underlying_address}
            trend
            className="text-lg ms-2"
          />
        </>
      ),
      smallValue: (
        <>
          <Value value={results.collateral_amount_usd} prefix="$" />
          <ValueChange
            value={results.collateral_amount_usd - results.prev_collateral_amount_usd}
            prefix="$"
            className="ms-2"
          />
        </>
      ),
    },
  ];

  const statsRow2 = [
    {
      title: "TVL",
      value: (
        <>
          <Value value={results.tvl} prefix="$" dashIfZero />
          <ValueChange
            value={results.tvl - results.prev_tvl}
            prefix="$"
            className="text-lg ms-2"
          />
        </>
      ),
    },
    {
      title: "# of pools",
      value: (
        <>
          <Value value={results.pool_count} />
          <ValueChange
            value={results.pool_count - results.prev_pool_count}
            className="text-lg ms-2"
          />
        </>
      ),
    },
  ];

  return (
    <div className={className} {...rest}>
      <Stats data={statsRow1} className="mb-5" />
      <Stats data={statsRow2} />
    </div>
  );
};

export default TokenInfo;

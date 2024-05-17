import CurrencyValue from "@/components/value/CurrencyValue";
import Stats from "@/components/stats/Stats";
import { AJNA_TOKEN_ADDRESS } from "@/utils/constants";

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
              <CurrencyValue
                value={data.claimable_reserves_remaining}
                currencySymbol={data.quote_token_symbol}
                currencyAddress={data.quote_token_address}
                big
              />
              <span className="px-1">/</span>
            </>
          ) : null}

          <CurrencyValue
            value={data.claimable_reserves}
            currencySymbol={data.quote_token_symbol}
            currencyAddress={data.quote_token_address}
            big
          />
        </>
      ),
    },
    {
      title: "🔥 Ajna Burned 🔥",
      value: (
        <CurrencyValue
          value={data.ajna_burned}
          currencySymbol="AJNA"
          currencyAddress={AJNA_TOKEN_ADDRESS}
          big
        />
      ),
    },
    {
      title: "# Takes",
      value: <>{data.take_count}</>,
    },
  ];

  return <Stats data={stats} {...rest} />;
};

export default ReserveAuctionStats;

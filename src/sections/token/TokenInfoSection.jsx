import Value from "@/components/value/Value";
import ValueChange from "@/components/value/ValueChange";
import { useFetch } from "@/hooks.js";

const TokenInfoSection = ({ address }) => {
  const { data, error, isLoading } = useFetch(`/tokens/${address}/overview/`);
  if (error) {
    return <p>Failed to load Data</p>;
  }
  if (isLoading) {
    return <p>Loading....</p>;
  }

  const results = data.results;

  return (
    <section className="mx-auto max-w-9xl py-10 px-4 sm:px-6 lg:px-8">
      <div className=" grid grid-cols-1 sm:grid-cols-1 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 gap-7">
        <div className="px-3 py-4 flex flex-col items-center justify-center bg-gray-20 border-gray-13 border-2 border-opacity-30 shadow-md bg-opacity-30 rounded-2xl uppercase">
          <span className="text-gray-5 font-light text-sm py-2 font-syncopate">
            Total lended
          </span>
          <span className="mb-2 text-2xl font-bold">
            <Value
              value={results.lended_amount}
              decimals={2}
              compact
              suffix={results.symbol}
            />
          </span>
          <span className="mb-2 text-sm text-gray-6">
            <Value
              value={results.lended_amount * results.underlying_price}
              decimals={2}
              compact
              prefix={"$"}
            />
          </span>
        </div>
        <div className="px-3 py-4 flex flex-col items-center justify-center bg-gray-20 border-gray-13 border-2 border-opacity-30 shadow-md bg-opacity-30 rounded-2xl uppercase">
          <span className="text-gray-5 font-light text-sm py-2 font-syncopate">
            Total borowed
          </span>
          <span className="mb-2 text-2xl font-bold">
            <Value
              value={results.borrowed_amount}
              decimals={2}
              compact
              suffix={results.symbol}
            />
          </span>
          <span className="mb-2 text-sm text-gray-6">
            <Value
              value={results.borrowed_amount * results.underlying_price}
              decimals={2}
              compact
              prefix={"$"}
            />
          </span>
        </div>
        <div className="px-3 py-4 flex flex-col items-center justify-center bg-gray-20 border-gray-13 border-2 border-opacity-30 shadow-md bg-opacity-30 rounded-2xl uppercase">
          <span className="text-gray-5 font-light text-sm py-2 font-syncopate">
            Total collateral
          </span>
          <span className="mb-2 text-2xl font-bold">
            <Value
              value={results.collateral_amount}
              decimals={2}
              compact
              suffix={results.symbol}
            />
          </span>
          <span className="mb-2 text-sm text-gray-6">
            <Value
              value={results.collateral_amount * results.underlying_price}
              decimals={2}
              compact
              prefix={"$"}
            />
          </span>
        </div>
        <div className="px-3 py-4 flex flex-col items-center justify-center bg-gray-20 border-gray-13 border-2 border-opacity-30 shadow-md bg-opacity-30 rounded-2xl uppercase">
          <span className="text-gray-5 font-light text-sm py-2 font-syncopate">
            TVL
          </span>
          <span className="mb-2 text-2xl font-bold">
            <Value value={results.tvl} decimals={2} compact prefix={"$"} />
          </span>
          {/* <span className="mb-2 text-sm font-bold">
            <ValueChange value={0} decimals={2} compact prefix={"$"} />
          </span> */}
        </div>

        <div className="px-3 py-4 flex flex-col items-center justify-center bg-gray-20 border-gray-13 border-2 border-opacity-30 shadow-md bg-opacity-30 rounded-2xl uppercase">
          <span className="text-gray-5 font-light text-sm py-2 font-syncopate">
            # of Pools
          </span>
          <span className="mb-2 text-2xl font-bold">
            <Value value={results.pool_count} decimals={2} compact />
          </span>
          <span className="mb-2 text-sm font-bold">
            <ValueChange value={0} decimals={2} compact />
          </span>
        </div>
      </div>
    </section>
  );
};

export default TokenInfoSection;

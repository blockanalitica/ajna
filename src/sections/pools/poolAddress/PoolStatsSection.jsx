import Value from "@/components/value/Value";

const PoolStatsSection = (promps) => {
  const results = promps.data;

  return (
    <section className="mx-auto max-w-9xl py-10 px-4 sm:px-6 lg:px-8">
      <div className=" grid grid-cols-1 sm:grid-cols-1 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 gap-7">
        <div className="px-3 py-4 flex flex-col items-center justify-center bg-gray-20 border-gray-13 border-2 border-opacity-30 shadow-md bg-opacity-30 rounded-2xl uppercase">
          <span className="text-gray-5 font-light text-sm py-2 font-syncopate">
            lended
          </span>
          <span className="mb-2 text-2xl font-bold">
            <Value
              value={results.pool_size}
              decimals={2}
              compact
              suffix={results.quote_token_symbol}
            />
          </span>
          <span className="mb-2 text-sm text-gray-6">
            <Value
              value={results.pool_size * results.quote_token_underlying_price}
              decimals={2}
              compact
              prefix={"$"}
            />
          </span>
        </div>
        <div className="px-3 py-4 flex flex-col items-center justify-center bg-gray-20 border-gray-13 border-2 border-opacity-30 shadow-md bg-opacity-30 rounded-2xl uppercase">
          <span className="text-gray-5 font-light text-sm py-2 font-syncopate">
            borowed
          </span>
          <span className="mb-2 text-2xl font-bold">
            <Value
              value={results.current_debt}
              decimals={2}
              compact
              suffix={results.quote_token_symbol}
            />
          </span>
          <span className="mb-2 text-sm text-gray-6">
            <Value
              value={results.current_debt * results.quote_token_underlying_price}
              decimals={2}
              compact
              prefix={"$"}
            />
          </span>
        </div>
        <div className="px-3 py-4 flex flex-col items-center justify-center bg-gray-20 border-gray-13 border-2 border-opacity-30 shadow-md bg-opacity-30 rounded-2xl uppercase">
          <span className="text-gray-5 font-light text-sm py-2 font-syncopate">
            collateral
          </span>
          <span className="mb-2 text-2xl font-bold">
            <Value
              value={results.pledged_collateral}
              decimals={2}
              compact
              suffix={results.collateral_token_symbol}
            />
          </span>
          <span className="mb-2 text-sm text-gray-6">
            <Value
              value={
                results.pledged_collateral * results.collateral_token_underlying_price
              }
              decimals={2}
              compact
              prefix={"$"}
            />
          </span>
        </div>
        <div className="px-3 py-4 flex flex-col items-center justify-center bg-gray-20 border-gray-13 border-2 border-opacity-30 shadow-md bg-opacity-30 rounded-2xl uppercase">
          <span className="text-gray-5 font-light text-sm py-2 font-syncopate">
            LUP
          </span>
          <span className="mb-2 text-2xl font-bold">
            <Value value={results.lup} decimals={2} compact prefix={"$"} />
          </span>
        </div>

        <div className="px-3 py-4 flex flex-col items-center justify-center bg-gray-20 border-gray-13 border-2 border-opacity-30 shadow-md bg-opacity-30 rounded-2xl uppercase">
          <span className="text-gray-5 font-light text-sm py-2 font-syncopate">
            htp
          </span>
          <span className="mb-2 text-2xl font-bold">
            <Value value={results.htp} decimals={2} compact prefix={"$"} />
          </span>
        </div>
      </div>
    </section>
  );
};

export default PoolStatsSection;

import classnames from "classnames";
import CryptoIcon from "@/components/icon/CryptoIcon";
import TagComp from "@/components/tags/TagComp";
import Value from "@/components/value/Value";
import ValueChange from "@/components/value/ValueChange";
import { useFetch } from "@/hooks.js";
import Link from "next/link";

const TokenPoolsTable = ({ address }) => {
  const { data, error, isLoading } = useFetch(`/tokens/${address}/pools/`);

  if (error) {
    return <p>Failed to load Data</p>;
  }
  if (isLoading) {
    return <p>Loading....</p>;
  }

  const results = data.results;

  const colClass = "grid-cols-table-8";

  return (
    <div className="flex flex-col">
      <div className="relative overflow-x-auto border rounded-2xl bg-gray-20 bg-opacity-30 border-gray-13 border-opacity-30 px-5">
        <div className="relative overflow-x-auto shadow-md rounded-2xl">
          <div className="shadow overflow-hidden sm:rounded-lg py-4">
            <div
              className={classnames(
                "grid gap-4 bg-gray-21  text-white rounded-2xl",
                colClass
              )}
            >
              <div className="bg-gray-100 flex justify-start items-center font-bold p-4">
                #
              </div>
              <div className="bg-gray-100 flex justify-start items-center font-bold p-4">
                Collateral Token / Quote Token
              </div>
              <div className="bg-gray-100 flex justify-end items-end font-bold p-4">
                Market price
              </div>
              <div className="bg-gray-100 flex justify-end items-end font-bold p-4">
                LUP
              </div>
              <div className="bg-gray-100 flex justify-end items-end font-bold p-4">
                HTP
              </div>
              <div className="bg-gray-100 flex justify-end items-end font-bold p-4">
                TVL
              </div>
              <div className="bg-gray-100 flex justify-end items-end font-bold p-4">
                APR
              </div>
              <div className="bg-gray-100 flex justify-end items-end font-bold p-4">
                Volume
              </div>
            </div>
            {results.map((item, index) => (
              <Link
                key={index}
                className="text-white cursor-pointer hover:text-gray-7"
                href={`/pools/${item.address}`}
                alt="link"
              >
                <div
                  className={classnames("grid px-2 border-b border-gray-20", colClass)}
                >
                  <div className="flex justify-start items-center p-4">{index + 1}</div>

                  <div className="flex justify-start items-center p-4">
                    <span className="relative flex justify-start items-center p-4">
                      <CryptoIcon
                        name={item.collateral_token_symbol}
                        className="absolute left-[25%] z-10"
                        size={30}
                      />
                      <CryptoIcon
                        name={item.quote_token_symbol}
                        className="ml-6"
                        size={30}
                      />
                    </span>
                    <span className="font-bold">
                      {item.collateral_token_symbol} / {item.quote_token_symbol}
                    </span>
                  </div>
                  <div className="flex justify-end items-end p-4">
                    <div className="flex flex-col items-end">
                      <Value
                        value={item.collateral_token_underlying_price}
                        decimals={2}
                        compact
                      />
                      <ValueChange value={0} decimals={2} compact dashIfZero />
                    </div>
                  </div>
                  <div className="flex justify-end items-end p-4">
                    <div className="flex flex-col items-end">
                      <Value value={item.lup} decimals={2} compact />
                      <ValueChange value={0} decimals={2} compact dashIfZero />
                    </div>
                  </div>
                  <div className="flex justify-end items-end p-4">
                    <div className="flex flex-col items-end">
                      <Value value={item.htp} decimals={2} compact />
                      <ValueChange value={0} decimals={2} compact dashIfZero />
                    </div>
                  </div>
                  <div className="flex justify-end items-end p-4">
                    <div className="flex flex-col items-end">
                      <Value value={item.pool_size} decimals={2} prefix={"$"} compact />
                      <ValueChange
                        value={0}
                        decimals={2}
                        prefix={"$"}
                        compact
                        dashIfZero
                      />
                    </div>
                  </div>
                  <div className="flex justify-end items-center p-4">
                    <TagComp
                      title={
                        <Value value={item.interest_rate} decimals={2} suffix={"%"} />
                      }
                    />
                  </div>
                  <div className="flex justify-end items-end p-4">
                    <div className="flex flex-col items-end">
                      <Value value={item.total_ajna_burned} decimals={2} />
                      <ValueChange value={0} decimals={2} compact dashIfZero />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenPoolsTable;

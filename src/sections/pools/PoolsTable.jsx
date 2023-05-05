"use client";

import CryptoIcon from "@/components/icon/CryptoIcon";
import TagComp from "@/components/tags/TagComp";
import Value from "@/components/value/Value";
import ValueChange from "@/components/value/ValueChange";
import { useFetch } from "@/hooks.js";
import { joinClassNames } from "@/utils/helperFunc"; // This is a custom function to join class names
import Link from "next/link";

const PoolsTable = () => {
  const { data, error, isLoading } = useFetch("/pools/");

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
              className={joinClassNames(
                "grid gap-4 bg-gray-21  text-white rounded-2xl",
                colClass
              )}
            >
              <div className="bg-gray-100 flex justify-start items-center font-bold p-4">
                #
              </div>
              <div className="bg-gray-100 flex justify-start items-center font-bold p-4">
                Collateral / Quote
              </div>
              <div className="bg-gray-100 flex justify-end items-end font-bold p-4">
                Collateral
              </div>
              <div className="bg-gray-100 flex justify-end items-end font-bold p-4">
                Quote
              </div>
              <div className="bg-gray-100 flex justify-end items-end font-bold p-4">
                Debt
              </div>
              <div className="bg-gray-100 flex justify-end items-end font-bold p-4">
                TVL
              </div>
              <div className="bg-gray-100 flex justify-end items-end font-bold p-4">
                APR
              </div>
              <div className="bg-gray-100 flex justify-end items-end font-bold p-4">
                🔥
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
                  className={joinClassNames(
                    "grid px-2 border-b border-gray-20",
                    colClass
                  )}
                >
                  <div className="flex justify-start items-center p-4">
                    {index + 1}
                  </div>

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
                      <div className="flex justify-start items-center">
                        <Value
                          value={item.pledged_collateral}
                          decimals={2}
                          compact
                          suffix={item.collateral_token_symbol}
                        />
                        <ValueChange
                          value={1}
                          decimals={2}
                          compact
                          hideIfZero
                          className="ml-2"
                        />
                      </div>
                      <div className="flex justify-start items-center text-gray-6 text-sm">
                        <Value
                          value={
                            item.pledged_collateral *
                            item.collateral_token_underlying_price
                          }
                          prefix={"$"}
                          decimals={2}
                          compact
                        />
                        <ValueChange
                          value={1}
                          decimals={2}
                          compact
                          hideIfZero
                          className="ml-2"
                          prefix={"$"}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end items-end p-4">
                    <div className="flex flex-col items-end">
                      <div className="flex justify-start items-center">
                        <Value
                          value={item.pool_size}
                          decimals={2}
                          compact
                          suffix={item.quote_token_symbol}
                        />
                        <ValueChange
                          value={0}
                          decimals={2}
                          compact
                          hideIfZero
                          className="ml-2"
                        />
                      </div>
                      <div className="flex justify-start items-center text-gray-6 text-sm">
                        <Value
                          value={
                            item.pool_size * item.quote_token_underlying_price
                          }
                          prefix={"$"}
                          decimals={2}
                          compact
                        />
                        <ValueChange
                          value={0}
                          decimals={2}
                          compact
                          hideIfZero
                          prefix={"$"}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end items-end p-4">
                    <div className="flex flex-col items-end">
                      <div className="flex justify-start items-center">
                        <Value
                          value={item.current_debt}
                          decimals={2}
                          compact
                          suffix={item.quote_token_symbol}
                        />
                        <ValueChange
                          value={0}
                          decimals={2}
                          compact
                          hideIfZero
                          className="ml-2"
                        />
                      </div>
                      <div className="flex justify-start items-center text-gray-6 text-sm">
                        <Value
                          value={
                            item.current_debt *
                            item.quote_token_underlying_price
                          }
                          prefix={"$"}
                          decimals={2}
                          compact
                        />
                        <ValueChange
                          value={0}
                          decimals={2}
                          compact
                          hideIfZero
                          prefix={"$"}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end items-end p-4">
                    <div className="flex flex-col items-end">
                      <Value
                        value={item.tvl}
                        decimals={2}
                        prefix={"$"}
                        compact
                      />
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
                        <Value
                          value={item.interest_rate}
                          decimals={2}
                          suffix={"%"}
                        />
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

export default PoolsTable;

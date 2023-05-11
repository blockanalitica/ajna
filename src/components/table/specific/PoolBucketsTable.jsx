"use client";

import Value from "@/components/value/Value";
import { useFetch } from "@/hooks.js";
import { joinClassNames } from "@/utils/helperFunc"; // This is a custom function to join class names
import Link from "next/link";

const BucketsTable = (promps) => {
  const { address } = promps;
  const { data, error, isLoading } = useFetch(`/pools/${address}/buckets/`);

  if (error) {
    return <p>Failed to load Data</p>;
  }
  if (isLoading) {
    return <p>Loading....</p>;
  }

  const results = data.results;

  let tableHeader = [
    {
      title: "#",
      class: "justify-start items-center",
    },
    {
      title: "Collateral",
      class: "justify-end items-center",
    },
    {
      title: "Deposit",
      class: "justify-end items-center",
    },
    {
      title: "LPB",
      class: "justify-end items-center",
    },
    {
      title: "Exchange rate",
      class: "justify-end items-center",
    },
  ];

  const colClass = "grid-cols-table-5-small";

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
              {tableHeader.map((item, index) => (
                <div key={index} className={joinClassNames("bg-gray-100 flex font-bold p-4", item.class)}>{item.title}</div>
              ))}
            </div>
            {results.map((item, index) => (
              <Link
                key={index}
                className="text-white cursor-pointer hover:text-gray-7"
                href="#"
                alt="link"
              >
                <div
                  className={joinClassNames(
                    "grid px-2 border-b border-gray-20",
                    colClass
                  )}
                >
                  <div className="flex justify-start items-center p-4">
                    {item.bucket_index}
                  </div>

                  <div className="flex justify-end items-end p-4">
                    <div className="flex flex-col items-end">
                      <div className="flex justify-start items-center">
                        <Value
                          value={item.collateral}
                          decimals={2}
                          compact
                          suffix={item.collateral_token_symbol}
                        />
                      </div>
                      <div className="flex justify-start items-center text-gray-6 text-sm">
                        <Value
                          value={
                            item.collateral *
                            item.collateral_token_underlying_price
                          }
                          prefix={"$"}
                          decimals={2}
                          compact
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end items-end p-4">
                    <div className="flex flex-col items-end">
                      <div className="flex justify-start items-center">
                        <Value
                          value={item.deposit}
                          decimals={2}
                          compact
                          suffix={item.quote_token_symbol}
                        />
                      </div>
                      <div className="flex justify-start items-center text-gray-6 text-sm">
                        <Value
                          value={
                            item.deposit * item.quote_token_underlying_price
                          }
                          prefix={"$"}
                          decimals={2}
                          compact
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end items-end p-4">
                    <div className="flex flex-col items-end">
                      <div className="flex justify-start items-center">
                        <Value value={item.lpb} decimals={2} compact />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end items-end p-4">
                    <div className="flex flex-col items-end">
                      <Value value={item.exchange_rate} decimals={4} compact />
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

export default BucketsTable;

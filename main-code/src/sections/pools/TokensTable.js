import CryptoIcon from "@/components/icon/CryptoIcon";
import Value from "@/components/value/Value";
import { useFetch } from "@/hooks.js";
import { joinClassNames } from "@/utils/helperFunc"; // This is a custom function to join class names
import Link from "next/link";

const TokensTable = () => {
  const { data, error, isLoading } = useFetch("/v1/ethereum/tokens/");

  if (error) {
    return <p>Failed to load Data</p>;
  }
  if (isLoading) {
    return <p>Loading....</p>;
  }

  const results = data.results;

  const colClass = "grid-cols-table-5";

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
                Name
              </div>
              <div className="bg-gray-100 flex justify-end items-center font-bold p-4">
                Price
              </div>
              <div className="bg-gray-100 flex justify-end items-center font-bold p-4">
                Total Value Locked
              </div>
              <div className="bg-gray-100 flex justify-end items-center font-bold p-4">
                Pools
              </div>
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
                    {index + 1}
                  </div>

                  <div className="flex justify-start items-center p-4">
                    <CryptoIcon name={item.symbol} className="mr-2" size={25} />

                    <span className="font-bold">
                      {item.name}
                      <span className="text-gray-13 ml-2">({item.symbol})</span>
                    </span>
                  </div>

                  <div className="flex justify-end items-center p-4">
                    <Value
                      value={item.underlying_price}
                      decimals={2}
                      prefix={"$"}
                      compact
                    />
                  </div>
                  <div className="flex justify-end items-center p-4">
                    <Value value={1000} decimals={2} prefix={"$"} compact />
                  </div>
                  <div className="flex justify-end items-center p-4">
                    <Value value={item.pool_count} />
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

export default TokensTable;
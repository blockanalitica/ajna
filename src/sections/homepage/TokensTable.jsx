import CryptoIcon from "@/components/icon/CryptoIcon";
import { table_tab_title_coin_subtitle_val_change } from "@/components/table/TableTabTemplates";
import Value from "@/components/value/Value";
import { useFetch } from "@/hooks.js";
import { joinClassNames } from "@/utils/helperFunc"; // This is a custom function to join class names
import Link from "next/link";

const table_tab_1coin_title = ({
  name="Ethereum", symbol="ETH"}) => (
  <div className="flex justify-start items-center p-4">
  <CryptoIcon name={symbol} className="mr-2" size={25} />

  <span className="font-bold">
    {name}
    <span className="text-gray-13 ml-2">({symbol})</span>
  </span>
</div>
);


const TokensTable = () => {
  const { data, error, isLoading } = useFetch("/tokens/");

  if (error) {
    return <p>Failed to load Data</p>;
  }
  if (isLoading) {
    return <p>Loading....</p>;
  }

  const tableData = data.results;

  const tableHeader = [
    {
      title: "#",
      class: "justify-start items-center",
    },
    {
      title: "Name",
      class: "justify-start items-center",
    },
    {
      title: "Price",
      class: "justify-end items-center",
    },
    {
      title: "TVL",
      class: "justify-end items-center",
    },
    {
      title: "Pools",
      class: "justify-end items-center",
    },
  ];

  let rowData = (item) => [
    table_tab_1coin_title({
      name: item.name,
      symbol: item.symbol
    }),
    table_tab_title_coin_subtitle_val_change({
      title: item.underlying_price,
      subtitle_hide_if_zero: true,
      title_prefix: "$",
    }),
    table_tab_title_coin_subtitle_val_change({
      title: item.tvl,
      subtitle_hide_if_zero: true,
      title_prefix: "$",
    }),
    table_tab_title_coin_subtitle_val_change({
      title: item.pool_count,
      subtitle_hide_if_zero: true,
    })
  ];

    

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
                TVL
              </div>
              <div className="bg-gray-100 flex justify-end items-center font-bold p-4">
                Pools
              </div>
            </div>
            {tableData.map((item, index) => (
              <Link
                key={index}
                className="text-white cursor-pointer hover:text-gray-7"
                href={`/tokens/${item.underlying_address}`}
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

                  {rowData(item).map((tab, tab_idx) => (
                    <>{tab}</>
                  ))}
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

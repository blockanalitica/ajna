import classnames from "classnames";
import CryptoIcon from "@/components/icon/CryptoIcon";
import TagComp from "@/components/tags/TagComp";
import Value from "@/components/value/Value";
import ValueChange from "@/components/value/ValueChange";
import { useFetch } from "@/hooks.js";
import Link from "next/link";
import GeneralTable from "../general/GeneralTable";

const TokenPoolsTable = ({ address }) => {
  const { data, error, isLoading } = useFetch(`/tokens/${address}/pools/`);

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
      title: "Collateral Token / Quote Token",
      class: "justify-start items-center",
    },
    {
      title: "Market price",
      class: "justify-end items-center",
    },
    {
      title: "LUP",
      class: "justify-end items-center",
    },
    {
      title: "HTP",
      class: "justify-end items-center",
    },
    {
      title: "TVL",
      class: "justify-end items-center",
    },
    {
      title: "APR",
      class: "justify-end items-center",
    },
    {
      title: "Volume",
      class: "justify-end items-center",
    },
  ];

  let rowData = (item) => {
    return [
      table_tab_only_idx(item.bucket_index),
      table_tab_title_coin_subtitle_val_change({
        title: item.collateral,
        subtitle: item.collateral * item.collateral_token_underlying_price,
        icon: item.collateral_token_symbol,
        title_prefix: null,
        subtitle_prefix: "$",
      }),
      table_tab_title_coin_subtitle_val_change({
        title: item.deposit,
        subtitle: item.deposit * item.quote_token_underlying_price,
        icon: item.quote_token_symbol,
        title_prefix: null,
        subtitle_prefix: "$",
      }),
      table_tab_title_coin_subtitle_val_change({
        title: item.lpb,
        subtitle: item.current_debt * item.quote_token_underlying_price,
        icon: item.quote_token_symbol,
        title_prefix: null,
        subtitle_prefix: "$",
      }),
    ];
  };

  const colClass = "grid-cols-table-8";

  // TODO: Fix this table

  return (
    <>
      <GeneralTable
        tableHeader={tableHeader}
        tableData={tableData}
        colClass={colClass}
        rowData={rowData}
        idxDisplay={true}
      />
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
                {tableHeader.map((item, index) => (
                  <div
                    key={index}
                    className={classnames("bg-gray-100 flex font-bold p-4", item.class)}
                  >
                    {item.title}
                  </div>
                ))}
              </div>
              {results.map((item, index) => (
                <Link
                  key={index}
                  className="text-white cursor-pointer hover:text-gray-7"
                  href={`/pools/${item.address}`}
                  alt="link"
                >
                  <div
                    className={classnames(
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
                          size={"30"}
                        />
                        <CryptoIcon
                          name={item.quote_token_symbol}
                          className="ml-6"
                          size={"30"}
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
                        <Value
                          value={item.pool_size}
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
    </>
  );
};

export default TokenPoolsTable;
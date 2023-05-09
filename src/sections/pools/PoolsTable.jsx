"use client";

import TagComp from "@/components/tags/TagComp";
import Value from "@/components/value/Value";
import ValueChange from "@/components/value/ValueChange";
import { useFetch } from "@/hooks.js";
import { joinClassNames } from "@/utils/helperFunc"; // This is a custom function to join class names
import Link from "next/link";
import TwoOverlayingCryptoIcons from "@/components/icon/TwoOverlayingCryptoIcons";
import GeneralTable from "@/components/table/GeneralTable";

const table_tab_coins_plus_title = ({
  title1="title1", title2="title2",
  icon1=null, icon2=null,
}) => (
  <div className="flex justify-start items-center p-4">
    <span className="relative flex justify-start items-center p-4">
      <TwoOverlayingCryptoIcons icon1={icon1} icon2={icon2} size={30} />
    </span>
    <span className="font-bold">
      {title1} / {title2}
    </span>
  </div>
)

const table_tab_title_coin_subtitle_val_change = ({
  title=0, subtitle=0, icon=null,
  title_prefix=null, subtitle_prefix=null,
  title_val_change=0, subtitle_val_change=0,
  subtitle_dash_if_zero=false,
  title_val_change_prefix=null, subtitle_val_change_prefix=null,
}) => (
  <div className="flex justify-end items-center p-4">
    <div className="flex flex-col items-end">
      <div className="flex justify-start items-center">
        <Value
          value={title}
          prefix={title_prefix}
          decimals={2}
          compact
          suffix={icon}
        />
        <ValueChange
          value={title_val_change}
          decimals={2}
          compact
          hideIfZero
          className="ml-2"
          prefix={title_val_change_prefix}
        />
      </div>
      <div className="flex justify-start items-center text-gray-6 text-sm">
        <Value
          value={subtitle}
          prefix={subtitle_prefix}
          dashIfZero={subtitle_dash_if_zero}
          decimals={2}
          compact
        />
        <ValueChange
          value={subtitle_val_change}
          decimals={2}
          compact
          hideIfZero
          className="ml-2"
          prefix={subtitle_val_change_prefix}
        />
      </div>
    </div>
  </div>
)

const table_tab_tag = (title=0) => (
<div className="flex justify-end items-center p-4">
  <TagComp
    title={
      <Value
        value={title}
        decimals={2}
        suffix={"%"}
      />
    }
  />
</div>
)

const PoolsTable = () => {
  const { data, error, isLoading } = useFetch("/pools/");

  if (error) {
    return <p>Failed to load Data</p>;
  }
  if (isLoading) {
    return <p>Loading....</p>;
  }

  const tableData = data.results;

  const colClass = "grid-cols-table-8";

  const tableHeader = [
    {
      title: "#",
      class: "justify-start items-center"
    },
    {
      title: "Collateral / Quote",
      class: "justify-start items-center"
    },
    {
      title: "Collateral",
      class: "justify-end items-end"
    },
    {
      title: "Quote",
      class: "justify-end items-end"
    },
    {
      title: "Debt",
      class: "justify-end items-end"
    },
    {
      title: "TVL",
      class: "justify-end items-end"
    },
    {
      title: "APR",
      class: "justify-end items-end"
    },
    {
      title: "🔥",
      class: "justify-end items-end"
    }
  ];

  let rowData = (item) => 
  {
    return [
      table_tab_coins_plus_title({
        title1: item.collateral_token_symbol,
        title2: item.quote_token_symbol,
        icon1: item.collateral_token_symbol,
        icon2: item.quote_token_symbol,
      }),
      table_tab_title_coin_subtitle_val_change({
        title: item.pledged_collateral,
        subtitle: item.pledged_collateral * item.collateral_token_underlying_price,
        icon: item.collateral_token_symbol,
        title_prefix: null, subtitle_prefix: "$",
        title_val_change: 1, subtitle_val_change: 1,
        title_val_change_prefix: null, subtitle_val_change_prefix: "$",
      }),
      table_tab_title_coin_subtitle_val_change({
        title: item.pool_size,
        subtitle: item.pool_size * item.quote_token_underlying_price,
        icon: item.quote_token_symbol,
        title_prefix: null, subtitle_prefix: "$",
      }),
      table_tab_title_coin_subtitle_val_change({
        title: item.current_debt,
        subtitle: item.current_debt * item.quote_token_underlying_price,
        icon: item.quote_token_symbol,
        title_prefix: null, subtitle_prefix: "$",
      }),
      table_tab_title_coin_subtitle_val_change({
        title: item.tvl,
        subtitle: 0,
        title_prefix: "$", subtitle_prefix: null,
        subtitle_dash_if_zero: true,
      }),
      table_tab_tag(item.interest_rate),
      table_tab_title_coin_subtitle_val_change({
        title: item.total_ajna_burned,
        subtitle: 0,
        title_prefix: null, subtitle_prefix: null,
        subtitle_dash_if_zero: true,
      }),
    ]
  }

  return (
    <>
    <GeneralTable tableHeader={tableHeader} tableData={tableData} colClass={colClass} rowData={rowData} />
    {/*
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
            {tableData.map((item, index) => (
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
    */}

    </>
  );
};

export default PoolsTable;

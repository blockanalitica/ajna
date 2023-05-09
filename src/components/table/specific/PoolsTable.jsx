"use client";

import TagComp from "@/components/tags/TagComp";
import Value from "@/components/value/Value";
import ValueChange from "@/components/value/ValueChange";
import { useFetch } from "@/hooks.js";
import { joinClassNames } from "@/utils/helperFunc"; // This is a custom function to join class names
import Link from "next/link";
import TwoOverlayingCryptoIcons from "@/components/icon/TwoOverlayingCryptoIcons";
import GeneralTable from "@/components/table/general/GeneralTable";
import { 
  table_tab_2coins_plus_title,
  table_tab_title_coin_subtitle_val_change,
  table_tab_tag
 } from "@/components/table/general/TableTabTemplates";


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
      class: "justify-end items-center"
    },
    {
      title: "Quote",
      class: "justify-end items-center"
    },
    {
      title: "Debt",
      class: "justify-end items-center"
    },
    {
      title: "TVL",
      class: "justify-end items-center"
    },
    {
      title: "APR",
      class: "justify-end items-center"
    },
    {
      title: "🔥",
      class: "justify-end items-center"
    }
  ];

  let rowData = (item) => 
  {
    return [
      table_tab_2coins_plus_title({
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
    <GeneralTable 
      tableHeader={tableHeader} 
      tableData={tableData} 
      colClass={colClass} 
      rowData={rowData}
      idxDisplay={true}
     />
    </>
  );
};

export default PoolsTable;

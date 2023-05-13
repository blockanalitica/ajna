import GeneralTable from "@/components/table/general/GeneralTable";
import { 
  table_tab_1coin_title,
  table_tab_title_coin_subtitle_val_change } from "@/components/table/general/TableTabTemplates";
import { useFetch } from "@/hooks.js";


const TokensTable = ({tableData=null}) => {
  if (tableData == null) {
    const { data, error, isLoading } = useFetch("/tokens/");

    if (error) {
      return <p>Failed to load Data</p>;
    }
    if (isLoading) {
      return <p>Loading....</p>;
    }

  tableData = data.results;
  }

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
    <>
    <GeneralTable
      tableHeader={tableHeader}
      rowData={rowData}
      tableData={tableData}
      colClass={colClass}
      idxDisplay={true}
      />
    </>
    
  );
};

export default TokensTable;

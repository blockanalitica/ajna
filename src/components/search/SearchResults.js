"use client";

import { useFetch } from "@/hooks.js";
import CryptoIcon from "@/components/icon/CryptoIcon";
import Value from "@/components/value/Value";
import ResultTable from "./ResultTable";

const SearchResults = ({ searchTerm }) => {
  const { data = {}, error, isLoading } = useFetch("/search/", { search: searchTerm });

  if (error) {
    return <p>Failed to load data</p>;
  }

  const { pools, tokens } = data;

  const poolColumns = [
    {
      header: <div className="font-syncopate uppercase">Pools</div>,
      cell: ({ row }) => (
        <>
          <span className="relative flex">
            <CryptoIcon name={row.collateral_token_symbol} className="z-10" />
            <CryptoIcon
              name={row.quote_token_symbol}
              className="relative left-[-10px] z-0"
            />
          </span>
          {row.collateral_token_symbol} / {row.quote_token_symbol}
        </>
      ),
    },
    {
      header: <span className="text-sm">TVL</span>,
      cell: ({ row }) => (
        <div className="flex flex-col items-end">
          <Value value={row.tvl} prefix="$" />
        </div>
      ),
      headerAlign: "end",
      cellAlign: "end",
    },
  ];

  const tokenColumns = [
    {
      header: <div className="font-syncopate uppercase">Tokens</div>,
      cell: ({ row }) => (
        <>
          <CryptoIcon name={row.symbol} />
          <span className="ml-2">
            {row.name}
            <span className="text-gray-13 ml-2">({row.symbol})</span>
          </span>
        </>
      ),
    },
    {
      header: <span className="text-sm">TVL</span>,
      cell: ({ row }) => <Value value={row.tvl} prefix="$" />,
      headerAlign: "end",
      cellAlign: "end",
    },
  ];

  return (
    <div className="absolute border border-gray-21 bg-gray-23 rounded-3xl mt-4 py-5 px-7 w-[500px]">
      <ResultTable
        data={pools}
        keyField="address"
        columns={poolColumns}
        gridColumnClassName="grid-cols-table-search-results"
        href={(row) => `/pools/${row.address}`}
        isLoading={isLoading}
      />
      <hr className="bg-gray-20 h-px border-0 mb-5 mt-3" />
      <ResultTable
        data={tokens}
        keyField="underlying_address"
        columns={tokenColumns}
        gridColumnClassName="grid-cols-table-search-results"
        href={(row) => `/tokens/${row.underlying_address}`}
        isLoading={isLoading}
      />
    </div>
  );
};

export default SearchResults;

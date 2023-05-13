import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useFetchTableData } from "@/hooks.js";

import PoolsTable from "@/components/table/specific/PoolsTable";
import TokensTable from "@/components/table/specific/TokensTable";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [filteredPoolsData, setFilteredItems] = useState([]);
  const [filteredTokensData, setFilteredTokens] = useState([]);
  
  const { tableData: tablePoolData, msg: poolMsg } = useFetchTableData("/pools/");
  const { tableData: tableTokenData, msg: tokenMsg } = useFetchTableData("/tokens/");

  useEffect(() => {
    if (tablePoolData) {
      setFilteredItems(tablePoolData);
    }
    if (tableTokenData) {
      setFilteredTokens(tableTokenData);
    }
  }, [tablePoolData, tableTokenData]);

  if (tablePoolData === null) {
    return <p>{poolMsg}</p>;
  }
  if (tableTokenData === null) {
    return <p>{tokenMsg}</p>;
  }

  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);

    if (tablePoolData) {
      const filtered = tablePoolData.filter((item) =>
        item.collateral_token_symbol.toLowerCase().includes(newSearchTerm.toLowerCase())
      );
      setFilteredItems(filtered);
    }

    if (tableTokenData) {
      const filtered = tableTokenData.filter((item) =>
        item.name.toLowerCase().includes(newSearchTerm.toLowerCase())
      );
      setFilteredTokens(filtered);
    }

  };

  return (
    <div className="relative">
      <Head>
        {isFocused && (
          <style>
            {`body { overflow: hidden; }
            .overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.7); z-index: 20; }
            .search-bar, .dropdown { position: relative; z-index: 30; }
            .dropdown { top: calc(100% + 10px); left: 50%; transform: translateX(-50%); overflow-y: auto; }`}
          </style>
        )}
      </Head>
      {isFocused && (
        <div className="overlay" onClick={() => setIsFocused(false)} />
      )}
      <input
        type="text"
        placeholder="Search pools or tokens"
        className="bg-gray-24 px-8 font-rubik rounded-full border border-gray-20 text-gray-3 text-l  focus:border-gray-15 block w-full pl-7 p-2.5 search-bar"
        value={searchTerm}
        onChange={handleSearchChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {isFocused && (filteredPoolsData.length > 0 || filteredTokensData.length) && (
        <div className="absolute w-screen mt-1 py-1 border border-ajna-plum bg-black rounded-2xl shadow-lg dropdown">
          <h3 className="px-4 py-2 text-gray-8 font-rubik">
            Pools
          </h3>
          <PoolsTable tableData={filteredPoolsData} />
          <h3 className="px-4 py-2 text-gray-8 font-rubik">
            Tokens
          </h3>
          <TokensTable tableData={filteredTokensData} />
          
        </div>
      )}
    </div>
  );
}


        /*
        <ul className="absolute w-full mt-1 py-1 border border-ajna-plum bg-black rounded-2xl shadow-lg dropdown">
          {filteredItems.map((item) => (
            <li
              key={item}
              className="px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer"
              onClick={() => {
                setSearchTerm(item);
                setFilteredItems(listOfItems);
              }}
            >
              {item}
            </li>
          ))}
        </ul>
        */
import { useState } from "react";
import Head from "next/head";

const listOfItems = ["ETH", "DAI", "ETH2", "BTC"];

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState(listOfItems);
  const [isFocused, setIsFocused] = useState(false);

  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);

    const filtered = listOfItems.filter((item) =>
      item.toLowerCase().includes(newSearchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  return (
    <div className="relative">
      <Head>
        {isFocused && (
          <style>
            {`body { overflow: hidden; }
            .overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.7); z-index: 20; }
            .search-bar, .dropdown { position: relative; z-index: 30; }`}
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
      {isFocused && filteredItems.length > 0 && (
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
      )}
    </div>
  );
}

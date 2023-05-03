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
            .overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.7); z-index: 999; }
            .search-bar, .dropdown { position: relative; z-index: 1000; }`}
          </style>
        )}
      </Head>
      {isFocused && (
        <div className="overlay" onClick={() => setIsFocused(false)} />
      )}
      <input
        type="text"
        placeholder="Search"
        className="w-full px-4 py-2 rounded-full bg-gray-100 text-gray-800 search-bar"
        value={searchTerm}
        onChange={handleSearchChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {isFocused && filteredItems.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 py-1 bg-white rounded-md shadow-lg dropdown">
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
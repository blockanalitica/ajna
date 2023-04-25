import { useState } from "react";

const listOfItems = ["ETH", "DAI", "ETH2", "BTC"];

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState(listOfItems);

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
      <input
        type="text"
        placeholder="Search"
        className="w-full px-4 py-2 rounded-full bg-gray-100 text-gray-800"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {filteredItems.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 py-1 bg-white rounded-md shadow-lg">
          {filteredItems.map((item) => (
            <li
              key={item}
              className="px-4 py-2 text-gray-10 hover:bg-gray-200 cursor-pointer"
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
"use client";

import { useState } from "react";
import SearchResults from "./SearchResults";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
  };

  return (
    <div className="relative z-40">
      <input
        type="text"
        placeholder="Search pools or tokens"
        className="bg-gray-24 px-8 rounded-full border border-gray-20 text-gray-3 text-l focus:border-purple-to outline-none w-full pl-7 p-2.5"
        value={searchTerm}
        onChange={handleSearchChange}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
      />
      {isOpen ? <SearchResults searchTerm={searchTerm} /> : null}
    </div>
  );
};

export default Search;

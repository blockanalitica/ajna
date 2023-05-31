"use client";

import { useState, useRef } from "react";
import SearchResults from "./SearchResults";
import { useOnClickOutside } from "@/hooks.js";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const searchRef = useRef(null);

  useOnClickOutside(searchRef, () => {
    isOpen && setIsOpen(false);
  });

  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
  };

  return (
    <div className="relative z-40" ref={searchRef}>
      <input
        type="text"
        placeholder="Search pools or tokens"
        className="bg-gray-24 px-8 rounded-full border border-gray-20 text-gray-3 text-l focus:border-purple-to outline-none w-full pl-7 p-2.5"
        value={searchTerm}
        onChange={handleSearchChange}
        onFocus={() => setIsOpen(true)}
      />
      {isOpen ? <SearchResults searchTerm={searchTerm} /> : null}
    </div>
  );
};

export default Search;

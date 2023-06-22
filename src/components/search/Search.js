"use client";

import { useState, useRef } from "react";
import classnames from "classnames";
import { useOnClickOutside } from "@/hooks";
import SearchResults from "./SearchResults";
import SearchInput from "./SearchInput";

const Search = ({ className }) => {
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
    <div className={classnames("relative z-40", className)} ref={searchRef}>
      <SearchInput
        placeholder="Search pools or tokens"
        value={searchTerm}
        onChange={handleSearchChange}
        onFocus={() => setIsOpen(true)}
      />
      {isOpen ? <SearchResults searchTerm={searchTerm} /> : null}
    </div>
  );
};

export default Search;

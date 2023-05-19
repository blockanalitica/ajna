"use client";

import React, { useState } from "react";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
  };

  return (
    <>
      {isFocused && (
        <div
          className="absolute bg-black/70 min-h-screen w-screen top-0 left-0 z-30"
          onClick={() => setIsFocused(false)}
        />
      )}
      <div className="relative z-40">
        <input
          type="text"
          placeholder="Search pools or tokens"
          className="bg-gray-24 px-8 rounded-full border border-gray-20 text-gray-3 text-l focus:border-purple-to outline-none w-full pl-7 p-2.5"
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {isFocused ? (
          <div className="absolute border border-gray-21 bg-gray-23 rounded-3xl mt-4 p-5">
            <div className="font-syncopate uppercase">Pools</div>
            pools table
            <div className="font-syncopate uppercase">Tokens</div>
            tokens table
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Search;

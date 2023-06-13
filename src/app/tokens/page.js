"use client";

import { useState } from "react";
import { useQueryParams } from "@/hooks";
import DisplaySwitch from "@/components/switch/DisplaySwitch";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import SearchInput from "@/components/search/SearchInput";
import Tokens from "./Tokens";

const TokensPage = () => {
  const { queryParams, setQueryParams } = useQueryParams();
  const daysAgo = parseInt(queryParams.get("daysAgo")) || 1;
  const [searchTerm, setSearchTerm] = useState("");

  const onDisplaySwitchChange = (value) => {
    setQueryParams({ daysAgo: value });
  };

  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
  };

  return (
    <>
      <section className="flex items-center justify-between mb-10">
        <Breadcrumbs />
        <DisplaySwitch onChange={onDisplaySwitchChange} activeOption={daysAgo} />
      </section>

      <div className="flex flex-row justify-between items-center mb-5">
        <h1 className="text-xl md:text-1xl xl:text-2xl">Tokens</h1>
        <SearchInput
          placeholder="Search tokens"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <Tokens daysAgo={daysAgo} searchTerm={searchTerm} />
    </>
  );
};

export default TokensPage;

"use client";

import { useState } from "react";
import { useQueryParams, usePageTitle, useFetch } from "@/hooks";
import DisplaySwitch from "@/components/switch/DisplaySwitch";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import SearchInput from "@/components/search/SearchInput";
import PoolsTableV2 from "@/components/table/specific/PoolsTableV2";

const PoolsPage = () => {
  usePageTitle("Pools");
  const { queryParams, setQueryParams } = useQueryParams();
  const daysAgo = parseInt(queryParams.get("daysAgo")) || 1;
  const [searchTerm, setSearchTerm] = useState("");
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState("-tvl");

  const {
    data = {},
    error,
    isLoading,
  } = useFetch("/pools/", {
    p: page,
    p_size: pageSize,
    order,
    days_ago: daysAgo,
    search: searchTerm,
  });

  if (error) {
    return <p>Failed to load data</p>;
  }

  const { results, count } = data;

  const onDisplaySwitchChange = (value) => {
    setQueryParams({ daysAgo: value });
  };

  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    setPage(1);
  };

  return (
    <>
      <section className="flex items-center justify-center sm:justify-end md:justify-between mb-10">
        <Breadcrumbs />
        <DisplaySwitch onChange={onDisplaySwitchChange} activeOption={daysAgo} />
      </section>

      <div className="flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-xl md:text-1xl xl:text-2xl mb-5">Pools</h1>
        <SearchInput
          placeholder="Search pools"
          value={searchTerm}
          onChange={handleSearchChange}
          className="mb-5"
        />
      </div>

      <PoolsTableV2
        data={results}
        currentPage={page}
        pageSize={pageSize}
        totalRecords={count}
        onPageChange={setPage}
        onOrderChange={setOrder}
        currentOrder={order}
        isLoading={isLoading}
      />
    </>
  );
};

export default PoolsPage;

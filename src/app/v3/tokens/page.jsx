import { useState } from "react";
import { useQueryParams, usePageTitle, useFetch } from "@/hooks";
import TokensTable from "@/components/table/specific/TokensTable";
import DisplaySwitch from "@/components/switch/DisplaySwitch";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import SearchInput from "@/components/search/SearchInput";
import Info from "@/components/info/Info";

const TokensPage = () => {
  usePageTitle("Tokens");
  const { queryParams, setQueryParams } = useQueryParams();
  const daysAgo = parseInt(queryParams.get("daysAgo")) || 1;
  const page = parseInt(queryParams.get("p")) || 1;
  const [searchTerm, setSearchTerm] = useState("");
  const pageSize = 10;
  const [order, setOrder] = useState("-tvl");

  const {
    data = {},
    error,
    isLoading,
  } = useFetch("/tokens/", {
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
  const onPageChange = (value) => {
    setQueryParams({ p: value });
  };

  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    onPageChange(1);
  };

  return (
    <>
      <section className="flex items-center justify-center sm:justify-end md:justify-between mb-10">
        <Breadcrumbs />
        <DisplaySwitch onChange={onDisplaySwitchChange} activeOption={daysAgo} />
      </section>

      <div className="flex flex-col sm:flex-row  justify-between items-center">
        <h1 className="text-xl md:text-1xl xl:text-2xl mb-5">Tokens</h1>
        <SearchInput
          placeholder="Search tokens"
          value={searchTerm}
          onChange={handleSearchChange}
          className="mb-5"
        />
      </div>

      <TokensTable
        data={results}
        currentPage={page}
        pageSize={pageSize}
        totalRecords={count}
        onPageChange={onPageChange}
        onOrderChange={setOrder}
        currentOrder={order}
        isLoading={isLoading}
        placeholderRows={5}
      />

      <div className="text-xs text-gray-13 text-end mb-5">
        * price is an estimation
        <Info className="ms-2" title="USD Price">
          <p className="mb-2">
            USD price marked with * is an estimation as we couldn't fetch the actual
            price.
          </p>
          <p className="mb-2">
            We estimate the price based on the formula below from all the pools:
          </p>
          <code>MAX(LUP * &lt;quote token USD price&gt;)</code>
        </Info>
      </div>
    </>
  );
};

export default TokensPage;

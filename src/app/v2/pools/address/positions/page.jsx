import { useParams } from "react-router-dom";
import { useState } from "react";
import GenericPlaceholder from "@/components/GenericPlaceholder";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import { useFetch, usePageTitle, useQueryParams } from "@/hooks";
import Depositors from "./Depositors";
import Borrowers from "./Borrowers";
import SearchInput from "@/components/search/SearchInput";
import Tabs from "@/components/tabs/Tabs";
import DisplaySwitch from "@/components/switch/DisplaySwitch";
import PoolName from "@/components/poolName/PoolName";

const PoolWallets = () => {
  usePageTitle("Positions");
  const { address } = useParams();
  const { queryParams, setQueryParams } = useQueryParams();
  const [searchTerm, setSearchTerm] = useState("");
  const activeTab = queryParams.get("type") || "depositor";
  const daysAgo = parseInt(queryParams.get("daysAgo")) || 1;

  const onTabChange = (value) => {
    setQueryParams({ type: value });
  };

  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
  };

  const onDisplaySwitchChange = (value) => {
    setQueryParams({ daysAgo: value });
  };

  const { data = {}, error, isLoading } = useFetch(`/pools/${address}/`);

  if (error) {
    return <p>Failed to load data</p>;
  }
  if (isLoading) {
    return <GenericPlaceholder />;
  }
  const { results: pool } = data;

  const tabs = {
    depositor: {
      title: "Depositors",
      content: <Depositors address={address} daysAgo={daysAgo} search={searchTerm} />,
    },
    borrower: {
      title: "Borrowers",
      content: <Borrowers address={address} daysAgo={daysAgo} search={searchTerm} />,
    },
  };

  return (
    <>
      <section className="flex items-center justify-center sm:justify-end md:justify-between mb-10">
        <Breadcrumbs />
        <DisplaySwitch onChange={onDisplaySwitchChange} activeOption={daysAgo} />
      </section>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
        <div className="flex items-center">
          <PoolName
            collateralSymbol={pool.collateral_token_symbol}
            quoteSymbol={pool.quote_token_symbol}
            size="xl"
            className="font-syncopate"
          />
        </div>
        <SearchInput
          placeholder="Search wallets"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={onTabChange} />
    </>
  );
};

export default PoolWallets;

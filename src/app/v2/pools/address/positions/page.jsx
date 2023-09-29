import { useParams } from "react-router-dom";
import { useState } from "react";
import GenericPlaceholder from "@/components/GenericPlaceholder";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import CryptoIcon from "@/components/icon/CryptoIcon";
import { useFetch, usePageTitle, useQueryParams } from "@/hooks";
import Depositors from "./Depositors";
import Borrowers from "./Borrowers";
import SearchInput from "@/components/search/SearchInput";
import Tabs from "@/components/tabs/Tabs";

const PoolWallets = () => {
  usePageTitle("Wallets");
  const { address } = useParams();
  const { queryParams, setQueryParams } = useQueryParams();
  const [searchTerm, setSearchTerm] = useState("");
  const activeTab = queryParams.get("type") || "depositor";

  const daysAgo = 1;

  const onTabChange = (value) => {
    setQueryParams({ type: value });
  };

  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
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
      </section>

      <div className="flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center">
          <span className="relative flex">
            <CryptoIcon name={pool.collateral_token_symbol} className="z-10" />
            <CryptoIcon
              name={pool.quote_token_symbol}
              className="relative left-[-10px] z-0"
            />
          </span>
          <h1 className="pl-4 text-2xl">
            {pool.collateral_token_symbol} / {pool.quote_token_symbol} Positions
          </h1>
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

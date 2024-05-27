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
import TableFilter from "@/components/table/TableFilter";
import Checkbox from "@/components/checkbox/Checkbox";

const PoolWallets = () => {
  usePageTitle("Positions");
  const { address } = useParams();
  const { queryParams, setQueryParams } = useQueryParams();
  const [searchTerm, setSearchTerm] = useState("");
  const activeTab = queryParams.get("type") || "depositor";
  const daysAgo = parseInt(queryParams.get("daysAgo")) || 1;
  const onlyClosed = queryParams.get("closed");

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

  const onOnlyClosedChanged = (checked) => {
    if (checked === true) {
      setQueryParams({ closed: "1" });
    } else {
      setQueryParams({ closed: null });
    }
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
      content: (
        <Depositors
          address={address}
          daysAgo={daysAgo}
          search={searchTerm}
          onlyClosed={onlyClosed}
        />
      ),
    },
    borrower: {
      title: "Borrowers",
      content: (
        <Borrowers
          address={address}
          daysAgo={daysAgo}
          search={searchTerm}
          onlyClosed={onlyClosed}
        />
      ),
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
            collateralAddress={pool.collateral_token_address}
            quoteSymbol={pool.quote_token_symbol}
            quoteAddress={pool.quote_token_address}
            size="xl"
            className="font-syncopate"
          />
        </div>
        <div className="flex gap-2">
          <TableFilter filtersApplied={onlyClosed === "1"}>
            <Checkbox
              label="Show only closed positions"
              checked={onlyClosed === "1"}
              onChange={(checked) => onOnlyClosedChanged(checked)}
            />
          </TableFilter>
          <SearchInput
            placeholder="Search wallets"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={onTabChange} />
    </>
  );
};

export default PoolWallets;

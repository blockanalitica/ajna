import { useState } from "react";
import { useQueryParams, usePageTitle } from "@/hooks";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import SearchInput from "@/components/search/SearchInput";
import Tabs from "@/components/tabs/Tabs";
import Borrowers from "./Borrowers";
import Depositors from "./Depositors";
import AtRisk from "./AtRisk";
import Activity from "./Activity";

const WalletsPage = () => {
  usePageTitle("Wallets");
  const { queryParams, setQueryParams } = useQueryParams();
  const [searchTerm, setSearchTerm] = useState("");

  const activeTab = queryParams.get("tab") || "depositors";

  const tabs = {
    depositors: {
      title: "Depositors",
      content: <Depositors searchTerm={searchTerm} />,
    },
    borrowers: {
      title: "Borrowers",
      content: <Borrowers searchTerm={searchTerm} />,
    },
    "at-risk": {
      title: "At Risk",
      content: <AtRisk />,
    },
    activity: {
      title: "Activity",
      content: <Activity />,
    },
  };

  const onTabChange = (value) => {
    setQueryParams({ tab: value });
  };

  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
  };

  return (
    <>
      <section className="flex items-center justify-center sm:justify-end md:justify-between mb-10">
        <Breadcrumbs />
      </section>

      <div className="flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-xl md:text-1xl xl:text-2xl mb-5">Wallets</h1>
        {activeTab !== "at-risk" && activeTab !== "activity" ? (
          <SearchInput
            placeholder="Search wallets"
            value={searchTerm}
            onChange={handleSearchChange}
            className="mb-5"
          />
        ) : null}
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={onTabChange} />
    </>
  );
};

export default WalletsPage;

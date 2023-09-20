import { useQueryParams, usePageTitle } from "@/hooks";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import Tabs from "@/components/tabs/Tabs";
import FundingProposals from "./FundingProposals";
import FinalizeProposals from "./FinalizeProposals";

const PoolsPage = () => {
  usePageTitle("Grants");
  const { queryParams, setQueryParams } = useQueryParams();
  const activeTab = queryParams.get("tab") || "funding";

  const onTabChange = (value) => {
    setQueryParams({ tab: value });
  };

  const tabs = {
    funding: {
      title: "Funding",
      content: <FundingProposals />,
    },
    finalize: {
      title: "Finalize",
      content: <FinalizeProposals />,
    },
  };
  return (
    <>
      <section className="flex items-center justify-between mb-10">
        <Breadcrumbs />
      </section>

      <h1 className="text-xl md:text-1xl xl:text-2xl mb-10">Grants</h1>

      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={onTabChange} />
    </>
  );
};

export default PoolsPage;

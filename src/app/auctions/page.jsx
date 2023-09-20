import { useQueryParams } from "@/hooks";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import ActiveAuctions from "./ActiveAuctions";
import SettledAuctions from "./SettledAuctions";
import Tabs from "@/components/tabs/Tabs";

const Auctions = () => {
  const { queryParams, setQueryParams } = useQueryParams();
  const activeTab = queryParams.get("tab") || "active";

  const onTabChange = (value) => {
    setQueryParams({ tab: value });
  };

  const tabs = {
    active: {
      title: "Active",
      content: <ActiveAuctions />,
    },
    settled: {
      title: "Settled",
      content: <SettledAuctions />,
    },
  };

  return (
    <>
      <section className="flex items-center justify-between mb-10">
        <Breadcrumbs />
      </section>

      <h1 className="text-xl md:text-1xl xl:text-2xl mb-10">Auctions</h1>

      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={onTabChange} />
    </>
  );
};

export default Auctions;

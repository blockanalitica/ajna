import { useQueryParams } from "@/hooks";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import ActiveAuctions from "./ActiveAuctions";
import SettledAuctions from "./SettledAuctions";
import Tabs from "@/components/tabs/Tabs";
import Kicker from "./Kicker";
import ActiveReserveAuctions from "./ActiveReserveAuctions";
import SettledReserveAuctions from "./SettledReserveAuctions";

const Auctions = () => {
  const { queryParams, setQueryParams } = useQueryParams();
  const activeTab = queryParams.get("tab") || "kicker";

  const onTabChange = (value) => {
    setQueryParams({ tab: value });
  };

  const tabs = {
    kicker: {
      title: "Kicker",
      content: <Kicker />,
    },
    active: {
      title: "Active",
      content: <ActiveAuctions />,
    },
    settled: {
      title: "Settled",
      content: <SettledAuctions />,
    },
    "active-reserves": {
      title: "Active Reserves",
      content: <ActiveReserveAuctions />,
    },
    "settled-reserves": {
      title: "Settled Reserves",
      content: <SettledReserveAuctions />,
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

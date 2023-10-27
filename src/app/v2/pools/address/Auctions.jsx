import { useState } from "react";
import Tabs from "@/components/tabs/Tabs";
import AuctionsKicker from "./AuctionsKicker";
import AuctionsActive from "./AuctionsActive";
import AuctionsSettled from "./AuctionsSettled";

const Auctions = ({ poolAddress, ...rest }) => {
  const [activeTab, setActiveTab] = useState("kicker");

  const onTabChange = (value) => {
    setActiveTab(value);
  };

  const tabs = {
    kicker: {
      title: "Kicker",
      content: <AuctionsKicker poolAddress={poolAddress} />,
    },
    active: {
      title: "Active",
      content: <AuctionsActive poolAddress={poolAddress} />,
    },
    settled: {
      title: "Settled",
      content: <AuctionsSettled poolAddress={poolAddress} />,
    },
  };

  return <Tabs tabs={tabs} activeTab={activeTab} onTabChange={onTabChange} />;
};

export default Auctions;

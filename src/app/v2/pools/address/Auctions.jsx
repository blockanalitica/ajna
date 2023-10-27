import { useState } from "react";
import Tabs from "@/components/tabs/Tabs";
import AuctionsKicker from "./AuctionsKicker";
import AuctionsActive from "./AuctionsActive";
import AuctionsSettled from "./AuctionsSettled";
import ReserveAuctionsSettled from "./ReserveAuctionsSettled";
import ReserveAuctionsActive from "./ReserveAuctionsActive";

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
    "active-reserves": {
      title: "Active Reserves",
      content: <ReserveAuctionsActive poolAddress={poolAddress} />,
    },
    "settled-reserves": {
      title: "Settled Reserves",
      content: <ReserveAuctionsSettled poolAddress={poolAddress} />,
    },
  };

  return <Tabs tabs={tabs} activeTab={activeTab} onTabChange={onTabChange} />;
};

export default Auctions;

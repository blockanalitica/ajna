"use client";

import { useState } from "react";
import DisplaySwitch from "@/components/switch/DisplaySwitch";
import SettledAuctionsTable from "./SettledAuctionsTable";
import SettledAuctionsOverview from "./SettledAuctionsOverview";

const SettledAuctions = () => {
  const [daysAgo, setDaysAgo] = useState(1);

  return (
    <>
      <div className="flex justify-center sm:justify-end mb-4">
        <DisplaySwitch onChange={setDaysAgo} activeOption={daysAgo} />
      </div>
      <SettledAuctionsOverview daysAgo={daysAgo} className="mb-4" />
      <SettledAuctionsTable daysAgo={daysAgo} />
    </>
  );
};

export default SettledAuctions;

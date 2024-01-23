import { useState } from "react";
import { usePageTitle } from "@/hooks";
import DisplaySwitch from "@/components/switch/DisplaySwitch";
import SettledAuctionsTable from "./SettledAuctionsTable";
import SettledAuctionsOverview from "./SettledAuctionsOverview";

const SettledAuctions = () => {
  usePageTitle("Settled Auctions");
  const [daysAgo, setDaysAgo] = useState(1);

  return (
    <>
      <div className="flex justify-center sm:justify-end mb-4 items-center">
        <div className="text-xs text-gray-13 text-end pe-4">
          USD prices are caclualted using market price at kick time
        </div>
        <DisplaySwitch onChange={setDaysAgo} activeOption={daysAgo} />
      </div>

      <SettledAuctionsOverview daysAgo={daysAgo} className="mb-4" />
      <SettledAuctionsTable daysAgo={daysAgo} />
    </>
  );
};

export default SettledAuctions;

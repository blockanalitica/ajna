"use client";

import { useState } from "react";
import CardBackground from "@/components/card/CardBackground";
import DisplaySwitch from "@/components/switch/DisplaySwitch";
import SettledAuctionsTable from "./SettledAuctionsTable";
import SettledAuctionsGraph from "./SettledAuctionsGraph";
import SettledAuctionsOverview from "./SettledAuctionsOverview";

const SettledAuctions = () => {
  const [daysAgo, setDaysAgo] = useState(1);

  return (
    <>
      <div className="flex justify-end mb-4">
        <DisplaySwitch onChange={setDaysAgo} activeOption={daysAgo} />
      </div>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <CardBackground className="grid grid-cols-1 place-content-between">
          <div>
            <h3 className="text-sm font-bold text-gray-1 font-syncopate uppercase mb-5">
              Settled Auctions
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <SettledAuctionsOverview daysAgo={daysAgo} />
          </div>
        </CardBackground>

        <div className="col-span-2">
          <SettledAuctionsGraph daysAgo={daysAgo} />
        </div>
      </div>

      <SettledAuctionsTable daysAgo={daysAgo} />
    </>
  );
};

export default SettledAuctions;

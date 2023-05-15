"use client";

import Link from "next/link";
import { useState } from "react";
import ArrowIcon from "@/components/icon/ArrowIcon";
import CryptoIcon from "@/components/icon/CryptoIcon";

const NetworkSwitch = () => {
  const networkOptions = [
    { name: "Ethereum", href: "/ethereum", icon: "ETH" },
    { name: "Polygon", href: "/polygon" },
    { name: "Optimism", href: "/optimism" },
    { name: "Arbitrum", href: "/arbitrum" },
    { name: "Celo", href: "/celo" },
  ];

  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        onClick={() => setOpen(!open)}
      >
        <CryptoIcon name={networkOptions[0].icon} className="me-1 mr-1" size={"20"} />
        <span className="ml-2">{networkOptions[0].name}</span>
        {networkOptions.length > 1 ? <ArrowIcon className="h-4 w-4 ml-2" /> : null}
      </button>

      {networkOptions.length > 1 && open ? (
        <div className="absolute shadow-xl shadow-black rounded-2xl right-0 z-10 w-56 mt-4 bg-gray-23 border-gray-21 border grid grid-cols-1 gap-3">
          <div>Select network</div>

          {networkOptions.map((item, key) => (
            <div key={key}>
              <Link
                href={item.href}
                className="block rounded-lg mx-4 p-3 hover:text-gray-7 bg-gray-22"
              >
                <CryptoIcon name={item.icon} className="me-1" size={20} />
                {item.name}
              </Link>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default NetworkSwitch;

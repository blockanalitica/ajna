"use client";

import CryptoIcon from "@/components/icon/CryptoIcon";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";

const NetworkSwitch = () => {
  const networkOptions = [{ name: "Ethereum", href: "/ethereum", icon: "ETH" }];

  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="hover:ring-2 hover:ring-purple-from focus:outline-none text-gray-4 rounded-3xl text-sm px-4 py-3 text-center inline-flex items-center"
        type="button"
        onClick={() => setOpen(!open)}
      >
        <div>
          <CryptoIcon name={networkOptions[0].icon} size="24" priority />
        </div>
        <span className="ml-2">{networkOptions[0].name}</span>
        {networkOptions.length > 1 ? (
          <FontAwesomeIcon
            icon={open ? faChevronUp : faChevronDown}
            size="xs"
            className="ml-2"
          />
        ) : null}
      </button>

      {networkOptions.length > 1 && open ? (
        <div className="absolute shadow-xl shadow-black rounded-3xl right-0 z-10 w-64 mt-4 p-4 bg-gray-23 border-gray-21 border grid grid-cols-1 gap-4">
          <div className="font-syncopate uppercase font-bold text-center">
            Select network
          </div>

          {networkOptions.map((item, key) => (
            <div key={key}>
              <Link
                href={item.href}
                className="flex items-center rounded-2xl px-3 py-2.5 hover:text-gray-7 text-gray-4 text-sm bg-gray-22"
              >
                <CryptoIcon name={item.icon} className="me-3" size={20} />
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

import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from "classnames";
import { useLinkBuilder } from "@/hooks";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import Search from "@/components/search/Search";
import { smartLocationParts } from "@/utils/url";
import NetworkSwitch from "./NetworkSwitch";
import ajnaLogo from "@/assets/images/logos/AJNA-Logo-LG.svg";

const Navbar = () => {
  const buildLink = useLinkBuilder();
  const [isOpen, setOpen] = useState(false);

  const location = useLocation();
  const { paths } = smartLocationParts(location);
  const rootSegment = paths && paths.length > 0 ? paths[0] : null;

  const navigation = [
    { name: "Pools", href: buildLink("pools"), current: rootSegment === "pools" },
    { name: "Tokens", href: buildLink("tokens"), current: rootSegment === "tokens" },
    {
      name: "Auctions",
      href: buildLink("auctions"),
      current: rootSegment === "auctions",
    },
    // {
    //   name: "Grants",
    //   href: `/${network}/grants`,
    //   current: rootSegment === "grants",
    // },
  ];

  return (
    <nav className="mt-4 mb-10">
      <div className="flex items-center justify-between">
        <Link to={buildLink("/")}>
          <img src={ajnaLogo} width="130" height="24" alt="Ajna" className="h-auto" />
        </Link>
        <div className="hidden md:flex space-x-4">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={classnames(
                "rounded-md px-4 py-2 text-l font-medium hover:text-ajna-aqua",
                {
                  "text-ajna-aqua": item.current,
                }
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden md:flex items-center">
          <Search className="me-4 hidden lg:block" />
          <NetworkSwitch />
        </div>
        <NetworkSwitch className="-mr-2 flex md:hidden" />
        <div className="-mr-2 flex md:hidden">
          {/* Mobile menu button */}
          <button
            className={classnames(
              "inline-flex items-center justify-center rounded-md bg-gray-800 p-2",
              "text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none",
              "focus:ring- focus:ring-offset-2 focus:ring-offset-gray-800"
            )}
            onClick={() => setOpen(!isOpen)}
          >
            {isOpen ? (
              <FontAwesomeIcon icon={faXmark} className="block h-6 w-6" />
            ) : (
              <FontAwesomeIcon icon={faBars} className="block h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {isOpen ? (
        <div className="md:hidden">
          <div className="rounded-3xl mt-4 p-4 bg-gray-23 border-gray-21 border">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className={classnames(
                  "block rounded-md px-3 py-2 text-base font-medium my-2",
                  {
                    "text-ajna-aqua": item.current,
                  }
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </nav>
  );
};

export default Navbar;

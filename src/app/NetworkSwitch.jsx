import classnames from "classnames";
import CryptoIcon from "@/components/icon/CryptoIcon";
import { useLocation, Link } from "react-router-dom";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { NETWORKS } from "@/networks";
import { smartLocationParts } from "@/utils/url";

const NetworkSwitch = ({ className }) => {
  const location = useLocation();
  const { network } = smartLocationParts(location);

  let networkOptions = NETWORKS.v1;
  if (import.meta.env.PROD) {
    networkOptions = networkOptions.filter((obj) => {
      return obj.key !== "goerli";
    });
  }

  const [open, setOpen] = useState(false);

  // Select current network for the full pool of networks in order for us to be able
  // to select goerli network in production via URL vithout exposing it in the selector
  const currentNetwork = networkOptions.find((obj) => obj.key === network);

  if (!currentNetwork) {
    return null;
  }

  return (
    <div className={classnames("relative", className)}>
      <button
        className={classnames(
          "focus:outline-none text-gray-4 rounded-3xl text-sm px-4 py-2 text-center inline-flex items-center",
          { "hover:ring-2 hover:ring-purple-from": networkOptions.length > 1 }
        )}
        type="button"
        onClick={() => setOpen(!open)}
      >
        <div>
          <CryptoIcon key={currentNetwork.key} name={currentNetwork.icon} size="24" />
        </div>
        <span className="ml-2">{currentNetwork.name}</span>
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

          {networkOptions.map((item) => (
            <div key={item.key}>
              <Link
                to={`/${item.key}`}
                className="flex items-center rounded-2xl px-3 py-2.5 hover:text-gray-7 text-gray-4 text-sm bg-gray-22"
                onClick={() => setOpen(false)}
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

import Link from "next/link";
import { useState } from "react";
import ArrowIcon from "../icon/ArrowIcon";
import CryptoIcon from "../icon/CryptoIcon";


const DropDownButton = () => {
  const NetworkOptions = [
    { name: 'Ethereum', href: '/ethereum', icon: "ETH" },
    // { name: 'Polygon', href: '/polygon' },
    // { name: 'Optimism', href: '/optimism' },
    // { name: 'Arbitrum', href: '/arbitrum' },
    // { name: 'Celo', href: '/celo' },
  ]

  const [open, setOpen] = useState(false)


  return (
  <div className="relative">
    <button 
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" 
      type="button"
      onClick={() => setOpen(!open)}
      >
        <CryptoIcon
                  name={NetworkOptions[0].icon}
                  className="me-1 mr-1"
                  size={20}
                />
                <span className="ml-2">
                {NetworkOptions[0].name} 
                </span>
      {NetworkOptions.length > 1 && <ArrowIcon className="h-4 w-4 ml-2" />}
    </button>
   {NetworkOptions.length > 1 && (
   <div 
    style={{ display: open?"block":"none" }}
    className="absolute rounded-lg right-0 z-10 w-56 mt-4 origin-top-right ">
        <ul className="py-2 text-sm rounded-xl shadow-xl shadow-black text-white bg-gray-22 " >
          { NetworkOptions.map((item, key) => (
            <li key={key}>
              <Link 
              href={item.href} 
              className="block rounded-lg px-4 py-2 hover:text-gray-7"
              >
                <CryptoIcon
                  name={item.icon}
                  className="me-1"
                  size={20}
                />
                {item.name}
              </Link>
            </li>
          ))
          }
        </ul>
    </div>)}
  </div>
  );
};

export default DropDownButton;
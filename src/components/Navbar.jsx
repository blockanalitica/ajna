import { useState } from "react";
import classnames from "classnames";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Image from "next/image";
import DropDownButton from "./button/DropDownButton";

const Navbar = ({ navigation }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <nav className="mt-4">
      <div className="flex items-center justify-between">
        <Link href="/">
          <Image
            src="/assets/images/logos/AJNA-Logo-LG.svg"
            width={130}
            height={50}
            alt="Ajna"
          />
        </Link>
        <div className="hidden md:flex space-x-4">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={classnames("rounded-md px-4 py-2 text-l font-medium", {
                "text-ajna-aqua": item.current,
                "text-gray-300 hover:bg-gray-700 hover:text-white": !item.current,
              })}
              aria-current={item.current ? "page" : undefined}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden md:block">
          <DropDownButton />
        </div>
        <div className="-mr-2 flex md:hidden">
          {/* Mobile menu button */}
          <button
            className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring- focus:ring-offset-2 focus:ring-offset-gray-800"
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
        <div>
          <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={classnames(
                  "block rounded-md px-3 py-2 text-base font-medium",
                  {
                    "bg-gray-900 text-white": item.current,
                    "text-gray-300 hover:bg-gray-700 hover:text-white": !item.current,
                  }
                )}
                aria-current={item.current ? "page" : undefined}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      ) : null}

      <div className="md:hidden flex justify-end -mr-3">
        <DropDownButton />
      </div>
    </nav>
  );
};

export default Navbar;

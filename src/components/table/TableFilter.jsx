import { useState, useRef } from "react";
import classnames from "classnames";
import { useOnClickOutside } from "@/hooks";

const TableFilter = ({ filtersApplied = false, children }) => {
  const [open, setOpen] = useState(false);
  const filterRef = useRef(null);

  useOnClickOutside(filterRef, () => {
    open && setOpen(false);
  });

  return (
    <div className="relative" ref={filterRef}>
      <button
        className={classnames(
          "focus:outline-none text-gray-3 rounded-3xl px-4 py-2 text-center bg-gray-24",
          "inline-flex items-center border border-gray-20 hover:border-purple-to",
          { "ring-2 ring-yellow-8": !!filtersApplied },
        )}
        type="button"
        onClick={() => setOpen(!open)}
      >
        Filters
      </button>

      {open ? (
        <div
          className={classnames(
            "absolute rounded-3xl -translate-x-1/2 left-1/2 z-30 w-64",
            "p-4 bg-gray-23 border-gray-21 border grid grid-cols-1 gap-4",
          )}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
};

export default TableFilter;

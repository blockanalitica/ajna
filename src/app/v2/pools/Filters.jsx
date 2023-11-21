import { useState, useRef } from "react";
import classnames from "classnames";
import { useQueryParams, useOnClickOutside } from "@/hooks";
import Checkbox from "@/components/checkbox/Checkbox";

const Filters = () => {
  const [open, setOpen] = useState(false);
  const { queryParams, setQueryParams } = useQueryParams();
  const filterValue = queryParams.get("filter");
  const filterRef = useRef(null);

  useOnClickOutside(filterRef, () => {
    open && setOpen(false);
  });

  const onCheckboxChange = (type, checked) => {
    if (checked === true) {
      setQueryParams({ filter: type });
    } else {
      setQueryParams({ filter: null });
    }
  };

  return (
    <div className="relative" ref={filterRef}>
      <button
        className={classnames(
          "focus:outline-none text-gray-3 rounded-3xl px-4 py-2 text-center bg-gray-24",
          "inline-flex items-center border border-gray-20 hover:border-purple-to",
          { "ring-2 ring-yellow-8": !!filterValue }
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
            "p-4 bg-gray-23 border-gray-21 border grid grid-cols-1 gap-4"
          )}
        >
          <Checkbox
            label="Added in last 24h"
            checked={filterValue === "new"}
            onChange={(checked) => onCheckboxChange("new", checked)}
          />
          <Checkbox
            label="Has active liquidations"
            checked={filterValue === "liquidation"}
            onChange={(checked) => onCheckboxChange("liquidation", checked)}
          />
          <Checkbox
            label="Arbitrage pools"
            checked={filterValue === "arbitrage"}
            onChange={(checked) => onCheckboxChange("arbitrage", checked)}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Filters;

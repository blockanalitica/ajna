"use client";

import classnames from "classnames";
import _ from "lodash";
import CryptoIcon from "@/components/icon/CryptoIcon";
import Value from "@/components/value/Value";
import ValueChange from "@/components/value/ValueChange";
import CardBackground from "@/components/card/CardBackground";
import { useFetch } from "@/hooks.js";
import Link from "next/link";

const Table = ({ data, keyField, columns, gridColumnClassName, href, ...rest }) => {
  let RowComponent = "div";
  if (href) {
    RowComponent = Link;
  }

  return (
    <CardBackground {...rest}>
      <div
        className={classnames(
          "grid gap-3 text-white bg-gray-21 rounded-2xl font-medium text-sm px-5 py-3",
          gridColumnClassName
        )}
      >
        {columns.map((column, colIndex) => (
          <div
            key={column.header || `col-${colIndex}`}
            className={classnames(
              "flex items-center",
              `justify-${column.headerAlign || "start"}`
            )}
          >
            {column.header}
          </div>
        ))}
      </div>
      <div className="mx-3">
        {data.map((row, index) => (
          <RowComponent
            key={row[keyField]}
            className={classnames(
              "block grid gap-3 border-b border-gray-20 px-2 last:border-b-0",
              gridColumnClassName,
              { "cursor-pointer hover:text-gray-7": !!href }
            )}
            href={_.isFunction(href) ? href(row) : href}
          >
            {columns.map((column, colIndex) => (
              <div
                key={column.header || `col-${colIndex}`}
                className={classnames(
                  "flex items-center py-4",
                  `justify-${column.cellAlign || "start"}`
                )}
              >
                {column["cell"]({ row, index })}
              </div>
            ))}
          </RowComponent>
        ))}
      </div>
    </CardBackground>
  );
};

export default Table;

"use client";

import classnames from "classnames";
import _ from "lodash";
import CryptoIcon from "@/components/icon/CryptoIcon";
import Value from "@/components/value/Value";
import ValueChange from "@/components/value/ValueChange";
import CardBackground from "@/components/card/CardBackground";
import { useFetch } from "@/hooks.js";
import Link from "next/link";

const ResultTable = ({
  data,
  keyField,
  columns,
  gridColumnClassName,
  href,
  ...rest
}) => {
  let RowComponent = "div";
  if (href) {
    RowComponent = Link;
  }

  return (
    <div {...rest}>
      <div className={classnames("grid gap-3 text-gray-5 pb-1", gridColumnClassName)}>
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
      <div className="">
        {data.map((row, index) => (
          <RowComponent
            key={row[keyField]}
            className={classnames(
              "block grid gap-3  last:border-b-0",
              gridColumnClassName,
              { "cursor-pointer hover:text-gray-7": !!href }
            )}
            href={_.isFunction(href) ? href(row) : href}
          >
            {columns.map((column, colIndex) => (
              <div
                key={column.header || `col-${colIndex}`}
                className={classnames(
                  "flex items-center py-3",
                  `justify-${column.cellAlign || "start"}`
                )}
              >
                {column["cell"]({ row, index })}
              </div>
            ))}
          </RowComponent>
        ))}
      </div>
    </div>
  );
};

export default ResultTable;

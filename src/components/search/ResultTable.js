"use client";

import classnames from "classnames";
import _ from "lodash";
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
            key={_.isString(column.header) ? column.header : `col-${colIndex}`}
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
                key={`row-${row[keyField]}-${colIndex}`}
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

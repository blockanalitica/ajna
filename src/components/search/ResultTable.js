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
  emptyMessage,
  isLoading = false,
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
      <div>
        {isLoading ? (
          <div className="animate-pulse">
            <div className="h-12 flex items-center">
              <div className="bg-gray-21 rounded-2xl h-6 w-full"></div>
            </div>
            <div className="h-12 flex items-center">
              <div className="bg-gray-21 rounded-2xl h-6 w-full"></div>
            </div>
            <div className="h-12 flex items-center">
              <div className="bg-gray-21 rounded-2xl h-6 w-full"></div>
            </div>
          </div>
        ) : data && data.length > 0 ? (
          data.map((row, index) => (
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
          ))
        ) : (
          <div className="text-gray-5">
            {emptyMessage ? emptyMessage : "No results"}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultTable;
